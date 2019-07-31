import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import { post, get } from './services/axios.tools' // 导入封装好的axios
import adapt from './services/adapt'
import wxService from './services/wxsdk'
import loading from '@/components/loading.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/css/reset.css'
import 'swiper/dist/css/swiper.css'
// import './mock.js'
Vue.config.productionTip = false
Vue.component('v-loading', loading)
FastClick.prototype.focus = (ele: any) => { 'use strict'; ele.focus() } // 修改focus()方法
FastClick.attach(document.body)
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.prototype.$wxService = wxService

Vue.use(adapt)
Vue.use(VueAwesomeSwiper)
router.beforeEach((to: any, from: any, next: any) => {
  // console.log('to', from)
  to.path.match('details')
  from.path.match('Index/index')
  if (to.path.match('details') && from.path.match('Index/index')) {
    from.meta.keepAlive = true
  } else {
    from.meta.keepAlive = false
  }
  // next()
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

  if (isiOS && to.path !== location.pathname) {
    location.assign(to.fullPath)
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
