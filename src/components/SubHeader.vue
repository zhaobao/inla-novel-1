<template>
    <van-nav-bar class="normal-header" @click-right="onClickRight">
        <template #left>{{title}}</template>
        <template #right><span v-if="hasRight">{{rightText}}</span></template>
    </van-nav-bar>
</template>

<script>
    export default {
        name: "SubHeader",
        props: {
            title: String,
            hasRight: {type: Boolean, default: false},
            rightText: String
        },
        methods: {
            onClickRight: function () {
                this.$emit('onClickRight');
            }
        }
    }
</script>

<style scoped>
    .normal-header {
        text-align: left;
        color: #969799;
    }
</style>