<template>
    <div class="me">
        <BackHeader :with-left="false"
                    :height="66" :color="$color('$activeColor')" :title="$i18n('menu_about')"/>
        <LineSpace/>
        <NormalHeader title="Info"/>
        <van-cell-group>
            <van-cell :title="$i18n('drawer_phone')" value="xxxx"/>
            <van-cell :title="$i18n('subscribe_time')" :value="now()" label="UTC+7"/>
        </van-cell-group>
    </div>
</template>
<script>
    import LineSpace from "../../components/LineSpace";
    import NormalHeader from "../../components/NormalHeader";
    import BackHeader from "../../components/BackHeader";

    export default {
        name: 'About',
        components: {BackHeader, NormalHeader, LineSpace},
        beforeCreate() {
        },
        data() {
            return {}
        },
        methods: {
            clickItem(item) {
                console.log(item)
            },
            now: function () {
                return new Date().toLocaleString();
            },
            clickRow(item) {
                window.location.href = item.src;
            }
        }
    }
</script>
<style scoped lang="scss">
    .me {
        text-align: left;
        padding-bottom: 3em;
    }
</style>
