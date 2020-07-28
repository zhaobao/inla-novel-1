import instance from "./instance";

export let AuthCheck = function () {
    if (process.env.NODE_ENV === "development") {
        return new Promise((resolve) => {
            resolve({data: {code: 200, data: '{"en":{"site_title":"Novel East"}}'}});
        })
    }
    return instance.post("/assets/auth/verify")
}

export let FetchGenres = function () {
    return instance.post("/novel/genres")
}

export let FetchBooks = function () {
    return instance.post("/novel/books")
}

export let FetchChapters = function (book_id, chapter_index) {
    return instance.post("/novel/chapters", {book_id: book_id, chapter_index: chapter_index})
}