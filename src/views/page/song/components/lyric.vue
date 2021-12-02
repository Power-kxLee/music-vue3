<template>
  <div class="lyric-content">
    <div class="lyric-title">
      <h4>{{_title.name}}</h4>
      <h5 class="creation">
        <span v-for="item in _title.ar" :key="item.id">
          {{item.name}}
        </span>
      </h5>
    </div>
    <div class="lyricDetail">
      <ul>
        <li v-for="item in lyricDetail" :key="item.s">
          {{item.lyric}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
const emit = defineEmits(["lyric-callback"]);
const _title:any = ref({})
const store = useStore();
const lyricDetail:any = ref([])
watch(() => store.state.songDetail, (val) => {
  _title.value = {..._title.value, ...val}
  console.log( _title.value )
})

const init = async () => {

  const data: any = await axios.get({
    url: "/lyric",
    data: {
      id,
    },
  });
  let lyricData: any = [];
  // 整理歌词 变成一个josn
  data.lrc.lyric.split("\n").forEach((element: any) => {
    if (element.length < 1) {
      return false;
    }
    const time = element.match(/[\[\0-9:0-9.0-9\]]+/)[0];
    const newTime = time.replace(/(\[|\])+/g, "");
    const lyric = element.replace(time, ""); // 获取当前歌词
    const s = (newTime.split(":")[0] * 60 + newTime.split(":")[1] * 1).toFixed(
      2
    ); // 获取歌词对应
    lyricData.push({
      s,
      lyric,
    });
  });
  lyricDetail.value = lyricData
  data.lyricData = lyricData;
  emit("lyric-callback", data);
  store.commit("update", {
    key: "lyric",
    value: data,
  });
};
init();
</script>