<template>
    <van-nav-bar class="back-header" @click-left="onClickLeft" :style="{height: height + 'px'}">
        <template #left>
            <van-icon v-if="withLeft" name="arrow-left" :color="color? color: ''"/>
        </template>
        <template #title><span :style="color ? {color: color} : ''">{{title}}</span></template>
        <template #right>
            <van-icon v-if="withRight" name="bookmark-o" :color="color? color: ''"/>
        </template>
    </van-nav-bar>
</template>

<script>
    export default {
        name: "BackHeader",
        props: {
            title: String,
            color: String,
            withLeft: {type: Boolean, default: true},
            withRight: {type: Boolean, default: false},
            height: [String, Number],
        },
        methods: {
            onClickLeft: function () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .back-header {
        font-weight: bolder;
    }
</style>