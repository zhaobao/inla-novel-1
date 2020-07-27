<template>
    <div>
        <van-loading v-if="loading"/>
        <RowList v-if="!loading" :load-data-func="load" class="cate-list"/>
    </div>
</template>

<script>
    import RowList from "../../../components/RowList";
    import {FETCH_BOOKS, FETCH_GENRES, GET_CATE_BOOKS} from "../../../store/comic/comic";

    export default {
        components: {RowList},
        props: {
            name: String
        },
        name: "Cate",
        beforeCreate() {
            this.$store.dispatch(FETCH_GENRES).then(() => {
                this.$store.dispatch(FETCH_BOOKS).then(() => {
                    this.loading = false;
                })
            });
        },
        data() {
            return {
                size: 8,
                index: 0,
                loading: true
            }
        },
        methods: {
            load() {
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
                        let data = that.$store.getters[GET_CATE_BOOKS](that.name, that.index, that.size);
                        if (data.length < that.size) {
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
                        that.index++;
                    }, 1000)
                })
            }
        }
    }
</script>

<style scoped>
    .cate-list {
        margin-bottom: 3em;
    }
</style>