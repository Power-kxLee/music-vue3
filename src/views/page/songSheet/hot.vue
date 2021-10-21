<template>
  热门歌单 111
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
      console.log(1113123)
    })
  }
});
</script>
