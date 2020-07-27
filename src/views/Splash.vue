<template>
    <transition name="van-fade">
        <van-overlay :show="showSplash" :lock-scroll="true" :z-index="10000" class="overlay-bg">
            <template #default>
                <InlaLogo color="white" size="100" :loading="false" class="splash-logo"/>
            </template>
        </van-overlay>
    </transition>
</template>

<script>
    import InlaLogo from "../components/InlaLogo";

    export default {
        name: "Splash",
        components: {InlaLogo},
        props: {
            timeout: {type: Number, default: 2000},
            show: {type: Boolean, required: false}
        },
        data() {
            return {
                showSplash: this.show
            };
        },
        mounted() {
            setTimeout(() => {
                this.showSplash = false;
                this.$emit('hideSplash');
            }, this.timeout)
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";

    h1 {
        color: white;
    }

    .overlay-bg {
        background-color: $dark;
    }

    .splash-logo {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
    }
</style>