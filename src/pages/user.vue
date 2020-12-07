<template>
  <div class="user-container">
    <!-- 页头 -->
    <van-nav-bar
      title="会员中心"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <div class="header">
      <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <h3>{{ nickname }}</h3>
    </div>
    <div class="section">
      <!-- 退出按钮 -->
      <van-button block type="danger" @click="logout">安全退出</van-button>
    </div>
    <div class="section">
      <van-cell title="我的收藏" is-link />
      <van-cell title="我的评论" is-link />
      <van-cell title="我的订单" is-link />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["cartTotal"]),
  },
  data() {
    return {
      nickname: "",
    };
  },
  methods: {
    ...mapMutations(["cartListClear"]),
    // 退出按钮
    logout() {
      // 清空购物车
      this.cartListClear();
      sessionStorage.removeItem("logininfo");
      this.$toast.success("退出成功");
      this.$router.push("/login");
    },
  },
  created() {
    // 取出session
    const logininfo = JSON.parse(sessionStorage.getItem("logininfo") || "{}");
    if (logininfo) {
      this.nickname = logininfo.nickname;
    }
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 260px;
  background: #eee;
}
.section {
  padding: 10px 10px 0;
}
.user-container {
  margin-bottom: 50px;
}
</style>