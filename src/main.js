import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./plugin/i18n/plugin"
import {LANG} from "./config/config";
import themePlugin from "./plugin/theme/setup"
import "./plugin/vant/init"
import "./utils/console";

Vue.use(i18n, {defaultLanguage: LANG})
Vue.use(themePlugin, {})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
