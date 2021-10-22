<template>
  推荐
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance,onBeforeMount } from "vue";
import { Button } from "vant";
export default defineComponent({
  components: {
    [Button.name]: Button,
  },
  setup() {
    const instance = getCurrentInstance();
    const _global = instance?.appContext.config.globalProperties;
    const { get } = _global?.axios;
    onBeforeMount(async() => {
      const data = await get({
        url: "/search",
        data: {
          keywords: "海阔天空",
        },
      });
      console.log(data);
    })
  }
});
</script>
