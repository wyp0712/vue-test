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
      baseFields: [],
      parentParam: ['001', '002', '003']
    }
  },
  created () {
    let api = {}
    this.$http.get('../static/dict.json').then((res) => {
      window.$dict = res.data.data
      this.baseFields = window.$dict.baseFields
      let dictKeys = Object.keys(this.baseFields.event_type_short)
      let tmpData = this.parentParam
      for (let strkey in tmpData) {
        console.log(tmpData[strkey])
        console.log(dictKeys)
        
        if(tmpData[strkey] == dictKeys){
           console.log(4545454)
        } 
        // if (dictKeys.indexOf(tmpData[strkey])) {
        //   let dictKeys = Object.values(this.baseFields.event_type_short)
        //   console.log(dictKeys)
        // }
        // if (tmpData[strkey] == dictKeys) {
        //   console.log('sssssss')
        // }
        // if (dictKeys.indexOf("002") >= 0) {
        //    console.log("thisis dict")
        //   if (strkey === '"event_type_short"') {
        //      console.log(strkey)
        //   }
        // }
      }

      // api = window.$dict.baseFields.event_type_short
      // for (let key in api) {
      //    console.log(key)
      // }
    })
  }
})
