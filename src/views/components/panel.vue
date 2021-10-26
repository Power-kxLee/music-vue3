<template>
  <div class='m-panel' ref="panel">
    <h4 v-if="name"
        class="m-panel-name">{{name}}</h4>
    <div class="m-panel-content">
      <slot ref="panelRef"></slot>

    </div>
  </div>
</template>
<script setup lang='ts'>
import {ref,defineExpose, onMounted} from 'vue'
const props = defineProps({
  name: String,
});
const panel = ref(null)
const panelRef = ref(null)
defineExpose({
  panel,
  panelRef
})
</script>
<style lang="scss" scoped>
.m-panel-name {
  font-size: 4.5vw;
  margin-left: 2.5vw;
}
.m-panel-content {
  margin:0 2.5vw;
}
</style>