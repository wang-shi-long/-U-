<template>
  <div class="index-container">
    <!-- 页头 -->
    <van-nav-bar
      @click-left="$router.back()"
      title="商城首页"
      left-text="返回"
      left-arrow
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="item in banners" :key="item.id">
        <img :src="$baseUrl + item.img" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 标签页 -->
    <van-tabs v-model="active">
      <van-tab title="热门推荐">
        <van-card
          v-for="item in recommendList[0].content"
          :key="item.id"
          :price="item.price"
          :title="item.goodsname"
          :thumb="$baseUrl + item.img"
        >
          <template #footer>
            <van-button
              @click="addCart(item.id)"
              size="small"
              type="primary"
              icon="cart-o"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="发现新品">
        <van-card
          v-for="item in recommendList[1].content"
          :key="item.id"
          :price="item.price"
          :title="item.goodsname"
          :thumb="$baseUrl + item.img"
        >
          <template #footer>
            <van-button
              @click="addCart(item.id)"
              size="small"
              type="primary"
              icon="cart-o"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="全部商品">
        <van-card
          v-for="item in recommendList[2].content"
          :key="item.id"
          :price="item.price"
          :title="item.goodsname"
          :thumb="$baseUrl + item.img"
        >
          <template #footer>
            <van-button
              @click="addCart(item.id)"
              size="small"
              type="primary"
              icon="cart-o"
            ></van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["uid"]),
  },
  data() {
    return {
      active: 0,
      // 轮播图图片数组
      banners: [],
      // 推荐商品数组
      recommendList: [{ content: [] }, { content: [] }, { content: [] }],
    };
  },
  methods: {
    ...mapMutations(["uidInit"]),
    ...mapActions(["getCartListAction"]),
    // 请求轮播图的图片
    getBanners() {
      this.$http.get("/getbanner").then((data) => {
        if (data.code === 200) {
          this.banners = data.list;
        }
      });
    },
    // 获取商品推荐列表
    getRecommendList() {
      this.$http.get("/getindexgoods").then((data) => {
        if (data.code === 200) {
          this.recommendList = data.list;
        }
      });
    },
    // 添加购物车
    addCart(goodsid) {
      if (this.uid === undefined) {
        return this.$toast.fail("请进行登录");
      }
      this.$http
        .post("/cartadd", { uid: this.uid, num: 1, goodsid })
        .then((res) => {
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.getCartListAction(this.uid);
          } else {
            this.$toast.fail(res.msg);
          }
        });
    },
  },
  created() {
    this.getBanners();
    this.getRecommendList();
    this.uidInit();
    this.getCartListAction(this.uid);
  },
};
</script>

<style scoped>
.van-swipe-item img {
  width: 100%;
  height: 100%;
}
.van-tabs {
  margin-bottom: 50px;
}
</style>