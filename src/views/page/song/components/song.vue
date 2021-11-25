<template>
  <div class="songCpt">
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
      <h4 class="song-name">{{songObj.name}}</h4>
      <p>
        <span v-for="(item,i ) in songObj.ar" :key="item.id">
          {{item.name}}{{i!== songObj.ar.length - 1 && '/'}}
        </span>
        - 
        <span>{{songObj.al.name}}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "@axios";
import { Image as VanImage } from "vant";
const route = useRoute();
const id = route.params.id;
let songImg = ref("");
let songObj: any = ref({});
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
  console.log(songs);
  songObj.value = {
    name: songs.name,
    ar: songs.ar,
    al: songs.al,
  };
  songImg.value = songs.al.picUrl;
};
init();
</script>
<style lang="scss" scoped>
.songCpt::v-deep {
  @keyframes rotate365 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(365deg);
    }
  }
  .song-img-warp {
    text-align: center;
  }
  .song-img-content {
    display: inline-block;
    text-align: center;
    position: relative;
    background: #ffffff2e;
    border-radius: 100%;
    padding: 5px;
    transform: rotate(0deg);
    animation: rotate365 5s linear infinite;
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
}
</style>