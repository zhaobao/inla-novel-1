<template>
    <div class="big-item" @click="clickItem">
        <van-image lazy-load  fit="cover" :center="true" :src="data.cover" :style="layoutSize" class="big-item__img">
            <template v-slot:loading>
                <van-loading type="spinner" size="20" />
            </template>
        </van-image>
        <van-cell>
            <template #title>
                <span class="big-item__title" v-if="data.name && data.name.length > 0">{{data.name}}</span>
            </template>
            <template #label>
                <van-tag round :color="'rgb(' + data.primary_color + ')'">{{data.category}}</van-tag>
                <span class="big-item__label van-multi-ellipsis--l2" v-if="data.name_alter && data.name_alter.length > 0">{{data.name_alter}}</span>
            </template>
            <template #default>
                <span class="big-item__value" v-if="data.source && data.source.length > 0">{{data.source}}</span>
            </template>
        </van-cell>
    </div>
</template>

<script>
    export default {
        name: "BigItem",
        props: {
            data: {
                type: Object, default: function () {
                    return {
                        title: "This is title",
                        label: "This is subtitle",
                        value: "This is value",
                        category: "Fantasy",
                        img: "https://img.yzcdn.cn/vant/cat.jpeg"
                    };
                }
            },
            layoutWidth: {type: String, default: ''},
            layoutHeight: {type: String, default: ''}
        },
        computed: {
            layoutSize: function () {
                let s = {};
                if (this.layoutWidth > 0) {
                    s.width = this.layoutWidth;
                }
                if (this.layoutWidth > 0) {
                    s.height = this.layoutHeight;
                }
                return s;
            }
        },
        methods: {
            clickItem: function () {
                this.$emit('onClickItem', this.data);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";
    .big-item {
        text-align: left;
        padding: 1em 0;
        border-bottom: 1px solid rgba($subHeaderColor, .2);
    }

    .big-item__img {
        overflow: hidden;
        width: 100%;
        text-align: center;
        max-height: 200px;
    }

    .big-item__title {
        font-weight: bold;
    }

    .big-item__label {
    }

    .big-item__value {
    }
</style>