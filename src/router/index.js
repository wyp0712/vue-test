import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import page1 from '../pages/page1.vue'
import page2 from '../pages/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/test',
      name: 'test',
      component: page2
    }
  ]
})
