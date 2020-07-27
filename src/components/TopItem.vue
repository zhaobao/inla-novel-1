<template>
    <div class="top-item-container" :style="bgColor" @click="clickItem">
        <van-image width="60" height="60" :src="icon" class="top-item-container__img"/>
        <div class="top-item-container__text">{{title}}</div>
        <div class="top-item-container__action">
            <van-button round type="primary" size="small" class="action-button" :color="actionColor">
                {{actionText}}
            </van-button>
        </div>
    </div>
</template>

<script>

    import iconDemo from "../assets/img/icon-demo.png";

    export default {
        name: "TopItem",
        props: {
            icon: {type: String, default: iconDemo},
            title: {type: [String, Number], default: 'This is title'},
            actionText: {type: String, default: 'Action'},
            actionColor: {type: String, default: '#7232dd'},
            background: {type: String, default: 'linear-gradient(90deg, #4bb0ff, #6149f6)'}
        },
        computed: {
            bgColor: function () {
                return {background: this.background}
            }
        },
        methods: {
            clickItem: function () {
                this.$emit('clickItem');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/var";

    .top-item-container {
        padding: 1em;
        border-radius: 1em;
        min-width: 66px;
        font-weight: bold;
        color: white;
        box-shadow: 0 0 0 3px rgba($white, 0.2);
    }

    .top-item-container__img {
        box-shadow: 0 0 0 2px rgba($white, 0.4);
        margin-top: -2em;
        border-radius: 0.5em;
        overflow: hidden;
    }

    .top-item-container__text {
        font-size: 14px;
        padding: 0.2em 0;
    }

    .top-item-container__action {
        .action-button {
            padding: 0 1.5em;
            height: 28px;
        }
    }
</style>