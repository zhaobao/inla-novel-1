import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from "@/plugin/i18n/plugin"
import theme from "@/plugin/theme/setup"
import "@/plugin/vant/init"
import "@/utils/console";

Vue.use(i18n, {defaultLanguage: ''})
Vue.use(theme, {})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
