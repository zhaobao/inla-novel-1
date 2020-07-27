<template>
    <div>
        <BackHeader title="TopItems" height="66"/>
        <br>
        <GridRectList :load-data-func="loadTopRows" @onClickGrid="clickGrid"/>
    </div>
</template>

<script>
    import GridRectList from "../components/GridRectList";
    import BackHeader from "../components/BackHeader";
    import {GET_GAME_BY_ID, GET_GAMES_TOP_LIST} from "../store/game/game";
    import {Toast} from "vant";

    export default {
        name: "Grid",
        components: {BackHeader, GridRectList},
        data() {
            return {
                index: 0,
                size: 9
            }
        },
        methods: {
            loadTopRows: function () {
                let that = this;
                return new Promise((resolve) => {
                    if (that.index === 3) {
                        resolve({items: [], hasMore: false});
                    }
                    setTimeout(function () {
                        resolve({items: that.$store.getters[GET_GAMES_TOP_LIST](that.size, that.index), hasMore: true});
                        that.index++;
                    }, 1000)
                })
            },
            clickGrid: function (gid) {
                Toast.loading({
                    message: this.$i18n('loading'),
                    duration: 0,
                    forbidClick: true,
                });
                window.location.href = this.$store.getters[GET_GAME_BY_ID](gid).src;
            }
        }
    }
</script>

<style scoped>
</style>