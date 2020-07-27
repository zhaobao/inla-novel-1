<template>
    <div class="top-item-container" @click="clickItem" :style="shadowColor">
        <van-image :src="testIcon" class="top-item-container__img" fit="contain" />
        <div class="top-item-container__content" :style="bgColor">
            <div class="top-item-container__text van-ellipsis">{{title}}</div>
            <div class="top-item-container__action">{{actionText}}</div>
        </div>
    </div>
</template>

<script>

    import iconDemo from "../assets/img/icon-demo.png";
    import b1 from "../assets/img/1.png";

    export default {
        name: "TopItem2",
        props: {
            icon: {type: String, default: iconDemo},
            title: {type: [String, Number], default: 'This is title'},
            actionText: {type: String, default: 'Action'},
            background: {type: String, default: 'linear-gradient(180deg, rgba(72,176,255,0.72), #6149f6)'},
            shadowColor: {type: String, default: 'box-shadow: 0 0 4px 4px rgba(97, 73, 246, 0.4);'},
        },
        data() {return {testIcon: b1}},
        computed: {
            bgColor: function () {
                return {background: this.background}
            }
        },
        methods: {
            clickItem: function () {
                this.$emit('clickItem');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";

    .top-item-container {
        color: $headerColor;
        position: relative;
        border-radius: 1em;
        min-width: 66px;
        font-weight: bold;
        overflow: hidden;
        font-size: 14px;
    }

    .top-item-container__content {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        heigth: 40px;
        padding: 0.5em;
        background: transparent;
    }

    .top-item-container__img {
        overflow: hidden;
        width: 200%;
    }

    .top-item-container__text {
        padding: 0.2em 0;
    }

    .top-item-container__action {
        font-size: 12px;
        color: rgba($headerColor, 0.6);
    }
</style>