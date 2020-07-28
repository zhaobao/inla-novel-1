<template>
    <div id="app">
        <van-overlay :show="loading" class-name="overlay-loading">
            <div class="wrapper">
                <div class="block">
                    <van-loading v-if="loading"/>
                </div>
            </div>
        </van-overlay>
        <router-view v-if="!loading" :key="$route.fullPath"/>
    </div>
</template>

<script>
    import {SAVE_PAIRS} from "./store/auth/auth";
    import {AuthCheck} from "./api/action";
    import {SaveItem} from "./utils/storage";
    import {CODES, STORAGE_PREFIX} from "./config/config";

    export default {
        beforeCreate() {
            this.$store.commit(SAVE_PAIRS);
        },
        created() {
            AuthCheck().then((resp) => {
                if (resp.data.code === CODES.SUCCESS) {
                    SaveItem(STORAGE_PREFIX + '_conf', resp.data.data);
                    this.loading = false;
                } else {
                    this.$notify({type: 'danger', message: 'FORBIDDEN', duration: 5000});
                }
            });
        },
        data() {
            return {
                loading: true,
            }
        }
    }
</script>

<style>
    body {
        background: aliceblue;
    }
</style>

<style lang="scss">
    @import "assets/scss/var";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $textColor;
        text-align: center;
        max-width: 480px;
        margin: 0 auto;
    }

    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
