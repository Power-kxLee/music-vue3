<template>
<div id="songDetail">
  <div class="song-header">
    <van-icon name="arrow-down" />
    <van-tabs v-model:active="active"
              swipeable>
      <van-tab title="歌曲" name="song">
        <m-song></m-song>
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
    background: linear-gradient(138deg, #ee9ae5, #5961f9);
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