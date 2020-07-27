<template>
    <div class="home-hot">
        <van-loading v-if="loading" />
        <RowList v-if="!loading" :loadDataFunc="loadItems" @onRowItemClick="clickRow"/>
    </div>
</template>

<script>
    import {FETCH_BOOKS, FETCH_GENRES, GET_TOP_BOOKS} from "../../../store/comic/comic";
    import RowList from "../../../components/RowList";

    export default {
        name: "Hot",
        components: {RowList},
        beforeCreate() {
            this.$store.dispatch(FETCH_GENRES).then(() => {
                this.$store.dispatch(FETCH_BOOKS).then(() => {
                    this.loading = false;
                })
            });
        },
        data() {
            return {
                banners: [],
                pageSize: 6,
                pageNumber: 0,
                activeIndex: 0,
                loading: true,
            }
        },
        methods: {
            clickRow: function (item) {
                window.location.href = item.src;
            },
            loadItems: function () {
                let that = this;
                return new Promise((resolve) => {
                    if (this.pageNumber === 3) {
                        resolve({
                            items: [],
                            hasMore: false,
                            cleanFirst: this.cleanFirst
                        });
                        if (that.cleanFirst) {
                            that.cleanFirst = false;
                        }
                        return;
                    }
                    setTimeout(function () {
                        let hasMore = true;
                        let data = that.$store.getters[GET_TOP_BOOKS](that.pageNumber, that.pageSize);
                        if (data.length < that.pageSize) {
                            hasMore = false;
                        }
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

<style scoped>
    .home-hot {
        margin-bottom: 3em;
    }
</style>