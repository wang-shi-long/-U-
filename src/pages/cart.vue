<template>
  <div class="cart-container">
    <!-- 页头 -->
    <van-nav-bar
      title="购物车"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
    ></van-nav-bar>
    <!-- 购物车列表 -->
    <van-swipe-cell>
      <van-card
        v-for="(item, index) in cartList"
        :key="item.id"
        :price="item.price"
        :title="item.goodsname"
        :thumb="$baseUrl + item.img"
      >
        <template #footer>
          <van-button @click="del(item.id)" type="danger" size="mini"
            >删除</van-button
          >
          <!-- plus增加时触发  minus减少时触发 -->
          <van-stepper
            v-model="cartList[index].num"
            theme="round"
            button-size="22"
            disable-input
            min="1"
            max="100"
            @plus="plusCart(item.id)"
            @minus="minusCart(item.id)"
          />
        </template>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-card>
    </van-swipe-cell>
    <!-- 合计金额 -->
    <van-submit-bar
      :price="orderAmount"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getCartListAction"]),
    ...mapMutations(["uidInit"]),
    onSubmit() {},
    // 增加购物车
    plusCart(id) {
      this.updateCart(id, 2);
    },
    // 减少购物车
    minusCart(id) {
      this.updateCart(id, 1);
    },
    // 更新购物车
    updateCart(id, type) {
      this.$http.post("/cartedit", { id, type }).then((data) => {
        if (data.code === 200) {
          this.$toast.success(data.msg);
        } else {
          this.$toast.fail(data.msg);
        }
      });
    },
    // 删除
    del(id) {
      this.$http.post("/cartdelete", { id }).then((res) => {
        if (res.data === 200) {
          // 移除被删除的购物车信息
          this.getCartListAction(this.uid);
          this.$toast.success(res.msg);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
  },
  computed: {
    ...mapState(["cartList", "uid"]),
    ...mapGetters(["orderAmount", "cartTotal"]),
  },
  created() {
    if (this.uid === "") {
      this.uidInit();
    }
    if (this.cartList.length === 0) {
      this.getCartListAction(this.uid);
    }
  },
};
</script>

<style scoped>
.van-submit-bar {
  margin-bottom: 50px;
}
.cart-container {
  margin-bottom: 100px;
}
</style>