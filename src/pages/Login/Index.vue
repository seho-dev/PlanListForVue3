<template>
  <div class="LoginMain">
    <van-nav-bar title="登录">
      <template #left>
        <span @click="handelNavBack">返回</span>
      </template>
    </van-nav-bar>
    <van-form @submit="handelLogin">
      <van-field
        v-model="Form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="Form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 用户名和密码
    const Form = reactive({
      username: "",
      password: "",
    });
    // 登录
    function handelLogin() {
      store.commit("setUser", {
        username: Form.username,
        password: Form.password,
      });
      Toast(`登录成功，你好: ${Form.username}, 请添加你的计划吧~`);
      // 跳转到首页
      router.push({
        path: "/",
      });
    }
    // 返回
    function handelNavBack() {
      router.go(-1);
    }
    return {
      Form,
      handelLogin,
      handelNavBack,
    };
  },
};
</script>

<style>
</style>
