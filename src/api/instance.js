import {GetAuthToken} from "../utils/uri";
import {CODES, STORAGE_PREFIX} from "../config/config";
import {SaveItem} from "../utils/storage";

const axios = require('axios');
const instance = axios.create();
instance.defaults.timeout = 27000;
instance.defaults.baseURL = process.env.VUE_APP_API;

instance.interceptors.request.use(function (config) {
    if (!config.data) {
        config.data = {};
    }
    let auth = GetAuthToken();
    if (auth && Object.prototype.hasOwnProperty.call(auth, "_at_")) {
        config.data['auth_token'] = auth['_at_']
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// test token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmMiOiIwZDZhZmI1MyIsImRlc2MiOiJub3ZlbCBmb3IgcmV2aWV3IiwiZXhwIjoxNTk4NDk2MTY0fQ.MXBq9nZdPnSW-ZizTHIEkZH-GKy7Jfa5Z9z_QgODw3I
instance.interceptors.response.use(function (response) {
    console.log('instance.interceptors.response', response);
    if (response.data && response.data.code === CODES.SUCCESS) {
        if (Object.prototype.hasOwnProperty.call(response.headers, 'max-age')) {
            SaveItem(STORAGE_PREFIX + '_' + response.config.url, response.data.data);
        }
        if (response.data.data && typeof (response.data.data) === "string") {
            response.data.data = JSON.parse(response.data.data)
        }
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;