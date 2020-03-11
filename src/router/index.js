import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/common/login'
import register from '@/components/common/register'
import merchantGoodsList from '@/components/page/merchantGoodsList'
import index from '@/components/page/index'
import order from '@/components/page/order'
import shoppingCart from '@/components/page/shoppingCart'
import personal from '@/components/page/personal'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/merchantGoodsList/:merchantUuid',
      name: 'merchantGoodsList',
      component: merchantGoodsList
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    }
  ]
})
