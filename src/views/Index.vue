<template>
    <div class="index">
        <router-view :key="$route.fullPath"></router-view>
        <BottomNav :menus="menus" :show="showMenu" @onChangeTab="changeTab"/>
    </div>
</template>

<script>
    import BottomNav from "../components/BottomNav";
    import {HIDE_SPLASH} from "../store";

    export default {
        name: 'Index',
        components: {BottomNav},
        data() {
            return {
                showMenu: true,
                menus: [
                    {name: this.$i18n('menu_home'), icon: 'home-o', to: '/index/a/home'},
                    {name: this.$i18n('menu_book'), icon: 'label-o', to: '/index/a/book'},
                    {name: this.$i18n('menu_me'), icon: 'setting-o', to: '/index/a/about'},
                ]
            }
        },
        mounted() {
        },
        methods: {
            changeTab: function (menu) {
                this.$router.push(menu.to);
            },
            hideSplash: function () {
                this.showMenu = true;
                this.$store.commit(HIDE_SPLASH);
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
