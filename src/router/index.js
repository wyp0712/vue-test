import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {   // 当首次进入页面时，页面没有显示任何组件；让页面一加载进来就默认显示first页面
      path: '/first', // 重定向，就是给它重新指定一个方向，加载一个组件
      component: resolve => require(['@/pages/page1.vue'], resolve)
    }
    // {
    //   path: '/first',
    //   component: resolve => require(['@/components/First'], resolve)
    // },
    // {
    //   path: '/second',
    //   component: resolve => require(['@/components/Second'], resolve)
    // }
  ]
})
