<template>
    <div class="about">
        <BackHeader :with-left="false" :height="66" :color="$color('$activeColor')" :title="$i18n('menu_explorer')"/>
        <TopNav :show="showMenu" :color="$color('$activeColor')" :items="cates" :pactive="initActive"
                @clickTabItem="clickTabItem">
            <template #ct>
                <LineSpace/>
                <RowList :loadDataFunc="loadItems" @onRowItemClick="clickRow" class="row-list"/>
            </template>
        </TopNav>
    </div>
</template>
<script>
    import TopNav from "../../components/TopNav";
    import BackHeader from "../../components/BackHeader";
    import {GET_GAME_CATES, GET_GAMES_CAT, GET_GAMES_HOT, GET_GAMES_NEW} from "../../store/game/game";
    import {ObjectAryContain} from "../../utils/str";
    import RowList from "../../components/RowList";
    import LineSpace from "../../components/LineSpace";

    export default {
        name: 'Explorer',
        components: {LineSpace, RowList, BackHeader, TopNav},
        mounted() {
            this.cates = this.$store.getters[GET_GAME_CATES];
            if (!ObjectAryContain(this.cates, 'name', 'hot')) {
                this.cates.unshift({name: 'hot'});
            }
            if (!ObjectAryContain(this.cates, 'name', 'new')) {
                this.cates.unshift({name: 'new'});
            }
            if (window.location.hash.length > 0) {
                let name = window.location.hash.substr(1);
                for (let i = 0, len = this.cates.length; i < len; i++) {
                    if (this.cates[i].name === name.toLowerCase()) {
                        this.initActive = i;
                        break;
                    }
                }
            }
        },
        data() {
            return {
                showMenu: !this.$store.state.showSplash,
                cates: [],
                pageSize: 8,
                pageNumber: 0,
                activeIndex: 0,
                activeGroup: null,
                cleanFirst: false,
                initActive: 0,
            }
        },
        methods: {
            clickTabItem: function (index, title) {
                console.log('click', index, title)
                this.activeIndex = index;
                this.activeGroup = title;
                this.pageNumber = 0;
                this.cleanFirst = true;
            },
            clickRow: function (item) {
                window.location.href = item.src;
            },
            activeItemDataFunc() {
                if (this.activeIndex === 0) {
                    return this.$store.getters[GET_GAMES_HOT];
                }
                if (this.activeIndex === 1) {
                    return this.$store.getters[GET_GAMES_NEW];
                }
                console.log('activeItemDataFunc', this.activeGroup);
                return function (size, index) {
                    return this.$store.getters[GET_GAMES_CAT](this.activeGroup.toLowerCase(), size, index)
                }.bind(this)
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
                        let data = that.activeItemDataFunc(this.activeIndex)(that.pageSize, that.pageNumber);
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
        },
        props: {
            m: String
        },
    }
</script>
<style scoped lang="scss">
    @import "../../assets/scss/var";

    h1 {
        margin: 0;
    }

    .about {
        height: 100vh;
    }

    .top-items-group {
        padding: 1em;
    }

    .row-list {
        margin-bottom: 3em;
    }

</style>
