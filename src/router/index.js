import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {   // 当首次进入页面时，页面没有显示任何组件；让页面一加载进来就默认显示first页面
    //   path: '/page1', // 重定向，就是给它重新指定一个方向，加载一个组件
    //   component: resolve => require(['@/pages/page1.vue'], resolve)
    // },
    // {
    //   path: '/page2',
    //   component: resolve => require(['@/pages/page2.vue'], resolve)
    // },
    // {
    //   path: '/page3',
    //   component: resolve => require(['@/pages/page3'], resolve)
    // },
    // {
    //   path: '/page4',
    //   component: resolve => require(['@/pages/page4'], resolve)
    // },
    // {
    //   path: '/page5',
    //   component: resolve => require(['@/pages/page5'], resolve)
    // },
    // {
    //   path: '/page6',
    //   component: resolve => require(['@/pages/page6'], resolve)
    // },
    // {
    //   path: '/page7',
    //   component: resolve => require(['@/pages/page7'], resolve)
    // },
    // {
    //   path: '/page8',
    //   component: resolve => require(['@/pages/page8'], resolve)
    // },
    // {
    //   path: '/page9',
    //   component: resolve => require(['@/pages/page9'], resolve)
    // },
    // {
    //   path: '/page10',
    //   component: resolve => require(['@/pages/pages10'], resolve)
    // },
    // {
    //   path: '/page11',
    //   component: resolve => require(['@/pages/page11'], resolve)
    // },
    // {
    //   path: '/',
    //   component: resolve => require(['@/pages/demoElementui/checkbox.vue'], resolve)
    // },
    // {
    //   path: '/three',
    //   component: resolve => require(['@/pages/three/three.vue'], resolve)
    // },
    // {
    //   path: '/flagon',
    //   component: resolve => require(['@/pages/three/threeFalon.vue'], resolve)
    // },
    // {
    //   path: '/calendar',
    //   component: resolve => require(['@/pages/calendar/index.vue'], resolve)
    // },
    {
      path: '/select',
      component: resolve => require(['@/pages/select/index.vue'], resolve)
    },
    // {
    //   path: '/map',
    //   component: resolve => require(['@/pages/map/index.vue'], resolve)
    // },
    {

      path: '/scroll',
      component: resolve => require(['@/pages/scrollComponent/index.vue'], resolve)
    },
    {
      path: '/table',
      component: resolve => require(['@/pages/tablePage/index.vue'], resolve)
    }
  ]
})
