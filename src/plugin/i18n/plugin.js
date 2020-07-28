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

            let localStrings = QueryItem(STORAGE_PREFIX + "_conf");
            if (localStrings) {
                try {
                    localStrings = JSON.parse(localStrings);
                } catch (e) {
                    // ignore
                }
            }
            if (localStrings) {
                if (Object.prototype.hasOwnProperty.call(localStrings, lang) &&
                    Object.prototype.hasOwnProperty.call(localStrings[lang], key)) {
                    return localStrings[lang][key];
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