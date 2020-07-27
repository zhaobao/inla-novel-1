<template>
    <van-cell :title="title" :center="true" class="row-item" title-class="row-item__title" @click="onClickCell">
        <template #default>
            <span v-if="rightText && rightText.length > 0"><span :style="rightTextStyle">{{rightText}}</span></span>
            <van-icon v-else-if="!rightText && rightIconName && rightIconName.length > 0" :name="rightIconName" color="#969799"/>
        </template>
        <template #icon>
            <van-image :width="leftIconSize" :src="leftIcon" class="row-item__icon"/>
        </template>
        <template #label>
            <div><van-tag round :color="label_color">{{label}}</van-tag></div>
            <div>{{label_more}}</div>
        </template>
    </van-cell>
</template>

<script>
    import img from "../assets/img/icon-demo.png"

    export default {
        name: "RowItem",
        props: {
            id: String,
            title: String,
            label: String,
            label_color: String,
            label_more: String,
            leftIcon: {type: String, default: img},
            leftIconSize: {type: [String, Number], default: 66},
            rightIconName: String,
            rightText: [String, Number],
            rightTextStyle: String,
        },
        computed: {
            thumb: function () {
                return img;
            }
        },
        mounted() {
        },
        methods: {
            onClickCell: function () {
                this.$emit('onClickRow', this.id);
            }
        }
    }
</script>

<style>
    .row-item .van-cell__value {
        flex: 0.4;
    }
</style>

<style scoped>
    .row-item__icon {
        border-radius: 0.5em;
        overflow: hidden;
    }

    .row-item {
        text-align: left;
    }

    .row-item__title {
        padding-left: 1em;
    }

    .row-item__right {
        flex: 0.4;
    }
</style>