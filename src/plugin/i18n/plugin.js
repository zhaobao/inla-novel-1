import strings from "@/strings";
import {QueryItem} from "@/utils/storage";
import {STORAGE_PREFIX} from "@/config/config";

export default {
    install: function (Vue, options) {
        console.log(options);
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
                if (Object.prototype.hasOwnProperty.call(localStrings, key)) {
                    return localStrings[key];
                }
            }
            if (!Object.prototype.hasOwnProperty.call(strings, key)) {
                return '[not.in.strings]' + key;
            }
            return strings[key];
        }
    }
}