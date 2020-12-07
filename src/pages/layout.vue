<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- tabbar底部导航 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/cate" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart-o" :badge="cartTotal"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapGetters(["cartTotal"])
  },
  methods: {
    ...mapMutations(["uidInit"])
  },
  created() {                            
    if (this.uid === "") {
      this.uidInit();
    }
  }, 
};
</script>

<style scoped>
</style>