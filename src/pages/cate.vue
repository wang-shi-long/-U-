<template>
  <div class="cate-container">
    <!-- 页头 -->
    <van-nav-bar @click-left="$router.back()" title="商品分类首页" left-text="返回" left-arrow />
    <div class="content">
      <!-- 侧边导航 -->
      <van-sidebar v-model="activeKey" @change="tabChange">
        <van-sidebar-item
          v-for="item in cates"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- 右侧主体区域 -->
      <div class="main">
        <van-grid
          :border="false"
          :column-num="3"
          v-for="item in children"
          :key="item.id"
        >
          <van-grid-item @click="$router.push('/goodslist?cateid=' + item.id)">
            <van-image :src="$baseUrl + item.img" />
            <h6>{{ item.catename }}</h6>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      // 商品分类的数组
      cates: [],
      // 右侧商品展示的数组
      children: [],
    };
  },
  methods: {
    // 侧边导航change事件回调函数
    tabChange(index) {
      this.children = this.cates[index].children;
    },
    // 获取分类列表
    getCates() {
      this.$http.get("/getcate").then((data) => {
        if (data.code === 200) {
          this.cates = data.list;
          this.tabChange(0);
        }
      });
    },
  },
  created() {
    this.getCates();
  },
};
</script>

<style scoped>
.content {
  display: flex;
}
.main {
  flex: 1;
  display: flex;
}
.cate-container {
  margin-bottom: 50px;
}
</style>