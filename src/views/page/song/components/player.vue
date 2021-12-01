<template>
  <audio id="songAudio" ref="audioDom" :src="audioSrc" muted controls @timeupdate="timeupdate"></audio>
</template>
<script setup lang="ts">
import { ref,nextTick } from "vue";
import { useStore } from "vuex";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import axios from "@axios";
const store = useStore()
const route = useRoute();
const emit = defineEmits(['player-callback'])
const id = route.params.id;
let audioSrc = ref('')
let audioDom:any = ref(null)
let playbtn = ref(null)
const init = async () => {
  const {data}:any = await axios.get({
      url: "/song/url",
      data: {
        id,
      },
    });
  audioSrc.value = data[0].url
  emit('player-callback')
  const _audio:any = audioDom.value
 
}

init()
const timeupdate = (vid:any) => {
  store.commit('update', {
    key: 'playTime',
    value: audioDom.value.currentTime
  })
}

</script>
<style scoped lang="scss">
.playbtn {
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index: 99;
}
</style>