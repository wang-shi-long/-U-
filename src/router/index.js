import Vue from 'vue'
import Router from 'vue-router'

const layout = () => import('../pages/layout')
const index = () => import('../pages/index')
const cart = () => import('../pages/cart')
const cate = () => import('../pages/cate')
const goodslist = () => import('../pages/goodslist')
const login = () => import('../pages/login')
const register = () => import('../pages/register')
const user = () => import('../pages/user')

Vue.use(Router)

// 导入提示框组件
import { Toast } from 'vant'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: '/home',
      meta: {
        title: '布局'
      },
      children: [
        {
          path: '/home',
          name: 'index',
          component: index,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/cart',
          name: 'cart',
          component: cart,
          meta: {
            title: '购物车'
          }
        }, {
          path: '/cate',
          name: 'cate',
          component: cate,
          meta: {
            title: '商品分类'
          }
        }, {
          path: '/goodslist',
          name: 'goodslist',
          component: goodslist,
          meta: {
            title: '商品列表'
          }
        }, {
          path: '/user',
          name: 'user',
          component: user,
          meta: {
            title: '会员'
          }
        }, {
          path: '/login',
          name: 'login',
          component: login,
          meta: {
            title: '登录'
          }
        }, {
          path: '/register',
          name: 'register',
          component: register,
          meta: {
            title: '注册'
          }
        }
      ]
    }
  ]
})

// 添加路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果你访问的是需要登录认证的页面
  if (to.path === '/user') {
    // 看本地存储中有没有session
    const logininfo = JSON.parse(sessionStorage.getItem('logininfo') || '{}');
    if (logininfo.token === '' || logininfo.token === undefined || logininfo.token === null) {
      Toast.fail('没有登录, 请先登录')
      return next('/login')
    }
  }
  next();
})

export default router
