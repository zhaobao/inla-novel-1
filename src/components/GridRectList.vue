<template>
    <van-list
            v-model="loading"
            :finished="finished"
            :loading-text="$i18n('loading')"
            :finished-text="$i18n('see_others')"
            @load="onLoad"
    >
        <van-grid :column-num="columnNumber" :gutter="16">
            <van-grid-item v-for="item in data" :key="item.game_id" icon="photo-o">
                <template #default>
                    <RectItem :title="item.name"
                              :icon-src="item.cover"
                              :icon-size="gridItemWidth"
                              :id="item.game_id" @onClickGrid="clickGrid(item)"/>
                </template>
            </van-grid-item>
        </van-grid>
        <template #finished>
            <InlaLogo size="60" color="black" :loading="false"/>
        </template>
    </van-list>
</template>

<script>
    import RectItem from "./RectItem";
    import InlaLogo from "./InlaLogo";

    export default {
        name: "GridRectList",
        components: {InlaLogo, RectItem},
        props: {
            loadDataFunc: Function,
            columnNumber: {type: Number, default: 3},
            gridItemWidth: {type: [Number, String], default: 66}
        },
        data() {
            return {
                data: [],
                loading: false,
                finished: false,
            };
        },
        methods: {
            clickGrid(item) {
                this.$emit('onClickGrid', item);
            },
            onLoad() {
                this.loadDataFunc().then((ret) => {
                    for (let i = 0, len = ret.items.length; i < len; i++) {
                        this.data.push(ret.items[i]);
                    }
                    this.loading = false;
                    if (!ret.hasMore) {
                        this.finished = true;
                    }
                });
            },
        },
    }
</script>

<style scoped>

</style>