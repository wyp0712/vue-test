// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store/index.js'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import initdict from './dict'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(ElementUI, { locale })

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  created () {
  }
})
