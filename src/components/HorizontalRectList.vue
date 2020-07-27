<template>
    <div class="grid-container">
        <van-grid :column-num="items && items.length" :gutter="10" direction="horizontal" :style="containerStyle">
            <van-grid-item v-for="(item, index) in items" :key="index" class="grid-item">
                <template #default>
                    <RectItem :id="item.comic_id" :icon-src="item.cover" :title="item.name" :icon-size="iconSize" @onClickGrid="onClickItem(item)"/>
                </template>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import RectItem from "./RectItem";
    export default {
        name: "HorizontalRectList",
        props: {
            items: {type: Array, required: true},
            showCount: {type: Number, default: 3.5},
            iconSize: {type: [Number, String], default: 66},
        },
        components: {RectItem},
        computed: {
            containerStyle: function () {
                return {width: (100 * this.items.length / this.showCount) + '%'}
            }
        },
        methods: {
            onClickItem: function (item) {
                this.$emit('onClickItem', item);
            }
        }
    }
</script>

<style scoped lang="scss">
    .grid-container {
        overflow-x: scroll;
    }
</style>