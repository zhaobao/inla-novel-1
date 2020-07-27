<template>
    <div class="rank-body">
        <van-grid :gutter="8" :column-num="3" direction="horizontal" class="top-3">
            <template #default>
                <van-grid-item v-for="(item, index) in topItems" :key="index" class="grid-item">
                    <RectItem :id="item.game_id" :icon-src="item.cover"
                              :title="item.name" @onClickGrid="clickGrid" :icon-size="iconWidth"/>
                </van-grid-item>
            </template>
        </van-grid>
        <van-loading v-if="loading"/>
        <LineSpace/>
        <RowList v-if="!loading" :loadDataFunc="loadItems"
                 :show-right-text="true"
                 right-text-style="font-size: 20px; font-style: italic;"
                 @onRowItemClick="clickRow" class="row-list"/>
    </div>
</template>

<script>
    import RectItem from "../../../components/RectItem";
    import RowList from "../../../components/RowList";
    import LineSpace from "../../../components/LineSpace";
    import {FETCH_BOOKS, FETCH_GENRES, GET_RANK_BOOKS} from "../../../store/comic/comic";

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    export default {
        name: "Rank",
        components: {LineSpace, RowList, RectItem},
        data() {
            return {
                topItems: [],
                pageSize: 3,
                pageNumber: 1,
                loading: true,
                iconWidth: width/3 - 32,
            }
        },
        beforeCreate() {
            this.$store.dispatch(FETCH_GENRES).then(() => {
                this.$store.dispatch(FETCH_BOOKS).then(() => {
                    this.topItems = this.$store.getters[GET_RANK_BOOKS](0, 3);
                    this.loading = false;
                })
            });
        },
        methods: {
            clickGrid: function () {

            },
            clickRow: function () {
            },
            loadItems: function () {
                let that = this;
                return new Promise((resolve) => {
                    if (this.pageNumber === 4) {
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
                        let data = that.$store.getters[GET_RANK_BOOKS](that.pageNumber, that.pageSize);
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

<style scoped lang="scss">
    @import "../../../assets/scss/var";

    .top-3 {
        background: $gradient1;
        padding: 1em 0;
    }

    .rank-body {
        padding: 1em 0;
        margin-bottom: 3em;
    }
</style>