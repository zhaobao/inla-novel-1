<template>
    <div>
        <BackHeader :title="toTitle(group)" height="66"/>
        <br>
        <RowList :load-data-func="loadRows" @onRowItemClick="clickRowItem"/>
    </div>
</template>

<script>
    import BackHeader from "../components/BackHeader";
    import RowList from "../components/RowList";
    import {GET_BOOK_DETAIL, GET_CATE_BOOKS, GET_TOP_BOOKS, GET_RANK_BOOKS} from "../store/book/book";
    import {Toast} from "vant";
    import {CapitalizeFirstLetter} from "../utils/str";

    export default {
        name: "List",
        components: {RowList, BackHeader},
        props: {
            group: String
        },
        data() {
            return {
                index: 0,
                size: 8
            }
        },
        methods: {
            toTitle: function(input) {return CapitalizeFirstLetter(input)},
            getAction: function () {
                switch (this.group) {
                    case "hot":
                        return this.$store.getters[GET_RANK_BOOKS]
                    case "new":
                        return this.$store.getters[GET_TOP_BOOKS]
                    default:
                        return function (size, index) {
                            return this.$store.getters[GET_CATE_BOOKS](this.group, size, index)
                        }.bind(this)
                }
            },
            loadRows: function () {
                let that = this;
                return new Promise((resolve) => {
                    if (that.index === 3) {
                        resolve({items: [], hasMore: false});
                    }
                    setTimeout(function () {
                        resolve({items: that.getAction()(that.size, that.index), hasMore: true});
                        that.index++;
                    }, 1000)
                })
            },
            clickRowItem: function (item) {
                Toast.loading({
                    message: this.$i18n('loading'),
                    duration: 0,
                    forbidClick: true,
                });
                window.location.href = this.$store.getters[GET_BOOK_DETAIL](item.game_id).src;
            }
        }
    }
</script>

<style scoped>

</style>