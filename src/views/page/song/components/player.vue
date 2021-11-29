<template>
  
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
import axios from "@axios";
const route = useRoute();
const emit = defineEmits(['player-callback'])
const id = route.params.id;
const init = async () => {
  await axios.get({
      url: "/song/url",
      data: {
        id,
      },
    });
  emit('player-callback')
}
init()
</script>