<template>
  <div class="songCpt">
    <div class="song-switch-img"></div>
    <div class="song-img-warp">
      <div class="song-img-content">
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

      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref,watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "@axios";
import { Image as VanImage } from "vant";
import { match } from "assert";
const route = useRoute();
const store = useStore()
const id = route.params.id;
let songImg = ref("");
let songObj: any = ref({});
let lyricData:any = {}
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
  songObj.value = {
    name: songs.name,
    ar: songs.ar,
    al: songs.al,
    alName: songs.al.name
  };
  emit('get-data', songs)
  songImg.value = songs.al.picUrl;
};

// 监听歌词返回
watch(() => store.state.lyric, (val) => {
  // 整理歌词 变成一个josn
  val.lrc.lyric.split('\n').forEach(element => {
    if (element.length < 1) {
      return false
    }
    const time = element.match(/[\[\0-9:0-9.0-9\]]+/)[0]
    const newTime = time.replace(/(\[|\])+/g, '')
    const lyric = element.replace(time,'') // 获取当前歌词
    const s = (newTime.split(':')[0]*60 + newTime.split(':')[1] * 1).toFixed(2) // 获取歌词对应的世界
    lyricData[s] = lyric
  });
})

// 监听播放进度条 返回秒
watch(() => store.state.playTime, (val) => {
  
  console.log(val)
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
  .song-switch-img {
    width: 83px;
    height: 134px;
    position: absolute;
    top:5px;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 30px;
    background: url(../images/needle-ab.png) no-repeat center;
    background-size: 100%, 100%;
    z-index: 1;
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
    transform: rotate(0deg);
    animation: rotate365 10s linear infinite;
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