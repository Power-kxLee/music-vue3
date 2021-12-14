<template>
  <div class="play-control">
    <div class="paly-slider">
      <van-slider v-model="speed"
                  active-color="#ee0a24"
                  @change="changeSpeed">
        <template #button>
          <div class="custom-button"></div>
        </template>
      </van-slider>
    </div>
    <div class="control">
      <van-icon name="" />

      <div class="playBtn"
           @click="palySong">
        <van-icon :name="iconName" />
      </div>
    </div>
    <audio id="songAudio"
           ref="audioDom"
           :src="audioSrc"
           @timeupdate="timeupdate"></audio>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useStore } from "vuex";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import axios from "@axios";
import { Slider as vanSlider, Icon as vanIcon } from "vant";
const palyState = ref(false); // 是否已经播放 默认是否
const iconName = ref("play-circle-o");
const speed = ref(0);
const store = useStore();
const route = useRoute();
const emit = defineEmits(["player-callback"]);
const id = route.params.id;
let audioSrc = ref("");
let audioDom: any = ref(null);
let playbtn = ref(null);
let duration = ref(0);
const changeSpeed = (value: any) => {
  const b = value / 100; // 当前进度的百分百
  const s = b * duration.value; // 换算成秒
  audioDom.value.currentTime = s;
};

const init = async () => {
  const { data }: any = await axios.get({
    url: "/song/url",
    data: {
      id,
    },
  });
  audioSrc.value = data[0].url;
  emit("player-callback");
};
nextTick(() => {});
init();
// 监听播放音频的进度
const timeupdate = (vid: any) => {
  // 获得总长度
  const currentTime = audioDom.value.currentTime;
  // 实时更新进度条
  speed.value = (currentTime / duration.value) * 100;

  // 实时保存当前播放到多少秒
  store.commit("update", {
    key: "playTime",
    value: currentTime,
  });
};

// 播放音乐按钮
const palySong = () => {
  // 播放音乐
  palyState.value = !palyState.value;
  if (palyState.value) {
    // 播放
    audioDom.value.play();
    iconName.value = "pause-circle-o";
  } else {
    audioDom.value.pause(); // 暂停
    iconName.value = "play-circle-o";
  }
  store.commit("update", {
    key: "palyState",
    value: palyState.value,
  });
  // 获取音乐的长度
  duration.value = audioDom.value.duration;
};
</script>
<style scoped lang="scss">
.play-control {
  margin: 20px 0;
  .control {
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
  .playBtn {
    .van-icon {
      font-size: 60px;
      color: white;
    }
  }
  .paly-slider {
    margin: 0 20px;
  }
  .custom-button {
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 100%;
  }
}
</style>