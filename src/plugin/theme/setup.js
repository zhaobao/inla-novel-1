import {Theme} from "../../config/theme";

export default {
    install: function (Vue) {
        Vue.prototype.$color = function (key) {
            return Theme[key];
        }
    }
}