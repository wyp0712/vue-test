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
// import initdict from './dict'

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
  data () {
    return {
      datalist: {},
      api: [],
      parentParam: ['001', '002', '003'],
      tabdatalist: []
    }
  },
  created () {
    const promise = new Promise((resolve, reject) => {
      this.$http.get('../static/dict.json').then((rs) => {
        this.datalist = rs.data.data
        resolve(this.datalist)
      })
    })

    promise.then((rs) => {
      this.api = Object.keys(rs.alert.explanation)
      console.log(this.api)
      for (let strkeys in this.parentParam) {
        console.log(this.parentParam[strkeys])
        if (this.api.indexOf(this.parentParam[strkeys])) {
          console.log('zhaodao le ')
          this.tabdatalist[this.parentParam[strkeys]] = this.api['001']
          console.log(this.tabdatalist)
        }
      }
    })
  }
})
