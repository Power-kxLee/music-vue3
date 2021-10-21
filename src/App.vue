<script setup lang="ts">
  import mFooter from '@/views/components/footer.vue'
  import mHeader from '@/views/components/header.vue'
</script>
<template>
  <m-header></m-header>
  <router-view></router-view>
  <m-footer></m-footer>
</template>