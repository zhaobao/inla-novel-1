<template>
    <van-tabs v-model="active" @click="onClick" animated v-if="show"
              class="top-menus"
              :border="true"
              :color="color"
              :title-active-color="$color('$headerColor')">
        <van-tab v-for="(item, index) in items" :key="index"
                 :title="toTitle(item.text)"
                 :name="item.value">
            <slot name="ct"></slot>
        </van-tab>
    </van-tabs>
</template>

<script>
    import {CapitalizeFirstLetter} from "../utils/str";

    export default {
        name: "TopNav",
        props: {
            name: {type: String},
            items: {type: Array},
            color: {type: String},
            show: {type: Boolean, default: false},
            defaultActive: {type: String},
        },
        data() {
            return {
                active: this.defaultActive
            };
        },
        watch: {
            name: function (val) {
                console.log('router.change', val)
            }
        },
        methods: {
            onClick(name, title) {
                this.$emit('clickTabItem', name, title);
            },
            toTitle: function (input) {
                return CapitalizeFirstLetter(input);
            }
        },
    }
</script>

<style>
    .van-tabs__wrap {
        padding: 0 1em;
    }
</style>