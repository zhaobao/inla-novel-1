<template>
    <img :src="inlaLogo" alt="logo" :class="'img-logo img-logo-' + size" v-if="!loading"/>
</template>

<script>
    import whiteLogo from '@/assets/img/inla-white.svg';
    import blackLogo from '@/assets/img/inla-black.svg';

    export default {
        props: {
            size: {
                validator: function (value) {
                    return ['60', '100'].indexOf(value) !== -1
                }
            },
            color: String,
            loading: {
                type: Boolean,
                default: true
            }
        },
        name: "InlaLogo",
        data() {
            return {
                inlaLogo: this.color === 'white' ? whiteLogo : blackLogo,
            }
        }
    }
</script>

<style scoped lang="scss">
    .img-logo {
        padding: 1em;
    }

    .img-logo-60 {
        width: 60px;
    }

    .img-logo-100 {
        width: 100px;
    }
</style>