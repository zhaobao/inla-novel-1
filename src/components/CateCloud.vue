<template>
    <div class="cate-cloud">
        <span v-for="(item, index) in items"
              :key="index"
              :style="{background: item.background}"
              @click="onClickItem(item)">{{toTitle(item.name)}}</span>
    </div>
</template>

<script>
    import {CapitalizeFirstLetter} from "../utils/str";

    export default {
        name: "CateCloud",
        props: {
            items: Array
        },
        methods: {
            onClickItem: function (item) {
                this.$emit('onClickItem', item)
            },
            toTitle: function (title) {
                return CapitalizeFirstLetter(title)
            }
        }
    }
</script>

<style scoped lang="scss">
    .cate-cloud {
        padding: 1em 1em 0.5em 1em;
        text-align: left;
        font-weight: bold;

        span {
            display: inline-block;
            padding: 0.5em 2em;
            border-radius: 4em;
            margin-bottom: 0.5em;
            margin-right: 0.5em;
            font-size: 14px;
            color: white;
        }
    }
</style>