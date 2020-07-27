<template>
    <div>
        <BackHeader title="BookShelf" :with-left="false" :height="60" class="bookshelf-top"/>
        <div v-if="(!items || items.length === 0) && !loading">
            <van-empty description="No Books"/>
        </div>
        <div v-else>
            <van-loading v-if="loading"/>
            <RowList :load-data-func="load" @onRowItemClick="clickRow" v-if="!loading"/>
        </div>
    </div>
</template>

<script>
    import BackHeader from "../../components/BackHeader";
    import RowList from "../../components/RowList";
    import {QueryItem} from "../../utils/storage";
    import {KEY_BOOKMARK_PREFIX} from "../../config/config";
    import {FETCH_BOOKS, FETCH_GENRES, GET_COMIC_DETAIL} from "../../store/comic/comic";

    export default {
        name: "Book",
        components: {RowList, BackHeader},
        created() {
            this.loading = true;
            let saved = QueryItem(KEY_BOOKMARK_PREFIX);
            if (!saved) {
                this.loading = false;
                this.items = [];
            } else {
                this.$store.dispatch(FETCH_GENRES).then(() => {
                    this.$store.dispatch(FETCH_BOOKS).then(() => {
                        if (saved) {
                            let items = [];
                            let bookmarks = JSON.parse(saved);
                            let uniqTest = [];
                            for (let i = 0, len = bookmarks.length; i < len; i++) {
                                let cid = bookmarks[i].comic_id;
                                if (uniqTest.indexOf(cid) < 0) {
                                    items.push(this.$store.getters[GET_COMIC_DETAIL](cid));
                                    uniqTest.push(cid);
                                    console.log('uniq.test', cid)
                                }
                            }
                            this.items = items;
                            console.log('items', this.items);
                        }
                        this.loading = false;
                    })
                });
            }
        },
        data() {
            return {
                loading: true,
                items: [],
            }
        },
        methods: {
            clickRow: function (item) {
                this.$router.push('/comic/' + item['comic_id']);
            },
            load: function () {
                return new Promise((resolve) => {
                    resolve({
                        hasMore: false,
                        clearFirst: false,
                        items: this.items,
                    });
                });
            },
        }
    }
</script>

<style scoped>
    .bookshelf-top {
        text-align: center;
    }
</style>