import Vue from 'vue';
import Router from 'vue-router';
import index from './views/index.vue';

Vue.use(Router);
const baseUrl = '/partnercollage'
export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  // linkActiveClass: 'active', // 附加‘active’ class类（选中的
  routes: [
    { // 入口页
      path: '/',
      redirect: baseUrl + '/Index/index',
      name: 'home',
      component:  () => import('./views/home.vue'),
      children: [
        { // 首页商城页
          path: baseUrl + '/Index/index',
          name: 'index',
          component: index,
          meta: {
            linkActive: 'home',
            keepAlive: true
          }
        },
        { // 我的
          path: baseUrl + '/Profile/index',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/About.vue'),
          meta: {
            linkActive: 'my'
          }
        },
        { // 已报名订单页
          path: baseUrl + '/Order/reportedOrder',
          name: 'hasPay',
          component: () => import('./views/hasPay.vue'),
          meta: {
            linkActive: 'my'
          }
        },
        { // 开团状态页
          path: baseUrl + '/Group/index',
          name: 'groupType',
          component: () => import('./views/groupType.vue'),
          meta: {
            linkActive: 'my'
          }
        },
        { // 待支付订单页
          path: baseUrl + '/Pay/unPaid',
          name: 'unPaid',
          component: () => import('./views/unPaid.vue'),
          meta: {
            linkActive: 'my'
          }
        },
        { // 拼团历史页
          path: baseUrl + '/History/groupHistory',
          name: 'groupHistory',
          component: () => import('./views/groupHistory.vue'),
          meta: {
            linkActive: 'my'
          }
        }
      ]
    },
    { // 登录页
      path: baseUrl + '/Login/login',
      name: 'login',
      component: () => import('./views/login.vue'),
      props: true
    },
    { // 商品详情页
      path: baseUrl + '/Index/details',
      name: 'details',
      component: () => import('./views/details.vue')
    },
    {
      // 客服页面
      path: baseUrl + '/Profile/serviceIndex',
      name: 'service',
      component: () => import('./views/service.vue')
    },
    {
      path: baseUrl + '/Alipay/aliPayMiddle',
      name: 'alipay',
      component: () => import('./views/alipayView.vue')
    },
    {
      path: baseUrl + '/Alipay/aliPayReturn',
      name: 'alipaysuccess',
      component: () => import('./views/aliPaySuccess.vue')
    }
  ]
})
