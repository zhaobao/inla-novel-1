import instance from "./instance";
import {QueryItem, SaveItem} from "../utils/storage";

export let AuthCheck = function () {
    if (process.env.NODE_ENV === "development") {
        return new Promise((resolve) => {
            resolve({data: {code: 200}});
        })
    }
    return instance.post("/assets/auth/verify")
}

export let FetchGenres = function () {
    return instance.post("/comic/genres")
}

export let FetchBanners = function () {
    return instance.post("/comic/banners")
}

export let FetchBooks = function () {
    return instance.post("/comic/books")
}

export let FetchBookChapters = function (comic_id) {
    return instance.post("/comic/book/chapters", {comic_id: comic_id})
}

const chapterKeyPrefix = "comic_chapter_"

export let FetchChapter = function (comic_id, chapter_index) {
    let key = chapterKeyPrefix + comic_id + "_" + chapter_index;
    let cache = QueryItem(key);
    return new Promise((resolve) => {
        if (cache) {
            resolve(JSON.parse(cache))
        } else {
            instance.post("/comic/chapter", {
                comic_id: comic_id,
                chapter_index: chapter_index
            }).then((resp) => {
                SaveItem(key, JSON.stringify(resp.data));
                resolve(resp.data);
            })
        }
    })
}