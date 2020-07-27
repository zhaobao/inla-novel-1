<template>
    <van-tabbar v-model="active"
                @change="onChangeTab"
                v-if="show"
                class="bottom-nav"
                route
                :active-color="$color('$activeColor')">
        <van-tabbar-item v-for="(item, index) in menus"
                         :key="index"
                         :to="item.to"
                         :icon="item.icon">{{item.name}}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        name: "BottomNav",
        props: {
            show: {type: Boolean, default: false},
            defaultActive: {index: Number, default: 0},
            menus: {
                type: Array,
                default: function () {
                    return [
                        {name: 'Home', icon: 'wap-home', to: '/index/a/home'},
                        {name: 'Explorer', icon: 'fire', to: '/index/a/about'},
                        {name: 'Me', icon: 'setting', to: '/index/a/me'},
                    ]
                }
            }
        },
        data() {
            return {
                active: this.defaultActive
            };
        },
        methods: {
            onChangeTab: function (index) {
                console.log('bottom-nav', 'onChangeTab', index);
                this.active = index;
                this.$emit('onChangeTab', this.menus[index]);
            }
        }
    }
</script>

<style scoped>
    .bottom-nav {
        font-weight: bold;
    }
</style>