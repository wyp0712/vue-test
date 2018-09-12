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
import Mock from './mock/index'
console.log(Mock, 'Mock')
Mock.init();

// import three from 'three'

// import initdict from './dict'
// 引入echarts
import echarts from 'echarts'
// 组件配置文件 引入组件不必再import
import './components/global.js'

import './pages/components/global.js'

//配置axios接口
var instance = axios.create({
  //这个baseURL为固定写法
  baseURL: "http://localhost:8011", //打包上线的时候替换baseURL
  // timeout: 1000,
  headers: {'content-type': 'application/x-www-form-urlencoded'}
})
Vue.prototype.$http = instance;

// var THREE = require('three')
// var THREE = window.THREE

Vue.prototype.$echarts = echarts

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(ElementUI, { locale })

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
