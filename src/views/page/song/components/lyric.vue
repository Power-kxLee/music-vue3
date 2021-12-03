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
    <div class="lyricDetail" ref="lyricDetailDom">
      <ul>
        <li :class="{'cur': item.s === hcurLi}" v-for="item in lyricDetail" :key="item.s" >
          {{item.lyric}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watch, computed} from 'vue'
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
const emit = defineEmits(["lyric-callback"]);
const _title:any = ref({})
const store = useStore();
const lyricDetail:any = ref([])
const curLi:any = ref({})
const lyricDetailDom:any = ref(null)
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
  data.lrc.lyric.split("\n").forEach((element: any, i:number) => {
    if (element.length < 1) {
      return false;
    }
    const time = element.match(/[\[\0-9:0-9.0-9\]]+/)[0];
    const newTime = time.replace(/(\[|\])+/g, "");
    const lyric = element.replace(time, ""); // 获取当前歌词
    const s = (newTime.split(":")[0] * 60 + newTime.split(":")[1] * 1).toFixed(2); // 获取歌词对应
    lyricData.push({
      i,
      s,
      lyric,
    });
  });
  data.lyricData = lyricData;
  lyricDetail.value = lyricData
  emit("lyric-callback", data);
  store.commit("update", {
    key: "lyric",
    value: data,
  });
};
init();

// 监听播放进度条 返回秒
watch(() => store.state.playTime, (val) => {
  if (lyricDetail.value.length > 0 ) {

      const time = val.toFixed(2)
      const d = lyricDetail.value.find((value:any) => {
        if (Number(time) < Number(value.s) ) {
          return value
        }
      })
      try {
        if (curLi.value.s !== d.s) {
          curLi.value = {
            s: d.s,
            i: d.i
          }
        }
      } catch(e) {

      }

  }
})


const hcurLi = computed(() => {
  // 根据进度条去滚动到对应的字幕
  const liDom:any = document.querySelectorAll('.lyricDetail li')[curLi.value.i]
  if (liDom) {
    const _parent = liDom.offsetParent
    lyricDetailDom.value.scrollTop = liDom.offsetTop - _parent.offsetHeight / 2
  }
  return curLi.value.s
})


</script>
<style scoped lang="scss">
  .lyric-content {
    color: #ededed;
    margin: 0 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    h4 ,h5{
      margin: 0px
    }
    h4 {
      margin-bottom: 10px;
    }
    h5 {
      font-size: 14px;
    }
    .lyric-title {
      margin-bottom: 20px;
    }
    .lyricDetail {
      overflow: auto;
      height: calc(100vh - 72px - 68px - 40px - 44px);

      li {
        margin-bottom: 20px;
        text-shadow: 0px 3px 3px #c3c3c3;
        &.cur {
          color: #e91e63;
          font-size: 18px;
        }
      }
    }
  }
</style>