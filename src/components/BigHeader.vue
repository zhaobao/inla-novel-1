<template>
    <div>
        <van-nav-bar class="big-header-container" @click-right="onClickRight">
            <template #left>
                <div class="big-header">{{title}}</div>
            </template>
            <template #right>
                <van-icon name="wap-nav" size="24" :color="$color('$subHeaderColor')" v-if="withDraw"/>
            </template>
        </van-nav-bar>
        <van-popup v-if="withDraw" v-model="show"
                   @closed="onCloseDraw"
                   closeable
                   round
                   position="right" :style="{width:'72%', height: '100%'}">
            <div class="draw-content">
                <slot name="drawer"></slot>
            </div>
        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "BigHeader",
        props: {
            title: {type: String, required: true},
            withDraw: {type: Boolean, default: false},
        },
        data() {
            return {
                show: false,
            }
        },
        methods: {
            onClickRight: function () {
                this.$emit('onClickRight');
                if (this.withDraw) {
                    this.show = true;
                }
            },
            onCloseDraw: function () {
                this.$emit('onCloseDraw');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";
    .big-header-container {
        min-height: 98px;
        color: $activeColor;
    }

    .big-header {
        padding: 1em 0.5em;
        font-size: 2em;
        text-align: left;
        font-weight: bold;
    }

    .draw-content {
        margin-top: 2em;
        padding: 1em;
        text-align: left;
    }
</style>