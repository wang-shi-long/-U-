import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/http'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 购物车列表
        cartList: [],
        // 登录用户的uid
        uid: ''
    },
    mutations: {
        cartListInit(state, list) {
            state.cartList = list
        },
        // 清空购物车
        cartListClear(state) {
            state.cartList = []
        },
        uidInit(state, uid) {
            const logininfo = JSON.parse(sessionStorage.getItem('logininfo') || '{}')
            if (logininfo) {
                state.uid = logininfo.uid
                // console.log(state);
            }
        }
    },
    actions: {
        getCartListAction({ commit }, uid) {
            axios.get('/cartlist', { params: { uid } }).then(res => {
                if (res.code === 200) {
                    commit('cartListInit', res.list)
                }
            })
        }
    },
    getters: {
        // 购物车商品总价格
        orderAmount(state) {
            let amount = 0;
            state.cartList.forEach(item => {
                amount += item.price * item.num * 100;
            })
            return amount;
        },
        // 购物车商品总数
        cartTotal(state) {
            let total = 0;
            state.cartList.forEach(item => {
                total += item.num;
            })
            return total;
        },
    }
});

export default store;