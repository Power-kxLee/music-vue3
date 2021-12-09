<template>
  <article class="login">
    <main>
      <div class="loginContent">
        <template v-if="newLoginState=== 'qr'">
          <div class="qr">
            <p>扫码二维码登录</p>
            <van-image width="200"
                       height="200"
                       :src="qrImg" />
          </div>
        </template>
        <template v-if="newLoginState=== 'phone'">

          <div class="phone">
            <input type="tel"
                   v-model="loginData.phone"
                   @input="handelPhone"
                   max="11"
                   placeholder="输入手机号码">
            <van-slider v-model="phonejd"
                        disabled
                        active-color="#ee0a24">
              <template #button>
                <div class="custom-button"></div>
              </template>
            </van-slider>
          </div>
          <div class="code"
               v-if="codeShow">
            <input type="text"
                   v-model="loginData.captcha"
                   placeholder="验证码"
                   max="4">
            <van-slider v-model="codejd"
                        disabled
                        active-color="#ee0a24">
              <template #button>
                <div class="custom-button"></div>
              </template>
            </van-slider>
          </div>
          <div class="goform">

            <van-button class="loginbtn"
                        :class="{'nobtn': pushLoading}"
                        @click="loginbtn">
              <div>
                <template v-if="!pushLoading">
                  <span>快速登录</span>
                </template>
                <template v-else>
                  <van-loading type="spinner"
                               size="24px" />
                  <span>{{btnName}}</span>
                </template>
              </div>
            </van-button>
          </div>
        </template>
        <footer>
          <div class="more">
            <van-icon @click="switchState('phone')"
                      :class="{'cur': newLoginState === 'phone'}"
                      name="phone-o" />
            <van-icon @click="switchState('qr')"
                      :class="{'cur': newLoginState === 'qr'}"
                      name="scan" />
          </div>
        </footer>
      </div>
      <mark class="mark">本项目仅供学习使用,请尊重版权，请勿利用此项目从事商业行为或进行破坏版权行为</mark>
    </main>
  </article>
</template>
<script setup lang="ts">
import {
  Button as VanButton,
  Slider as VanSlider,
  Icon as VanIcon,
  Loading as VanLoading,
  Image as VanImage,
  Notify as VanNotify,
} from "vant";
import { useStore } from "vuex";
import { ref, watch, computed } from "vue";
import axios from "@axios";
import { useRouter } from "vue-router";
const loginData: any = ref({
  phone: "",
  captcha: "",
});
const store = useStore()
const phonejd = ref(0);
const codejd = ref(0);
const codeShow = ref(false);
const pushLoading = ref(false);
const btnName = ref("");
const router = useRouter();
const qrImg = ref("");
const loginState = ref("phone"); // 默认登录方式 二维码登录
let saveUnikey: any;
const handelPhone = function () {
  let num = Math.floor((loginData.value.phone.length / 11) * 100);
  if (num >= 100) {
    num = 100;
  }
  phonejd.value = num;
};
const reg_tel =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; // 手机号码正则
const Notify = VanNotify;
const loginbtn = async () => {
  // 等待状态直接返回
  if (pushLoading.value) {
    return;
  }

  if (!reg_tel.test(loginData.value.phone)) {
    Notify({ type: "warning", message: "请输入正确的手机号码" });
    return false;
  }

  pushLoading.value = true;
  // 没有发过短信 就先走短信
  if (!codeShow.value) {
    btnName.value = "正在发送短信";
    // 发送验证码
    const resut: any = await axios.get({
      url: "/captcha/sent",
      data: loginData.value,
    });
    pushLoading.value = false;
    if (resut.code === 200 && resut.data) {
      Notify({ type: "success", message: "短信发送成功" });
      codeShow.value = true;
    } else {
      Notify({ type: "danger", message: resut.message });
    }
    return false;
  }

  if (loginData.value.captcha.length !== 4) {
    Notify({ type: "warning", message: "请输入正确的验证码" });
    return false;
  }
  btnName.value = "正在登录中...";
  const resut: any = await axios
    .get({
      url: "/login/cellphone",
      data: loginData.value,
    })
    .catch((e) => {
      Notify({ type: "danger", message: e.message });
      pushLoading.value = false;
    });
  if (resut.code === 200) {
    Notify({ type: "success", message: "登录成功" });
     store.commit('update',{
      key: 'cookie',
      value: resut.cookie
    })
    // 获取登录的信息
    getLoginStatus();
  } else {
    Notify({ type: "danger", message: resut.message });
  }
};

