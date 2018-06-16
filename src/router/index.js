import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let y = null
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/home/index.vue'], resolve)
    }, {
      path: '/find',
      name: 'find',
      component: resolve => require(['@/pages/find/index.vue'], resolve)
    }, {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/search/index.vue'], resolve)
    }, {
      path: '/order',
      name: 'order',
      component: resolve => require(['@/pages/order/index.vue'], resolve)
    }, {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/pages/mine/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/loginRegister/index.vue'], resolve)
    },
    {
      path: '/shop/:shopId',
      name: 'shop',
      component: resolve => require(['@/pages/shop/index.vue'], resolve),
      props: true
    },
    {
      path: '/change/:tel',
      name: 'change',
      component: resolve => require(['@/pages/loginRegister/changePwd.vue'], resolve),
      props: true
    },
    {
      path: '/corder',
      name: 'corder',
      component: resolve => require(['@/pages/createOrder/index.vue'], resolve)
    }
  ]
})
router.afterEach((to, from, next) => {
  if (from.name === 'index') {
    y = document.documentElement.scrollTop
  }

  if (to.name === 'index') {
    setTimeout(() => {
      document.documentElement.scrollTop = y
    }, 0)
  } else {
    document.documentElement.scrollTop = 0
  }
})
export default router
