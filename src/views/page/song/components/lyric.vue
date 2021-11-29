<template>
  asdsad
</template>
<script setup lang="ts">
import {
  useRoute
} from "vue-router";
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
const emit = defineEmits(['lyric-callback'])
const init = async () => {
  await axios.get({
    url: "/lyric",
    data: {
      id,
    },
  });
  emit('lyric-callback')
}
init()
</script>