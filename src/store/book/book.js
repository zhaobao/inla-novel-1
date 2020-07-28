import {FetchBooks, FetchGenres} from "../../api/action"
import {COLORS, HOST} from "../../config/config";

export const FETCH_GENRES = "fetch_genres"
export const FETCH_BOOKS = "fetch_books"

export const GET_RAND_BOOKS = "get_rand_books"
export const GET_TOP_BOOKS = "get_top_books"
export const GET_RANK_BOOKS = "get_rank_books"
export const GET_CATE_BOOKS = "get_cate_books"
export const GET_BOOK_DETAIL = "get_comic_detail"

export default {
    state: {
        genres: [],
        banners: [],
        books: [],
        chapters: {},
    },
    mutations: {
        "saveBanners": function (state, payload) {
            state.banners = payload;
        },
        "saveGenres": function (state, payload) {
            state.genres = payload;
        },
        "saveBooks": function (state, payload) {
            state.books = payload;
        },
    },
    getters: {
        [GET_BOOK_DETAIL]: (state) => (cid) => {
            let copy = JSON.parse(JSON.stringify(state.books))
            for (let i = 0, len = copy.length; i < len; i++) {
                if (copy[i]['book_id'] === cid) {
                    return copy[i];
                }
            }
            return {};
        },
        [GET_RAND_BOOKS]: (state) => (number, size) => {
            let copy = JSON.parse(JSON.stringify(state.books))
            return copy.sort(() => {
                return Math.random() - 0.5;
            }).slice(number * size, number * size + size);
        },
        [GET_TOP_BOOKS]: (state) => (number, size) => {
            let copy = JSON.parse(JSON.stringify(state.books))
            return copy.sort((a, b) => {
                return a.brief.length - b.brief.length;
            }).slice(number * size, number * size + size);
        },
        [GET_RANK_BOOKS]: (state) => (number, size) => {
            let copy = JSON.parse(JSON.stringify(state.books))
            return copy.sort((a, b) => {
                return a.chapter_count - b.chapter_count;
            }).slice(number * size, number * size + size);
        },
        [GET_CATE_BOOKS]: (state) => (cate, sortFunc, number, size) => {
            let copy = JSON.parse(JSON.stringify(state.books))
            return copy.filter((item) => {
                return item['genre_id'] === cate;
            }).sort((a, b) => {
                return sortFunc(a, b);
            }).slice(number * size, number * size + size);
        },
    },
    actions: {
        [FETCH_GENRES]: function (context) {
            return new Promise((resolve) => {
                if (context.state.genres.length > 0) {
                    resolve(context.state.genres);
                    return
                }
                FetchGenres().then((resp) => {
                    context.commit('saveGenres', resp.data.data)
                    resolve(resp.data.data);
                });
            });
        },
        [FETCH_BOOKS]: function (context) {
            return new Promise((resolve) => {
                if (context.state.books.length > 0) {
                    resolve({data: context.state.books});
                    return
                }
                FetchBooks().then((resp) => {
                    resp.data.data.map((item) => {
                        let genreItem = context.state.genres.find((row) => {
                            return row['genre_id'] === item['genre_id'];
                        })
                        if (genreItem) {
                            item['category'] = genreItem['name'];
                        }
                        if (!item['primary_color']) {
                            item['primary_color'] = COLORS.tags[parseInt(Math.random() * COLORS.tags.length)];
                        }
                        item['cover'] = HOST + '/' + item['book_id'] + '/cover.jpg';
                        return item;
                    });
                    context.commit('saveBooks', resp.data.data)
                    resolve(resp.data)
                });
            });
        }
    },
    modules: {}
}