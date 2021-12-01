<template>
  asdsad
</template>
<script setup lang="ts">
import {
  useRoute
} from "vue-router";
import {
  useStore
} from 'vuex'
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
const emit = defineEmits(['lyric-callback'])
const init = async () => {
const store = useStore()
const data =  await axios.get({
    url: "/lyric",
    data: {
      id,
    },
  });
  emit('lyric-callback', data)
  store.commit('update', {
    key: 'lyric',
    value: data
  })
}
init()
</script>