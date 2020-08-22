import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store' 
import axios from './http/axios.js'
import echarts from 'echarts'
import './assets/icon/iconfont.css'

// import Swiper from 'swiper';
import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// import 'swiper/dist/css/swiper.css'
import 'swiper/swiper-bundle.css'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
// axios.defaults.withCredentials=true;   //跨域访问cookie的时候要加
Vue.prototype.$axios = axios 
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper,/* { default options with global component } */);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
