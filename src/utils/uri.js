import {QueryItemCheckExpiration, SaveItemWithExpiration} from "./storage";
import {STORAGE_PREFIX} from '../config/config';

function parseQuery() {
    let url_search = window.location.search;
    if (url_search.length > 0) {
        url_search = url_search.substr(1);
        if (url_search.length > 0) {
            let ret = {};
            let pairs = url_search.split('&');
            for (let i = 0, len = pairs.length; i < len; i++) {
                let kv = pairs[i].split('=');
                ret[kv[0]] = kv[1];
            }
            return ret;
        }
    }
    return null
}

function authInfo() {
    let cacheKey = STORAGE_PREFIX + '_at_';
    let local = QueryItemCheckExpiration(cacheKey);
    console.log('get_auth', cacheKey, local)
    if (local) {
        return JSON.parse(local);
    }
    let pair = parseQuery();
    if (pair && Object.prototype.hasOwnProperty.call(pair, '_at_')) {
        SaveItemWithExpiration(cacheKey, JSON.stringify(pair), new Date().getTime() / 1000 + 30 * 86400)
        return pair;
    }
}

export let GetAuthToken = authInfo;
export let ParseQueryParam = parseQuery;