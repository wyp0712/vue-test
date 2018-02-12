import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {   // 当首次进入页面时，页面没有显示任何组件；让页面一加载进来就默认显示first页面
      path: '/first', // 重定向，就是给它重新指定一个方向，加载一个组件
      component: resolve => require(['@/pages/page1.vue'], resolve)
    },
    {
      path: '/two',
      component: resolve => require(['@/pages/page2.vue'], resolve)
    },
    {
      path: '/three',
      component: resolve => require(['@/pages/page3'], resolve)
    },
    {
      path: '/four',
      component: resolve => require(['@/pages/page4'], resolve)
    },
    {
      path: '/five',
      component: resolve => require(['@/pages/page5'], resolve)
    },
    {
      path: '/six',
      component: resolve => require(['@/pages/page6'], resolve)
    },
    {
      path: '/seven',
      component: resolve => require(['@/pages/page7'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/pages/page8'], resolve)
    },
    {
      path: '/nine',
      component: resolve => require(['@/pages/page9'], resolve)
    }
  ]
})
