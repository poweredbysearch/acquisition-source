'use strict';

import url from 'url';
import cookies from 'cookies-js';
import {parseReferrer, parseUtm} from './parsers';

/**
 * The deliverable
 */
let acquisition;

/**
 * Settings
 *
 * @type {Object}
 */
let settings = {
    cookieName: 'acqsrc',
    cookiePath: '/'
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
function acquireSource () {
    let thisUrl = url.parse(location.href, true),
        referrerUrl = url.parse(document.referrer);

    if (acquisition !== null && typeof acquisition === 'object') {
        return acquisition;
    } else if (referrerUrl.hostname === thisUrl.hostname) {
        return false;
    } else {
        acquisition = getAcquisition(thisUrl, referrerUrl);
        return acquisition;
    }
}

function hasUtmParams (query) {
    return query.hasOwnProperty('utm_source') || query.hasOwnProperty('utm_medium');
}

function getAcquisition (thisUrl, referrerUrl) {
    if (hasUtmParams(thisUrl.query)) {
        return parseUtm(thisUrl.query);
    } else {
        return parseReferrer(referrerUrl);
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
        return acquireSource(Object.assign(settings, overrides));
    },

    parseReferrer,

    parseUtm

};

export {acquisitionSource as default};
