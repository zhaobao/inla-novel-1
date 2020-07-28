<template>
    <div class="detail" v-if="isRouterAlive">
        <BackHeader :title="item.name" :height="68" :with-left="true"/>
        <div class="detail-body">
            <van-image :src="item.cover" class="detail-cover"/>
            <van-row class="detail-action">
                <van-col span="12" class="detail-action__left">
                    <van-button block :icon="star_icon" type="default" @click="clickLove">{{$i18n('favorite')}}
                    </van-button>
                </van-col>
                <van-col span="12" class="detail-action__right">
                    <van-button block icon="eye-o" type="info" @click="clickRead">{{readText}}</van-button>
                </van-col>
            </van-row>
            <van-cell-group>
                <van-cell title="Name" :value="item.name"/>
                <van-cell title="Author" :value="item.author"/>
                <van-cell title="Category">
                    <template #default>
                        <van-tag round type="primary">{{item.category}}</van-tag>
                    </template>
                </van-cell>
                <van-cell title="More" :value="item.name_alter"/>
                <van-cell :title="item.brief"/>
                <van-cell title="Chapters"/>
                <div class="chapter">
                    <van-loading v-if="loading"/>
                    <van-grid :column-num="1" :gutter="10" v-if="!loading">
                        <van-grid-item v-for="item in pageData()" icon="null"
                                       @click="clickGrid(item.book_id, item.chapter_index)"
                                       :text="item.title+''" :key="item.chapter_index" :dot="item === 6"/>
                    </van-grid>
                    <van-pagination
                            v-if="!loading"
                            class="detail-pagination"
                            v-model="currentPage"
                            :total-items="totalItems"
                            prev-text="Prev"
                            next-text="Next"
                            :show-page-size="3"
                            force-ellipses
                    />
                </div>

            </van-cell-group>
            <div class="detail-guess">
                <van-cell title="Guess your like"/>
                <RowList :load-data-func="loadItems" @onRowItemClick="clickRow"/>
            </div>
        </div>
    </div>
</template>

<script>
    import BackHeader from "../components/BackHeader";
    import {FETCH_BOOKS, FETCH_GENRES, GET_BOOK_DETAIL, GET_RAND_BOOKS} from "../store/book/book";
    import {AppendItem, QueryItem} from "../utils/storage";
    import {KEY_BOOKMARK_PREFIX} from "../config/config";
    import RowList from "../components/RowList";

    export default {
        name: "Detail",
        components: {RowList, BackHeader},
        props: {
            book_id: {type: String, required: true}
        },
        created() {
            this.fetchData();
        },
        data() {
            return {
                isRouterAlive: true,
                loading: true,
                currentPage: 1,
                totalItems: 0,
                item: {},
                chapters: [],
                historyInfo: null,
                star_icon: !history ? 'star-o' : 'star'
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
            readText: function () {
                if (this.historyInfo) {
                    return this.$i18n('read_continue');
                }
                return this.$i18n('read');
            }
        },
        mounted() {
            let saved = QueryItem(KEY_BOOKMARK_PREFIX);
            if (saved) {
                let bookmarks = JSON.parse(saved);
                for (let i = 0, len = bookmarks.length; i < len; i++) {
                    if (bookmarks[i].book_id === this.book_id) {
                        this.historyInfo = bookmarks[i];
                    }
                }
            }
        },
        methods: {
            fetchData() {
                this.loading = true;
                this.$store.dispatch(FETCH_GENRES).then(() => {
                    this.$store.dispatch(FETCH_BOOKS).then(() => {
                        this.loading = false;
                        this.item = [];
                        this.item = this.$store.getters[GET_BOOK_DETAIL](this.book_id);
                        this.totalItems = this.item['chapter_count'];
                        this.chapters = [];
                        for (let i = 1; i <= this.totalItems; i++) {
                            this.chapters.push({
                                book_id: this.book_id,
                                chapter_index: i,
                                title: 'chapter-' + i,
                            });
                        }
                    });
                })
            },
            clickLove() {
                if (!this.historyInfo) {
                    AppendItem(KEY_BOOKMARK_PREFIX, {
                        book_id: this.book_id,
                        chapter_id: '1',
                        id: this.book_id,
                    })
                }
                this.$toast({type: 'success', message: 'saved'});
                this.star_icon = 'star';
            },
            clickRead() {
                let history_chapter_id = this.historyInfo ? this.historyInfo['chapter_id'] : '1';
                this.$router.push('/read/' + this.book_id + '/' + history_chapter_id);
            },
            clickGrid(book_id, chapter_index) {
                this.$router.push('/read/' + book_id + '/' + chapter_index);
            },
            clickRow(item) {
                this.$router.push('/book/' + item['book_id']);
            },
            pageData() {
                let start = this.currentPage - 1;
                let end = start + 8;
                let ret = this.chapters.slice(start, end);
                console.log('pageData', start, end, ret)
                return ret;
            },
            loadItems: function () {
                let that = this;
                return new Promise((resolve) => {
                    setTimeout(function () {
                        let hasMore = false;
                        let data = that.$store.getters[GET_RAND_BOOKS](0, 6);
                        data = data.filter((item) => {
                            return item.comid_id !== that.book_id;
                        });
                        resolve({
                            items: data,
                            hasMore: hasMore,
                            cleanFirst: that.cleanFirst
                        });
                        if (that.cleanFirst) {
                            that.cleanFirst = false;
                        }
                        that.pageNumber++;
                    }, 1000)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .detail {
        text-align: left;
    }

    .detail-action {
        text-align: center;
    }

    .detail-action__right, .detail-action__left {
        padding: 1em;
    }

    .detail-cover {
        padding: 1em;
        max-width: 30%;
    }

    .chapter {
        padding: 1em;
        box-sizing: border-box;
    }

    .detail-pagination {
        margin-top: 1em;
    }

    .detail-guess {
        padding: 1em 0;
    }
</style>