// 创建登录的二维码
const createQr = async () => {
  const _date: any = new Date();
  const { data }: any = await axios.get({
    url: "/login/qr/key",
    data: {
      timestamp: Date.parse(_date), // 带上时间戳防止缓存
    },
  });
  const { unikey } = data;
  // 保存key到外局
  saveUnikey = unikey;
  const qrData: any = await axios.get({
    url: "/login/qr/create",
    data: {
      key: unikey,
      qrimg: unikey,
    },
  });
  const { qrimg } = qrData.data;
  qrImg.value = qrimg;
};


const newLoginState = computed(() => {
  // 选择了二维码
  if (loginState.value === "qr") {
    checkQr.state = false;
    checkQr.start(saveUnikey);
  } else {
    checkQr.stop();
  }
  return loginState.value;
});

// 切换登录的方式
const switchState = (state: string) => {
  loginState.value = state;
};

// 获取登录状态
const getLoginStatus = async () => {
  const value:any =  await axios.get({
    url: '/login/status',
    data: {
      timerstamp:Date.now()
    }
  })
  if (value.data.code === 200) {
    // 登录的状态保存到loginStatus
    window.localStorage.setItem('loginStatus', JSON.stringify(value))
    store.commit('update', {
      key: 'loginStatus',
      value
    })
  }
};


// 检测扫码的状态
const checkQr: any = {
  state: false,
  key: "",
  // 开始检测
  start: async (key: string) => {
    if (checkQr.state) {
      return false;
    }
    const data = await axios.get({
      url: "/login/qr/check",
      data: {
        key,
        time: Date.now()
      },
    });
    const { code, message, cookie }: any = data;
    if (code !== 803) {
      Notify({ type: "warning", message });
      return setTimeout(async () => {
        return await checkQr.start(key);
      }, 2000);
    }
    
    Notify({ type: "success", message: "登录成功" });
    store.commit('update',{
      key: 'cookie',
      value: cookie
    })
    // 获取登录的信息
    getLoginStatus();
   
  },
  // 停止检测
  stop: () => {
    checkQr.state = true;
  },
};

// 创建登录二维码
createQr();
// 检测是否登录
getLoginStatus();
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
.login::v-deep {
  overflow: hidden;
  height: 100vh;
  background: linear-gradient(138deg, #ee9ae5, #5961f9);
  position: relative;
  input::-webkit-input-placeholder {
    color: white;
    font-size: 16px;
  }
  .loginContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    input {
      background: none;
      color: white;
      height: 40px;
      font-size: 16px;
      text-align: center;
    }
  }
  .goform {
    text-align: center;
    margin-top: 30px;
  }
  .code {
    margin-top: 20px;
  }
  .mark {
    position: absolute;
    bottom: 0px;
    left: 0px;
    font-size: 12px;
    background: white;
  }
  .custom-button {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 100%;
  }
  .loginbtn {
    color: #5961f9;
    width: 100%;
    border-radius: 10px;
    div {
      display: flex;
      .van-loading {
        line-height: normal;
        margin-right: 10px;
      }
      span {
        line-height: 24px;
      }
    }
    &.nobtn {
      background: linear-gradient(to right, #ff8664, #ee5365);
    }
  }
  .qr {
    p {
      font-size: 16px;
      color: white;
      text-align: center;
      margin-bottom: 10px;
    }
  }
  .more {
    color: rgb(255, 245, 245);
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .van-icon {
      width: 28px;
      height: 28px;
      border: 1px solid rgb(253, 245, 245);
      border-radius: 100%;
      text-align: center;
      font-size: 22px;
      &.cur {
        border-color: #e797e6;
        color: #e797e6;
        box-shadow: 0px 0px 12px #d38fe8;
      }
      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>