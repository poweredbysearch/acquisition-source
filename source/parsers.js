'use strict';

const hostnameRegex = /(?:www\.)?(\w+)(?:\.\w{2,3}){1,2}/;

const sourceMap = {
    'google': ['google','googleadservices']
};

/**
 * Parse referrer url to establish source/medium
 *
 * @param  {Object} referrer
 * @return {Object} source/medium
 */
export function parseReferrer (referrer) {
    let hostname = hostnameRegex.exec(referrer.hostname);

    if (hostname !== null) {
        hostname = hostname[1];
    }

    for (var source in sourceMap) {
        if (sourceMap.hasOwnProperty(source)) {
            if (sourceMap[source].indexOf(hostname) !== -1) {
                hostname = source;
                break;
            }
        }   
    }
    
    return {
        source: hostname,
        medium: 'ppc'
    };
}

/**
 * Parse UTM parameters to establish source/medium
 *
 * @param  {Object} params
 * @return {Object} source/medium
 */
export function parseUtm (params) {
    console.log(params);
}
