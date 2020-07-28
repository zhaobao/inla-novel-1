<template>
    <div class="grid-container">
        <van-grid :column-num="items && items.length" :gutter="10" direction="horizontal" :style="containerStyle">
            <van-grid-item v-for="(item, index) in items" :key="index" class="grid-item-horizontal">
                <template #default>
                    <TopItem2 :id="item.book_id"
                              :icon="item.icon"
                              :title="item.name" @clickItem="onClickItem"/>
                </template>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    import TopItem2 from "./TopItem2";

    export default {
        name: "HorizontalTopList",
        props: {
            items: {type: Array, required: true},
            showCount: {type: Number, default: 2.2}
        },
        components: {TopItem2},
        computed: {
            containerStyle: function () {
                return {width: (100 * this.items.length / this.showCount) + '%'}
            }
        },
        methods: {
            onClickItem: function (id) {
                this.$emit('onClickItem', id);
            }
        }
    }
</script>

<style lang="scss">
    .grid-item-horizontal {
        .van-grid-item__content {
            background: transparent;

            &::after {
                border-color: transparent;
            }
        }
    }
</style>

<style scoped lang="scss">
    .grid-container {
        overflow-x: scroll;
    }
</style>