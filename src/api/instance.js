import {GetAuthToken} from "../utils/uri";

const axios = require('axios');
const instance = axios.create();
instance.defaults.timeout = 27000;
instance.defaults.baseURL = process.env.VUE_APP_API;

instance.interceptors.request.use(function (config) {
    if (!config.data) {
        config.data = {};
    }
    let auth = GetAuthToken();
    console.log('instance.interceptors.request', auth);
    if (auth && Object.prototype.hasOwnProperty.call(auth, "_at_")) {
        config.data['auth_token'] = auth['_at_']
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.data && response.data.code === 200) {
        if (response.data.data && typeof (response.data.data) === "string") {
            response.data.data = JSON.parse(response.data.data)
        }
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;