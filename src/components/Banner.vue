<template>
    <van-swipe :autoplay="4000" class="banner-swipe" :style="bannerWidth">
        <van-swipe-item v-for="(item, index) in banners" :key="index" @click="onClickItem(item.game_id)">
            <img v-lazy="item.cover" :style="bannerHeight"/>
            <p class="banner-text">{{item.name}}</p>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    export default {
        name: "Banner",
        props: {
            banners: {type: Array, required: true},
            ratio: {type: Number, default: 320 / 640, required: true},
            maxViewWidth: {type: Number, default: 480}
        },
        computed: {
            bannerWidth: function () {
                return {width: Math.min(width, this.maxViewWidth) - 32 + 'px', height: (Math.min(width, this.maxViewWidth) - 32) * this.ratio + 'px'}
            },
            bannerHeight: function () {
                return {height: (Math.min(width, this.maxViewWidth) - 32) * this.ratio + 'px'}
            }
        },
        methods: {
            onClickItem: function (index) {
                this.$emit('onClickItem', index)
            }
        }
    }
</script>

<style scoped lang="scss">
    .banner-swipe {
        margin: 1em;
    }
    .banner-text {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width:100%;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        padding: 10px;
    }

</style>