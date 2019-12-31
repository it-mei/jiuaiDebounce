import Vue from 'vue'
import App from './App'
import jiuaiDebounce from './js_sdk/jiuai-debounce/jiuai-debounce.js'
Vue.config.productionTip = false
App.mpType = 'app';

Vue.prototype.$jiuaiDebounce = jiuaiDebounce;

const app = new Vue({
    ...App
})

app.$mount()
