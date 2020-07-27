<template>
    <van-cell class="normal-header" @click="onClickRight">
        <template #icon>
            <van-icon :name="iconName" class="normal-header__icon" v-if="hasIcon"/>
        </template>
        <template #title>{{title}}</template>
        <template #default><span v-if="hasRight" class="normal-header__right">{{rightText}}</span></template>
    </van-cell>
</template>

<script>
    export default {
        name: "NormalHeader",
        props: {
            title: String,
            hasRight: {type: Boolean, default: false},
            rightText: String,
            hasIcon: {type: Boolean, default: false},
            iconName: String,
        },
        methods: {
            onClickRight: function () {
                this.$emit('onClickRight');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";

    .normal-header {
        text-align: left;
        color: $activeColor;
        font-weight: bold;
    }

    .normal-header__right {
        color: $activeColor;
    }

    .normal-header__icon {
        margin-right: 5px;
        min-width: 1em;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
    }
</style>