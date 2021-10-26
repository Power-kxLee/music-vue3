
<template>
  <header class='m-header'>
    <ul>
      <li v-for="item in data" :key="item.to" :class="{'cur': route.path === item.to }"> 
        <router-link :to="item.to">{{item.name}}</router-link>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import {useStore} from 'vuex'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
let data = ref([])
data.value = store.state.tabbarData
watch(() => store.state.tabbarData, (val) => {
  console.log(val)
  data.value = val
})

</script>
<style scoped lang="scss"> 
  .m-header {
    ul {
      display: flex;
      margin: 1.8vh 0;
      li {
        font-size: var(--headerSize);
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
