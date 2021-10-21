<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <header class='m-header'>
    <ul>
      <li class="cur"> <router-link to="/">推荐</router-link></li>
      <li><router-link to="/like">推荐</router-link></li>
    </ul>
  </header>
</template>

<style scoped lang="scss"> 
  .m-header {
    ul {
      display: flex;
      margin: 1.8vh 0;
      li {
        font-size: 5vw;
        margin:0 1.8vw;
        border-bottom: 3px solid transparent;
      }
    }
    .cur {
      font-weight: bold;
      border-bottom-color: var(--van-primary-color);
    }
  }
</style>
