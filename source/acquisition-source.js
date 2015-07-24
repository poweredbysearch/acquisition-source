'use strict';

import url from 'url';
import cookies from 'cookies-js';
import {parseReferrer, parseUtm} from './parsers';

/**
 * The deliverable
 */
let acquisition = null;

/**
 * Settings
 *
 * @type {Object}
 */
let settings = {
    cookieName: 'acqsrc',
    cookiePath: '/',
    referrer: typeof document !== 'undefined' ? document.referrer : null,
    location: typeof location !== 'undefined' ? location.href : null,
    expires: 604800
};

/**
 * Initialize all the things!
 */
function init () {
    let currentCookie = cookies.get(settings.cookieName);

    if (typeof currentCookie === 'string') {
        try {
            acquisition = JSON.parse(currentCookie);
        } catch (e) {
            cookies.expire(settings.cookieName);
        }
    }
}

/** Kick it off */
init();

/**
 * Acquires the source/medium, returns it and saves it to a cookie
 *
 * @return {[type]} [description]
 */
function doAcquire () {
    let thisUrl = url.parse(settings.location, true);
    let referrerUrl = url.parse(settings.referrer);

    if (acquisition !== null && typeof acquisition === 'object') {
        return acquisition;
    }

    acquisition = getAcquisition(thisUrl, referrerUrl);
    cookies.set(settings.cookieName, JSON.stringify(acquisition), {
      path: settings.cookiePath,
      expires: settings.expires
    });
    return acquisition;
}

function hasUtmParams (query) {
    return query.hasOwnProperty('utm_source') || query.hasOwnProperty('utm_medium');
}

function hasGclid (query) {
    return query.hasOwnProperty('gclid');
}

function getAcquisition (thisUrl, referrerUrl) {
    if (hasUtmParams(thisUrl.query)) {
        return parseUtm(thisUrl.query, referrer);
    } else if (hasGclid(thisUrl.query)) {
        return {
            source: 'google',
            medium: 'ppc'
        };
    } else if (referrerUrl.hostname !== null && referrerUrl.hostname !== thisUrl.hostname) {
        return parseReferrer(referrerUrl);
    } else {
        return {
            source: '(direct)',
            medium: '(none)'
        };
    }
}

const acquisitionSource = {

    settings,

    get acquisition () {
        return acquisition;
    },

    get source () {
        return this.acquisition.source;
    },

    get medium () {
        return this.acquisition.medium;
    },

    acquire (overrides = {}) {
        return doAcquire(Object.assign(settings, overrides));
    },

    parseReferrer,

    parseUtm

};

export {acquisitionSource as default};
