import Vue from 'vue'
import Vuex from 'vuex'
import Games from './game/game';
import Auth from './auth/auth';
import Comic from './comic/comic'

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
        games: Games,
        auth: Auth,
        comic: Comic
    }
})

/*
this.$store.getters[GET_GAME_BY_ID](this.gameId);
this.$store.dispatch(FETCH_GAME_BANNERS).then((items) => {
  this.banners = items;
})
 */