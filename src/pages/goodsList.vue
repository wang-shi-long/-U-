<template>
  <div class="goods-container">
    <!-- 页头 -->
    <van-nav-bar
      title="商品列表"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <!-- 内容 -->
    <div v-if="goodsList.length > 0">
      <!-- 商品列表 -->
      <van-card
        v-for="item in goodsList"
        :key="item.id"
        :price="item.price"
        :title="item.goodsname"
        :thumb="$baseUrl + item.img"
      >
        <template #footer>
          <van-button
            type="primary"
            size="small"
            icon="cart-o"
          ></van-button>
        </template>
      </van-card>
      <van-button v-if="hashMore" type="primary" @click="loadMore" block plain
        >加载更多</van-button
      >
    </div>
    <van-empty
      v-else
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hashMore: true,
      page: 1,
      size: 2,
      // 商品列表
      goodsList: [],
    };
  },
  methods: {
    // 获取商品对应分类下的商品
    getGoodsList() {
      const page = this.page;
      const size = this.size;
      const sid = this.$route.query.cateid;
      this.$http
        .get("/getcategoods", { params: { page, size, sid } })
        .then((data) => {
          if (data.code === 200) {
            // this.goodsList = data.list.list;
            this.goodsList = this.goodsList.concat(data.list.list);
            if (this.goodsList.length === data.list.total) {
              this.hashMore = false;
            }
          }
        });
    },
    // 加载下一页
    loadMore() {
      // 更新页码
      this.page += 1;
      // 重新请求数据列表
      this.getGoodsList();
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style scoped>
.goods-container {
  margin-bottom: 50px;
}
</style>