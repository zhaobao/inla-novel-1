<template>
    <div @click="onClick">
        <div>
            <van-image :width="iconSize" :src="iconSrc" class="grid-item__icon" fit="contain"/>
        </div>
        <div class="grid-item__title">{{title}}</div>
        <div class="grid-item__sub">{{subTitle}}</div>
    </div>
</template>

<script>
    import iconDemo from "../assets/img/icon-demo.png";

    export default {
        name: "RectItem",
        props: {
            id: {type: String, default: ''},
            iconSrc: {type: String, default: iconDemo},
            title: {type: String, default: 'This is title'},
            subTitle: {type: String, default: ''},
            iconSize: {type: [Number, String], default: 66}
        },
        methods: {
            onClick: function () {
                this.$emit('onClickGrid', this.id);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";

    .grid-item__icon {
        border-radius: 0.5em;
        overflow: hidden;
    }

    .grid-item__title {
        color: $headerColor;
        font-size: 14px;
        font-weight: bold;
    }

    .grid-item__sub {
        color: $subHeaderColor;
        font-size: 12px;
    }
</style>