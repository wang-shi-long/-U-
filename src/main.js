// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import VueRouter from 'vue-router';
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

// 设置全局的图片开头
Vue.prototype.$baseUrl = 'http://127.0.0.1:3000'

// 导入vuex数据存储对象
import store from './store'

// 导入http模块
import './utils/http'

// 导入vant组件库(全部引入)
import Vant from 'vant'
// 导入vant组件库的样式表
import 'vant/lib/index.css'
// 注册
Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
