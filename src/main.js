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
// 引入echarts
import echarts from 'echarts'
// 组件配置文件 引入组件不必再import
import './components/global.js'
import './pages/components/global.js'

Vue.prototype.$echarts = echarts

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
      tabdatalist: [],
      value: []
    }
  },
  created () {
    console.log(this)
    const promise = new Promise((resolve, reject) => {
      this.$http.get('../static/dict.json').then((rs) => {
        window.$dict = rs.data.data
        this.datalist = rs.data.data
        resolve(this.datalist)
      })
    })

    promise.then((rs) => {
      this.api = Object.keys(rs.alert.explanation)

      this.api.map((rs) => {
      })
    })
  }
})
