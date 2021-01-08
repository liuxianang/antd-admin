import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Viser from 'viser-vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/global.less'
Vue.use(Antd)
Vue.use(Viser)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
