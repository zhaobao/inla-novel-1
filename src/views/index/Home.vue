<template>
    <div class="home">
        <BigHeader :title="$i18n('site_title')"/>
        <van-dropdown-menu>
            <van-dropdown-item v-model="category" :options="categories" @change="changeCategory"/>
            <van-dropdown-item v-model="sort" :options="sorts" @change="changeSort"/>
        </van-dropdown-menu>
        <div>
            <LineSpace/>
            <van-loading v-if="loading"/>
            <RowList v-if="!loading" :load-data-func="loadRows"
                     class="home-row-list" :left-icon-size="80"
                     :reload="refresh"
                     @onRowItemClick="clickRowList"/>
        </div>
    </div>
</template>

<script>
    import {FETCH_BOOKS, FETCH_GENRES, GET_CATE_BOOKS, GET_RANK_BOOKS, GET_TOP_BOOKS,} from "../../store/book/book";
    import RowList from "../../components/RowList";
    import BigHeader from "../../components/BigHeader";
    import LineSpace from "../../components/LineSpace";

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    export default {
        name: "Recommend",
        components: {LineSpace, BigHeader, RowList},
        beforeCreate() {
            this.$store.dispatch(FETCH_GENRES).then((data) => {
                if (!data) {
                    return;
                }
                data = data.map((item) => {
                    item['text'] = item['name'];
                    item['value'] = item['genre_id'];
                    return item;
                });
                data.sort((a, b) => {
                    return b['count'] - a['count'];
                });
                data.unshift({'text': 'ALL', value: 'all'});
                this.categories = data;
                this.$store.dispatch(FETCH_BOOKS).then(() => {
                    this.loading = false;
                    this.banners = this.$store.getters[GET_RANK_BOOKS](0, 3);
                });
            });
        },
        data() {
            return {
                number: 0,
                size: 8,
                loading: true,
                iconWidth: width / 3 - 16,
                category: 'all',
                sort: 'new',
                refresh: false,
                categories: [
                    {'text': 'ALL', value: 'all'}
                ],
                sorts: [
                    {text: 'New', value: 'new'},
                    {text: 'Hot', value: 'hot'},
                ],
            }
        },
        methods: {
            changeCategory() {
                this.number = 0;
                this.refresh = !this.refresh;
            },
            changeSort() {
                this.number = 0;
                this.refresh = !this.refresh;
            },
            clickRowList: function (item) {
                this.$router.push('/book/' + item['book_id']);
            },
            loadRows: function () {
                console.log('trigger.loadRows');
                let that = this;
                return new Promise((resolve) => {
                    let output;
                    if (that.category === 'all') {
                        if (that.sort === 'hot') {
                            output = that.$store.getters[GET_RANK_BOOKS](that.number, that.size);
                        } else {
                            output = that.$store.getters[GET_TOP_BOOKS](that.number, that.size);
                        }
                    } else {
                        output = that.$store.getters[GET_CATE_BOOKS](that.category, (a, b) => {
                            if (that.sort === 'hot') {
                                return a.chapter_count - b.chapter_count;
                            } else {
                                return a.brief.length - b.brief.length;
                            }
                        }, that.number, that.size);
                    }
                    if (output.length === 0) {
                        resolve({items: [], hasMore: false});
                        return;
                    }
                    resolve({
                        items: output,
                        hasMore: true
                    });
                    that.number++;
                })
            }
        }
    }
</script>

<style scoped>
    .home {
        margin-bottom: 3em;
    }
</style>