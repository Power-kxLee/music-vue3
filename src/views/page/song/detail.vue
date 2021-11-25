<template>
  <van-tabs v-model:active="active"
            swipeable>
    <van-tab title="歌曲">
      12
    </van-tab>
    <van-tab title="歌词">
      33
    </van-tab>
  </van-tabs>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import { Tab as vanTab, Tabs as vanTabs } from "vant";
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
const active = ref(0);
axios.get({
  url: "/song/url",
  data: {
    id,
  },
});
axios.get({
  url: "/song/detail",
  data: {
    ids: id,
  },
});
axios.get({
  url: "/lyric",
  data: {
    id,
  },
});
</script>
