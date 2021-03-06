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
      path: '/page1', // 重定向，就是给它重新指定一个方向，加载一个组件
      component: resolve => require(['@/pages/page1.vue'], resolve)
    },
    {
      path: '/page2',
      component: resolve => require(['@/pages/page2.vue'], resolve)
    },
    {
      path: '/page3',
      component: resolve => require(['@/pages/page3'], resolve)
    },
    {
      path: '/page4',
      component: resolve => require(['@/pages/page4'], resolve)
    },
    {
      path: '/page5',
      component: resolve => require(['@/pages/page5'], resolve)
    },
    {
      path: '/page6',
      component: resolve => require(['@/pages/page6'], resolve)
    },
    {
      path: '/page7',
      component: resolve => require(['@/pages/page7'], resolve)
    },
    {
      path: '/page8',
      component: resolve => require(['@/pages/page8'], resolve)
    },
    {
      path: '/page9',
      component: resolve => require(['@/pages/page9'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/pages/pages10'], resolve)
    },
    {
      path: '/page11',
      component: resolve => require(['@/pages/page11'], resolve)
    },
    {
      path: '/check',
      component: resolve => require(['@/pages/checkbox.vue'], resolve)
    },
    {
      path: '/three',
      component: resolve => require(['@/pages/three/three.vue'], resolve)
    },
    {
      path: '/flagon',
      component: resolve => require(['@/pages/three/falon.vue'], resolve)
    }
  ]
})
