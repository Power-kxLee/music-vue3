<template>
<div id="songDetail">
  <div ref="imgbjDom" class="imgbj"></div>
  <div class="song-header">
    <van-icon name="arrow-down" />
    <van-tabs v-model:active="active"
              swipeable>
      <van-tab title="歌曲" name="song">
        <m-song  @get-data='getSongData'></m-song>
      </van-tab>
      <van-tab title="歌词" name="lyric">
        <m-lyric></m-lyric>
      </van-tab>
    </van-tabs>
  </div>
</div>
</template>
<script setup lang="ts">
import mSong from './components/song.vue'
import mLyric from './components/lyric.vue'
import bjimgs from './images/IMG20211126-103830.jpg'
import { ref } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import { 
  Tab as vanTab, 
Tabs as vanTabs,
Icon as vanIcon } from "vant";
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
const active = ref('song');
const imgbjDom = ref(null)
const bgImg = ref('')
const getSongData = (data:any) => {
  const _imgDom:any = imgbjDom.value
  _imgDom.style.background = `url(${data.al.picUrl}),linear-gradient(138deg, #ee9ae5, #5961f9) `
  _imgDom.style.backgroundSize = '100% 100%'
  _imgDom.style.backgroundRepeat = 'no-repeat'
  
}
axios.get({
  url: "/song/url",
  data: {
    id,
  },
});
</script>
<style >
:root{
  --bgs: rgb(216, 216, 216)
}
</style>
<style scoped lang="scss">

  #songDetail::v-deep{
    position: relative;
    .imgbj {
      position: absolute;
      top:0px;
      left: 0px;
      width: 100vw;
      height: 100vh;
      filter: blur(60px);
      background: linear-gradient(138deg, #ee9ae5, #5961f9);
      
    }
    .song-header {
      position: relative;
    }
    .van-icon-arrow-down {
      color: var(--bgs);
      font-size: 22px;
      position: absolute;
      top:10px;
      left: 20px;
    }
    .van-tabs__nav {
      background: none;
    }
    .van-tabs__wrap {
      width: 100px;
      margin: 0 auto;
    }
    .van-tab {
      color:var(--bgs);
    }
    .van-tab--active {
      color: white;
    }
    .arrow-down {
      font-size: 16px;
    }
  }
</style>