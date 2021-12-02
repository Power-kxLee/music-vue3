<template>
  <div class="songCpt">
    <div class="song-switch-img" :class="{'playClass': playState}"></div>
    <div class="song-img-warp">
      <div class="song-img-content" :class="{'playClass': playState}">
        <div class="song-img">
          <van-image width="180"
                     height="180"
                     :src="songImg"
                     round />
        </div>
      </div>
    </div>
    <div class="song-introduce">
      <h4 class="song-name">
        {{songObj.name}}
        <span v-if="songObj.alName">({{songObj.alName}})</span>
      </h4>
      <p>
        <span v-for="(item,i ) in songObj.ar" :key="item.id">
          {{item.name}} {{i!== songObj.ar.length - 1 ? '/' : ''}}
        </span>
      </p>
      <p class="lyric">
        {{lyricPlay}}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref,watch,computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "@axios";
import { Image as VanImage } from "vant";
import { match } from "assert";
import { AnyARecord } from "dns";
const route = useRoute();
const store = useStore()
const id = route.params.id;
let songImg = ref("");
let songObj: any = ref({});
let lyricData:any = []
let lyricPlay = ref('')
const emit = defineEmits(['get-data'])
const init = () => {
  getSongDetail();
};

const getSongDetail = async () => {
  const songDetail: any = await axios.get({
    url: "/song/detail",
    data: {
      ids: id,
    },
  });
  const songs = songDetail.songs[0];
  // 更新音乐信息
  songObj.value = {
    name: songs.name,
    ar: songs.ar,
    al: songs.al,
    alName: songs.al.name
  };
  store.commit('update', {
    key: 'songDetail',
    value: songs
  })
  emit('get-data', songs)
  songImg.value = songs.al.picUrl;
};

// 监听歌词返回
watch(() => store.state.lyric, (val) => {
  lyricData = val.lyricData
  lyricPlay.value = val.lyricData[0].lyric
})

// 监听播放进度条 返回秒
watch(() => store.state.playTime, (val) => {
  if (lyricData.length > 0 ) {

      const time = val.toFixed(2)
      const d = lyricData.find((value:any) => {
        if (Number(time) < Number(value.s) ) {
          return value
        }
      })
      // 获取对应的歌词
      lyricPlay.value = d.lyric
  }
})

const playState = computed(() => {
  console.log('playState', store.state.palyState)
  return store.state.palyState
})

init();
</script>
<style lang="scss" scoped>
  .songCpt::v-deep {
  position: relative;
  @keyframes rotate365 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(365deg);
    }
  }
  @keyframes rotate0 {

    100% {
      transform: rotate(0deg);
    }
  }
  .song-switch-img {
    width: 83px;
    height: 134px;
    position: absolute;
    top:5px;
    left: 50%;
    margin-left: -10px;
    transform: rotate(-28deg);
    transform-origin: left top;
    transition: all 1s;
    background: url(../images/needle-ab.png) no-repeat center;
    background-size: 100%, 100%;
    z-index: 1;
    &.playClass {
      transform: rotate(0deg);
    }
  }
  .song-img-warp {
    text-align: center;
    padding-top: 70px;
  }
  .song-img-content {
    display: inline-block;
    text-align: center;
    position: relative;
    background: #ffffff2e;
    border-radius: 100%;
    padding: 5px;
    transition: all 1s;
    animation: rotate365 10s linear infinite;
    animation-play-state:paused;
    &.playClass {
      animation-play-state:running;
    }
  }
  .song-img {
    display: inline-block;
    border-radius: 100%;
    padding: 50px;
    position: relative;
    background: #101012;
    .van-image {
      position: relative;
      z-index: 3;
    }
    &::after {
      content: "asdasd";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 30px;
      background: #ffffff36;
      filter: blur(10px);
      border-radius: 30px;
      z-index: 2;
    }
  }
  .song-introduce {
    color:white;
    margin: 0 30px;
    margin-top: 30px;
  }
  .song-name {
    font-size: 22px;
    margin: 0;
    span{
      font-size: 14px;
      font-weight: normal;
      padding-left: 5px;
    }
  }
}
</style>