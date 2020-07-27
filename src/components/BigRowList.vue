<template>
    <van-list
            v-model="loading"
            :finished="finished"
            :loading-text="$i18n('loading')"
            @load="onLoad"
    >

        <BigItem v-for="item in data"
                 :key="item.game_id"
                 :data="item" @onClickRow="onClickItem(item)"
                 layout-width="100%"/>
        <template #finished>
            <InlaLogo size="60" color="black" :loading="false" v-if="data.length > 0"/>
        </template>
    </van-list>
</template>

<script>
    import {CapitalizeFirstLetter} from "../utils/str";
    import InlaLogo from "./InlaLogo";
    import BigItem from "./BigItem";

    export default {
        name: "BigRowList",
        components: {BigItem, InlaLogo},
        props: {
            loadDataFunc: Function
        },
        data() {
            return {
                data: [],
                loading: false,
                finished: false
            };
        },
        methods: {
            onLoad() {
                this.loadDataFunc().then((ret) => {
                    if (ret.cleanFirst) {
                        this.data = [];
                    }
                    for (let i = 0, len = ret.items.length; i < len; i++) {
                        this.data.push(ret.items[i]);
                    }
                    this.loading = false;
                    if (!ret.hasMore) {
                        this.finished = true;
                    }
                });
            },
            onClickItem: function (item) {
                this.$emit('onRowItemClick', item)
            },
            toTitle: function (input) {
                return CapitalizeFirstLetter(input)
            }
        },
    }
</script>