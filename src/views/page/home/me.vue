<template>
  <article class="me-content">
    <header>
      <div class="user-account">
        <div class="user-img">
          <van-image width="80" height="80" round :src="userData.profile.backgroundUrl"/>
        </div>
        <div class="user-detail">
            <h3 class="user-name">
              {{userData.profile ? userData.profile.nickname: '未登录' }}
              <span>Lv{{userData.level}}</span>
            </h3>
            <router-link v-if="!userData.account" class="noloading-tis" to="/sign/login">登录后的世界更精彩 <van-icon name="arrow" /></router-link>
            <template v-else>
              <ul>
                <li>{{userData.birthday}}年</li>
                <li>{{userData.province}}{{userData.city}}</li>
                <li>{{Math.floor(userData.createDays / 365) }}岁了</li>
              </ul>
            </template>
        </div>
      </div>
    </header>
    <main></main>
  </article>
</template> 
<script setup lang="ts">
import { Image as VanImage, Icon as VanIcon } from 'vant';
import axios from '@axios';
import {getLoginStatus} from '@/js/common'
import { computed,watch,ref } from 'vue';
import { useStore } from 'vuex';
import placesMap from '@/data/placesMap'
const store = useStore()
const userData:any = ref({})
const _placesMap:any = placesMap
const init = async () => {
  // 判断是登录状态
  const _len = Object.keys(store.state.loginStatus).length
  if (_len > 0 || localStorage.getItem('loginStatus') ) {
    const val = _len > 0 ? store.state.loginStatus : JSON.parse(localStorage.getItem('loginStatus') || '')
    userData.value = val.data
  }
  const detailData = await axios.get({
    url: '/user/detail',
    data: {
      uid: userData.value.profile.userId
    }
  })
  userData.value = Object.assign(userData.value, detailData)
  userData.value.province = _placesMap[userData.value.profile.province].replace(/[&省]$/, '')
  userData.value.city = _placesMap[userData.value.profile.city].replace(/[&市]$/, '')
  const year:any = new Date(userData.value.profile.birthday).getFullYear().toString()
  userData.value.birthday = year.substring(year.length - 2, year.length)
  console.log(userData.value)
  axios.get({
    url: '/user/subcount'
  })
}
init()
</script>
<style lang="scss" scoped>
  .me-content::v-deep{
    overflow: hidden;
     background: linear-gradient(11deg, #ee9ae5, #5961f9);
     height: calc(100vh - 51px);
    .user-account {
      padding: 10px;
      margin: 20px 10px;
      background: white;
      border-radius: 10px;
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