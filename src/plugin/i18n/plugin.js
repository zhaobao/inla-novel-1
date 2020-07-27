import strings from "../../strings";
import {QueryItem} from "../../utils/storage";
import {STORAGE_PREFIX} from "../../config/config";

export default {
    install: function (Vue, options) {
        var lang = options['defaultLanguage'];
        Vue.prototype.$i18n = function (key) {
            if (key.length === 0) {
                return key;
            }

            let localConf = QueryItem(STORAGE_PREFIX + "_conf");
            if (localConf) {
                try {
                    localConf = JSON.parse(localConf);
                } catch(e) {
                    // ignore
                }
            }
            if (localConf) {
                if (!Object.prototype.hasOwnProperty.call(strings, lang) && !Object.prototype.hasOwnProperty.call(strings[lang], key)) {
                    return strings[lang][key];
                }
            }
            if (!Object.prototype.hasOwnProperty.call(strings, lang)) {
                return '[not.in.strings]' + key;
            }
            if (!Object.prototype.hasOwnProperty.call(strings[lang], key)) {
                return '[not.in.strings]' + key;
            }
            return strings[lang][key];
        }
    }
}