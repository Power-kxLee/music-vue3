<template>
  <article class="login">
    <main>
      <div class="loginContent">
        <div class="phone">
          <van-icon name="phone-o" />
          <input type="text"
                 v-model="loginData.phone"
                 @input="handelPhone"
                 placeholder="手机号码快速登录">
          <van-slider v-model="phonejd"
                      disabled
                      active-color="#ee0a24">
            <template #button>
              <div class="custom-button">{{ phonejd }}</div>
            </template>
          </van-slider>
        </div>
        <div class="code">
          <input type="text"
                 placeholder="验证码">
        </div>
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">
          快速登录
        </van-button>
      </div>
      <mark class="mark">本项目仅供学习使用,请尊重版权，请勿利用此项目从事商业行为或进行破坏版权行为</mark>
    </main>
  </article>
</template>
<script setup lang="ts">
import { Button as VanButton, Slider as VanSlider } from "vant";
import { ref } from "vue";
const loginData: any = ref({
  phone: "",
  code: "",
});
const phonejd = ref(0);
const handelPhone = function(val) {
  console.log(val)
}
</script>
<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background: #fd83f0;
  }
  100% {
    background: #5961f9;
  }
}
.login {
  overflow: hidden;
  height: 100vh;
  background: linear-gradient(138deg, #ee9ae5, #5961f9);
  position: relative;
  input::-webkit-input-placeholder {
    color: white;
  }
  .loginContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    input {
      background: none;
      color: white;
    }
  }
  .mark {
    position: absolute;
    bottom: 0px;
    left: 0px;
    font-size: 12px;
    background: white;
  }
}
</style>