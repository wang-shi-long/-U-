<template>
  <div class="login-container">
    <!-- 页头 -->
    <van-nav-bar
      title="会员登陆"
      @click-left="$router.back()"
      left-text="返回"
      left-arrow
      right-text="注册"
      @click-right="$router.push('/register')"
    ></van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phone"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
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
          立即登录
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
        phone: "17342065909",
        password: "admin888",
      },
    };
  },
  methods: {
    // 表单提交处理函数
    onSubmit() {
      this.$http.post("/login", this.user).then((data) => {
        if (data.code === 200) {
          console.log(data);
          // 将登陆信息写道本地存储中
          sessionStorage.setItem("logininfo", JSON.stringify(data.list));
          this.$toast.success(data.msg);
          return this.$router.push("/user");
        }
        this.$toast.fail(data.msg);
      });
    },
  },
};
</script>

<style scoped>
</style>