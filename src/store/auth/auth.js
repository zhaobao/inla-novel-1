import {ParseQueryParam} from "../../utils/uri";

export const SAVE_PAIRS = "save_pairs";
export const GET_PAIRS = "get_pairs";

export default {
    state: {
        pairs: {},
    },
    mutations: {
        [SAVE_PAIRS]: function (state) {
            state.pairs = ParseQueryParam()
        },
        [GET_PAIRS]: function (state, key) {
            if (Object.prototype.hasOwnProperty.call(state.pairs, key)) {
                return state.pairs[key];
            }
            return null;
        }
    },
    actions: {},
    modules: {}
}