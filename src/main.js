import './css/reset.css'
import Vue from 'vue'
import App from './App.vue'
import router from './Router.js'
import FastClick from 'fastclick'
import axios from 'axios'
import vueAxios from 'vue-axios'
import vueCookies from 'vue-cookies'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index.js'

Vue.use(vueAxios,axios)
Vue.use(vueCookies)
Vue.$cookies.config('7d')

import loadingImg from './assets/image/loading.gif'
Vue.use(VueLazyLoad, {
  loading: loadingImg
})

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
