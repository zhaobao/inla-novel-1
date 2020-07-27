<template>
    <div class="home-recommend">
        <LineSpace/>
        <HorizontalRectList :items="banners" :show-count="2.5" :icon-size="iconWidth" @onClickItem="clickItem"/>
        <div>
            <NormalHeader :title="$i18n('recommend_for_you')" :has-right="false" v-if="!loading"/>
            <van-loading v-if="loading"/>
            <RowList v-if="!loading" :load-data-func="loadRecommendRows" class="home-row-list" :left-icon-size="80"
                     @onRowItemClick="clickRowList"/>
        </div>
    </div>
</template>

<script>
    import NormalHeader from "../../../components/NormalHeader";
    import {FETCH_BANNERS, FETCH_BOOKS, GET_RAND_BOOKS,} from "../../../store/comic/comic";
    import HorizontalRectList from "../../../components/HorizontalRectList";
    import RowList from "../../../components/RowList";
    import LineSpace from "../../../components/LineSpace";

    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    export default {
        name: "Recommend",
        components: {LineSpace, RowList, HorizontalRectList, NormalHeader},
        beforeCreate() {
            this.$store.dispatch(FETCH_BANNERS).then((data) => {
                this.banners = data.data;
            })
            this.$store.dispatch(FETCH_BOOKS).then(() => {
                this.loading = false;
            });
        },
        data() {
            return {
                banners: [],
                number: 0,
                size: 8,
                loading: true,
                iconWidth: width / 3 - 16,
            }
        },
        methods: {
            clickItem: function (item) {
                this.$router.push('/comic/' + item['comic_id']);
            },
            clickRowList: function (item) {
                this.$router.push('/comic/' + item['comic_id']);
            },
            loadRecommendRows: function () {
                let that = this;
                return new Promise((resolve) => {
                    if (that.number === 2) {
                        resolve({items: [], hasMore: false});
                    }
                    setTimeout(function () {
                        let output = that.$store.getters[GET_RAND_BOOKS](that.number, that.size)
                        resolve({
                            items: output,
                            hasMore: true
                        });
                        that.number++;
                    }, 1000)
                })
            }
        }
    }
</script>

<style scoped>
    .home-recommend {
        margin-bottom: 3em;
    }
</style>