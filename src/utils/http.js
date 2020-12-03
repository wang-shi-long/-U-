import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
// 导入路由对象
import router from '../router'

// 配置baseUrl
axios.defaults.baseURL = '/api'

// 添加请求拦截器
axios.interceptors.request.use(function (req) {
    const logininfo = JSON.parse(sessionStorage.getItem('logininfo') || '{}')
    // authorization  添加请求头
    req.headers.authorization = logininfo.token;
    return req
})

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    if (res.data.code === 403) {
        Toast.fail(res.data.msg)
        // location.href = "#/login"
        router.push('/login')
    }
    return res.data;
})

// 添加到vue中的原型对象上
Vue.prototype.$http = axios;

export default axios