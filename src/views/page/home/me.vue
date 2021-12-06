<template>
  <article class="me-content">
    <header>
      <div class="user-account">
        <div class="user-img">
          <van-image width="80" height="80" round />
        </div>
        <div class="user-detail">
          <h3 class="user-name">未登陆</h3>
          <router-link class="noloading-tis" to="/sign/login">登录后的世界更精彩 <van-icon name="arrow" /></router-link>
        </div>
      </div>
    </header>
    <main></main>
  </article>
</template> 
<script setup lang="ts">
import { Image as VanImage, Icon as VanIcon } from 'vant';
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