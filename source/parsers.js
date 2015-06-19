'use strict';

const hostnameRegex = /^(?:www\.)?(?:\w+\.(?=[\w+]))?(\w{4,})(?:\.\w{2,3}){1,2}/;

const namedSources = {
    google: ['google','googleadservices'],
    facebook: ['facebook'],
    bing: ['bing'],
    yahoo: ['yahoo']
};

const searchEngineRegex = /^google|bing|yahoo|ask|aol$/;
const socialRegex = /^facebook|twitter|myspace|instagram|pinterest$/;

/**
 * Get any named sources for the hostname
 *
 * @param  {string} hostname
 * @return {string}
 */
function getSourceFromHostname (hostname) {
    for (var source in namedSources) {
        if (namedSources.hasOwnProperty(source)) {
            if (namedSources[source].indexOf(hostname) !== -1) {
                hostname = source;
                break;
            }
        }   
    }

    return hostname;
}

/**
 * Parses the hostname and applies any applicable transformations
 *
 * @param  {[type]} hostname [description]
 * @return {[type]}          [description]
 */
function transformHostname (hostname) {
    let regexed = hostnameRegex.exec(hostname);

    if (regexed) {
        hostname = regexed;
    }

    if (hostname !== null) {
        hostname = getSourceFromHostname(hostname[1]);
    }

    return hostname;
}

/**
 * Parse referrer url to establish source/medium
 *
 * @param  {Object} referrer
 * @return {Object} source/medium
 */
export function parseReferrer (referrer) {
    let hostname = transformHostname(referrer.hostname);
    let medium = '';

    if (referrer.pathname.indexOf('/aclk') !== -1) {
        medium = 'ppc';
    } else if (searchEngineRegex.test(hostname)) {
        medium = 'organic';
    } else if (socialRegex.test(hostname)) {
        medium = 'social';
    } else {
        medium = 'referral';
    }
    
    return {
        source: hostname,
        medium: medium
    };
}

/**
 * Parse UTM parameters to establish source/medium
 *
 * @todo attempt to fill in other source/medium gaps if partially missing
 *
 * @param  {Object} url
 * @return {Object} source/medium
 */
export function parseUtm (params, referrer) {
    let source = params.utm_source;
    let medium = params.utm_medium;
    let hostname = parseHostname(referrer.hostname);

    /**
     * Maybe set to PPC
     *
     * For justification see http://help.hubspot.com/articles/KCS_Article/Reports/How-does-HubSpot-categorize-visits-contacts-and-customers-in-the-Sources-Report
     */
    if (hostname === 'google') {
        source = 'google';
        medium = 'ppc';
    }

    return {
        source: source,
        medium: medium
    };
}
