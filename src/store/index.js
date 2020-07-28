import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth/auth';
import Book from './book/book'

Vue.use(Vuex)

export const HIDE_SPLASH = "hideSplash"

export default new Vuex.Store({
    state: {
        showSplash: !window.localStorage.getItem('show_splash')
    },
    mutations: {
        [HIDE_SPLASH]: () => {
            try {
                window.localStorage.setItem('show_splash', '1');
            } catch (e) {
                // ignore
            }
        }
    },
    actions: {},
    modules: {
        auth: Auth,
        book: Book
    }
})