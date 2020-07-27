<template>
    <div>
        <BigHeader :title="$i18n('site_title')" :with-draw="false"/>
        <TopNav :items="menus" :show="true" :default-active="active" @clickTabItem="change1">
            <template #ct>
                <router-view></router-view>
            </template>
        </TopNav>
    </div>
</template>

<script>
    import BigHeader from "../../components/BigHeader";
    import {FETCH_GENRES} from "../../store/comic/comic";
    import TopNav from "../../components/TopNav";

    export default {
        name: "Home",
        components: {
            TopNav,
            BigHeader,
        },
        beforeCreate() {
            this.$store.dispatch(FETCH_GENRES).then((resp) => {
                resp.data.sort((a, b) => {
                    return b['book_count'] - a['book_count'];
                })
                this.option2 = resp.data.filter((item) => {
                    return item['genre_id'] !== '1802020f' &&
                        item['genre_id'] !== '6a7ce9c9' &&
                        item['genre_id'] !== 'e7ddf9ee' &&
                        item['genre_id'] !== '4a76f9ee';
                }).map((item) => {
                    item['value'] = '/index/a/home/cate/' + item['genre_id'];
                    item['text'] = item['name'];
                    return item;
                });
                this.menus = [
                    {text: this.$i18n('recommend'), value: "/index/a/home/recommend"},
                    {text: this.$i18n('rank'), value: "/index/a/home/rank"},
                    {text: this.$i18n('hot'), value: "/index/a/home/hot"},
                ].concat(this.option2);
            })
        },
        created() {
            this.active = window.location.hash.substr(1);
        },
        data() {
            return {
                active: '/index/a/home/recommend',
                menus: [],
            }
        },
        methods: {
            change1: function (value) {
                this.$router.push(value);
            }
        },
    }
</script>

<style scoped>
    .top-entry-container {
        padding: 1em;
    }

    .top-items-group {
        padding: 2em 1em 1em 1em;
    }

    .group-recommend {
        margin-bottom: 66px;
    }

    .home-row-list {
        padding: 1em;
    }
</style>