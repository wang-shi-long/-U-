<template>
  <div class="login-container">
    <!-- 页头 -->
    <van-nav-bar
      title="会员注册"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
      right-text="登录"
      @click-right="$router.push('/login')"
    ></van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="user.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          立即注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        phone: "",
        nickname: "",
        paddwors: "",
      },
    };
  },
  methods: {
    // 表单提交处理函数
    onSubmit() {
      this.$http.post("/register", this.user).then((res) => {
        if (res.code === 200) {
          this.$toast.success(res.msg);
          return this.$router.push("/login");
        }
        this.$toast.fail(res.msg);
      });
    },
  },
};
</script>

<style scoped>
</style>