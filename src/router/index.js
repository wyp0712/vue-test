import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
<<<<<<< HEAD
=======
import page1 from '../pages/page1.vue'
>>>>>>> b439571fd654a1fd85a0f976700778bd610fa0b5

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
<<<<<<< HEAD
=======
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
>>>>>>> b439571fd654a1fd85a0f976700778bd610fa0b5
    }
  ]
})
