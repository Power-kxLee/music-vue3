<template>
  like
</template>
<script setup lang="ts">
import {getCurrentInstance,onBeforeMount} from "vue";
const instance = getCurrentInstance();
const _global = instance?.appContext.config.globalProperties;
const { get } = _global?.axios;
onBeforeMount(async () => {
  const data = await get({
    url: "/search",
    data: {
      keywords: "海阔天空",
    },
  });
  console.log(data);
});
</script>
