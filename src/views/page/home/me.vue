<template>
  <article class="me-content">

    <main>
      <div class="user-account boxdiv">
        <div class="user-img">
          <van-image width="80"
                     height="80"
                     round
                     :src="userData.profile.backgroundUrl" />
        </div>
        <div class="user-detail">
          <h3 class="user-name">
            {{userData.profile ? userData.profile.nickname: '未登录' }}
            <span>Lv{{userData.level}}</span>
          </h3>
          <router-link v-if="!userData.account"
                       class="noloading-tis"
                       to="/sign/login">登录后的世界更精彩
            <van-icon name="arrow" />
          </router-link>
          <template v-else>
            <ul>
              <li>{{userData.profile.follows}}关注</li>
              <li>{{userData.profile.followeds}}粉丝</li>
              <li>Lv{{userData.level}}</li>
            </ul>
            <ul>
              <li>{{userData.birthday}}年</li>
              <li>{{userData.province}}{{userData.city}}</li>
              <li>虾听{{Math.floor(userData.createDays / 365) }}年</li>
            </ul>
          </template>
        </div>
      </div>
      <template v-if="userData.account">
        <div class="boxdiv">
          <header>音乐品味</header>
          <van-cell is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="boxdivlist">
                <div class="icon">
                  <span class="music-icon"></span>
                </div>
                <div class="content">
                  <h5>听歌排行</h5>
                  <section>累计听歌{{userData.listenSongs}}首</section>
                </div>
              </div>
            </template>
            <template #right-icon></template>
          </van-cell>
          <van-cell is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="boxdivlist">
                <div class="icon">
                  <van-icon name="like" />
                </div>
                <div class="content">
                  <h5>我喜欢的音乐</h5>
                  <section>累计听歌{{userData.likeNum}}首</section>
                </div>
              </div>
            </template>
            <template #right-icon></template>
          </van-cell>
        </div>
      </template>
    </main>
  </article>
</template> 
<script setup lang="ts">
import { Image as VanImage, Icon as VanIcon, Cell as VanCell } from "vant";
import axios from "@axios";
import { getLoginStatus } from "@/js/common";
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import placesMap from "@/data/placesMap";
const store = useStore();
const userData: any = ref({});
const _placesMap: any = placesMap;

const isLogin = () => {
  const _len = Object.keys(store.state.loginStatus).length;
  if (_len > 0 || localStorage.getItem("loginStatus")) {
    const val =
      _len > 0
        ? store.state.loginStatus
        : JSON.parse(localStorage.getItem("loginStatus") || "");
    return val.data
  }
  return {}
}
const init = () => {
  // 获取用户的详情内容
  initDetail()
  initLive()
};

const initDetail = async () => {
   // 获取登录后的内容
  let loginData = isLogin()
  // 获取用户详情
  const detailData = await axios.get({
    url: "/user/detail",
    data: {
      uid: loginData.profile.userId,
    },
  });
  userData.value = Object.assign(loginData, detailData);
  userData.value.province = _placesMap[loginData.profile.province].replace(
    /[&省]$/,
    ""
  );
  userData.value.city = _placesMap[loginData.profile.city].replace(
    /[&市]$/,
    ""
  );
  const year: any = new Date(loginData.profile.birthday)
    .getFullYear()
    .toString();
    // 比如是1991年 那么就返回 91年
  userData.value.birthday = year.substring(year.length - 2, year.length);
}
const initLive = async () => {
  let loginData = isLogin()
  const {ids}:any = await axios.get({
    url: '/likelist',
    data:{
      uid:loginData.profile.userId
    }
  })
  userData.value.likeNum = ids.length
}
init();
</script>
<style lang="scss" scoped>
.me-content {
  overflow: hidden;
  background: linear-gradient(11deg, #ee9ae5, #5961f9);
  height: calc(100vh - 51px);
  ::v-deep(.boxdiv) {
    padding: 10px;
    margin: 20px 10px;
    background: white;
    border-radius: 10px;
    .van-cell {
      padding-left: 0px;
    }
    header {
      font-size: 18px;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .boxdivlist {
      display: flex;
      .icon {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        background: #f44336;
        margin-right: 10px;
        position: relative;
        text-align: center;
        .music-icon {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          width: 4px;
          height: 25px;
          border-radius: 10px;
          &::after {
            content: "";
            width: 4px;
            height: 15px;
            background: white;
            position: absolute;
            bottom: 0px;
            left: -10px;
            border-radius: 10px;
          }
          &::before {
            content: "";
            width: 4px;
            height: 10px;
            background: white;
            position: absolute;
            bottom: 0px;
            right: -10px;
            border-radius: 10px;
          }
        }
        .van-icon {
          color: white;
          font-size: 26px;
          line-height: 60px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h5 {
          font-size: 14px;
          font-weight: normal;
        }
        section {
          color: rgb(133, 133, 133);
          font-size: 13px;
        }
      }
    }
  }
  .user-account {
    display: flex;
    .user-detail {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .user-name {
        font-size: 18px;
      }
    }
  }
}
</style>