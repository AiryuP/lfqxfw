import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store' 
import axios from './http/axios.js'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
// axios.defaults.withCredentials=true;   //跨域访问cookie的时候要加
Vue.prototype.$axios = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
