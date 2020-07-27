// 请求API获得数据
export const FETCH_GAMES = "fetchGames"
export const FETCH_GAME_BANNERS = "fetchGamesBanners"

// Getter过滤数据
export const GET_GAME_BY_ID = "getGameById";
export const GET_GAMES_HOT = "getGamesHot";
export const GET_GAMES_NEW = "getGamesNew";
export const GET_GAMES_CAT = "getGamesCat";
export const GET_GAMES_RECOMMEND = "getGamesRecommend";
export const GET_GAMES_TOP = "getGamesTop";
export const GET_GAMES_TOP_LIST = "getGamesTopList";
export const GET_GAME_CATES = "getGameCates"
export const GET_GAME_RANDOM = "getGameRand"

import games, {cates} from "./store";

export default {
    state: {
        name: 'games',
        items: games,
        banners: [],
    },
    mutations: {
        'saveItems': function (state, payload) {
            state.items = payload;
        },
        'saveBanners': function (state, payload) {
            state.banners = payload;
        }
    },
    getters: {
        [GET_GAME_CATES]: () => {
            return JSON.parse(JSON.stringify(cates));
        },
        [GET_GAME_BY_ID]: (state) => (id) => {
            return state.items.find((item) => {
                return item.game_id === id;
            })
        },
        [GET_GAMES_RECOMMEND]: () => (pageSize, pageNumber) => {
            return JSON.parse(JSON.stringify(games)).sort((a, b) => {
                return b.c_love - a.c_love;
            }).slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
        },
        [GET_GAME_RANDOM]: () => (size) => {
            return JSON.parse(JSON.stringify(games)).sort(() => {
                return Math.random() - 0.5;
            }).filter((item) => {
                return item.name.length < 15;
            }).slice(0, size).sort((a, b) => {
                return a.name.length - b.name.length;
            });
        },
        [GET_GAMES_TOP]: () => () => {
            return JSON.parse(JSON.stringify(games)).filter((item) => {
                return item.name.length > 12 && item.name.length < 18;
            }).sort((a, b) => {
                return b.c_click - a.c_click;
            }).slice(0, 3)
        },
        [GET_GAMES_TOP_LIST]: () => (pageSize, pageNumber) => {
            console.log('GET_GAMES_TOP_LIST',pageSize, pageNumber);
            return JSON.parse(JSON.stringify(games)).sort((a, b) => {
                return b.c_click - a.c_click;
            }).slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
        },
        [GET_GAMES_HOT]: () => (pageSize, pageNumber) => {
            return JSON.parse(JSON.stringify(games)).sort((a, b) => {
                return a.c_click - b.c_click;
            }).slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
        },
        [GET_GAMES_NEW]: () => (pageSize, pageNumber) => {
            return JSON.parse(JSON.stringify(games)).slice(0, 50).sort((a, b) => {
                return a.c_visit - b.c_visit;
            }).slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
        },
        [GET_GAMES_CAT]: () => (cate, pageSize, pageNumber) => {
            return JSON.parse(JSON.stringify(games)).filter((item) => {
                return item.category === cate
            }).slice(0, 50).sort((a, b) => {
                return a.c_visit - b.c_visit;
            }).slice(pageNumber * pageSize, pageNumber * pageSize + pageSize)
        },
    },
    actions: {
        [FETCH_GAME_BANNERS]: function (context) {
            return new Promise((resolve) => {
                if (context.state.banners.length > 0) {
                    resolve(context.state.banners);
                    return;
                }
                setTimeout(function () {
                    let data = games.filter((item) => {
                        return item.quality === 5;
                    }).sort((a, b) => {
                        return a.id - b.id;
                    });
                    context.commit('saveBanners', data);
                    resolve(context.state.banners);
                }, 1000)
            })
        },
        [FETCH_GAMES]: function (context) {
            return new Promise((resolve) => {
                if (context.state.items.length > 0) {
                    resolve(context.state.items);
                    return;
                }
                setTimeout(function () {
                    context.commit('saveItems', games);
                    resolve(context.state.items);
                }, 1000);
            });
        }
    },
    modules: {}
}