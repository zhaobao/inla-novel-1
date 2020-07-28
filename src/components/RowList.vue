<template>
    <van-list
            v-model="loading"
            :finished="finished"
            :loading-text="$i18n('loading')"
            @load="onLoad"
    >
        <RowItem v-for="(item, index) in data"
                 :key="item.book_id + index"
                 :title="item.name ? item.name : '[title]'"
                 :label="item.category"
                 :label_color="item.primary_color"
                 :label_more="item.name_alter"
                 :left-icon-size="leftIconSize"
                 :right-icon-name="rightIcon"
                 :right-text="showRightText ? (!!rightTextKey ? item[rightTextKey] : index + 4 + '') : ''"
                 :right-text-style="rightTextStyle"
                 @onClickRow="onClickItem(item)"
                 :left-icon="item.cover"/>
        <template #finished>
            <InlaLogo size="60" color="black" :loading="false" v-if="data.length > 0"/>
        </template>
    </van-list>
</template>

<script>
    import RowItem from "./RowItem";
    import {CapitalizeFirstLetter} from "../utils/str";
    import InlaLogo from "./InlaLogo";

    export default {
        name: "RowList",
        components: {InlaLogo, RowItem},
        props: {
            loadDataFunc: Function,
            showRightText: {type: Boolean, default: false},
            rightTextKey: {type: String, default: ''},
            rightTextStyle: {type: String},
            rightIcon: {type: String, default: "arrow"},
            leftIconSize: {type: [String, Number], default: 66},
            reload: {type: Boolean, default: false},
        },
        data() {
            return {
                data: [],
                loading: false,
                finished: false
            };
        },
        mounted() {
            console.log("RowList.vue mounted", this.showRightText, !!this.rightTextKey)
        },
        watch: {
            reload: function () {
                console.log('reload.list');
                this.finished = false;
                this.loading = true;
                this.data = [];
                this.onLoad();
            }
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