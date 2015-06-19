'use strict';

import cookies from 'cookies-js';
import {parseReferrer, parseUtm} from './parsers';

var cookieName = 'acqsrc';


function acquireSource(opts) {
    if (document.referrer === '' || )
}

const acquisitionSource = {

    get cookie() {
        return cookieName;
    },

    set cookie(data) {

    },

    acquire (opts = {}) {
        return acquireSource(Object.assign({
            cookie: 'acqsrc'
        }, opts));
    },

    parseReferrer,

    parseUtm

};


export default acquisitionSource;
