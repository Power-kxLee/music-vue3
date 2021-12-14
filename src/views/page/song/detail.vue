<template>
  <van-loading class="loadingAll"
               v-if="loading"
               size="24px"
               vertical>
    <p v-for="(item, i) in loadingName"
       :key="i">
      {{i+1}} {{item}}
    </p>
  </van-loading>
  <div id="songDetail"
       :class="{'mohu': loading}">
    <div ref="imgbjDom"
         class="imgbj"></div>
    <div class="songWarp">
      <div class="song-header">
        <van-icon name="arrow-down"
                  @click="router.back()" />
        <van-tabs ref="tabs"
                  v-model:active="active"
                  swipeable>
          <van-tab title="歌曲"
                   name="song">
            <songPage @get-data='getSongData'></songPage>
          </van-tab>
          <van-tab title="歌词"
                   name="lyric">
            <lyric @lyric-callback="lyricCallback"></lyric>
          </van-tab>
        </van-tabs>
      </div>
      <player @player-callback="playerCallback"></player>
    </div>
  </div>
</template>
<script lang="ts">

import { ref, nextTick, defineComponent } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import {
  Tab as vanTab,
  Tabs as vanTabs,
  Icon as vanIcon,
  Loading as vanLoading,
} from "vant";
import axios from "@axios";
export default defineComponent({
  name: "songDetail",
});
</script>

<script setup lang="ts">
import songPage from "./components/song.vue";
import lyric from "./components/lyric.vue";
import player from "./components/player.vue";
import bjimgs from "./images/IMG20211126-103830.jpg";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const active = ref("song");
const imgbjDom = ref(null);
const bgImg = ref("");
const loading = ref(true);
const tabs: any = ref(null);
const lyricDetail = ref({});
const loadingName: any = ref(["免费的服务器,等等吧...😀"]);
// 音乐详细接口 加载完毕后的回调
const getSongData = (data: any) => {
  const _imgDom: any = imgbjDom.value;
  _imgDom.style.background = `url(${data.al.picUrl}),linear-gradient(138deg, #ee9ae5, #5961f9) `;
  _imgDom.style.backgroundSize = "100% 100%";
  // _imgDom.style.backgroundRepeat = "no-repeat";
  loadingName.value.push("音乐详情完毕✌");
  hideLoading();
};
// 获取音乐的播放地址回调
const playerCallback = (data: any) => {
  loadingName.value.push("音乐地址检测完毕👏");
  hideLoading();
};

// 获取歌词的回调
const lyricCallback = (data: any) => {
  loadingName.value.push("音乐歌词加载好啦😎");
  hideLoading();
};

const hideLoading = () => {
  if (loadingName.value.length === 4) {
    loadingName.value.push("完毕😁");
    setTimeout(function () {
      loading.value = false;
    }, 100);
  }
};
</script>
<style >
:root {
  --bgs: rgb(216, 216, 216);
}
</style>
<style scoped lang="scss">
.loadingAll {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: absolute;
  color: white;
  z-index: 33;
  p {
    color: white;
  }
}
.mohu {
  filter: blur(60px);
}
#songDetail {
  position: relative;
  .imgbj {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    filter: blur(60px);
    background: linear-gradient(138deg, #ee9ae5, #5961f9);
  }
  .song-header {
    position: relative;
    overflow: hidden;
    flex: 1;
  }

  ::v-deep(.songWarp) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    .van-icon-arrow-down {
      color: white;
      font-size: 22px;
      position: absolute;
      top: 10px;
      left: 20px;
      z-index: 44;
    }
    .van-tabs__nav {
      background: none;
    }
    .van-tabs__wrap {
      width: 100px;
      margin: 0 auto;
    }
    .van-tab {
      color: var(--bgs);
    }
    .van-tab--active {
      color: white;
    }
    .arrow-down {
      font-size: 16px;
    }
  }
}
</style>