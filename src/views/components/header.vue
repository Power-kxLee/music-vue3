
<template>
  <header class='m-header'>
    <ul>
      <li v-for="item in data" :key="item.to" :class="{'cur': route.path === item.to }"> 
        <router-link :to="item.to">{{item.name}}</router-link>
      </li>
    </ul>
    <van-search class="search" v-model="searchVal" background="none" @focus="focusSearch" placeholder="请输入搜索关键词" shape="round" />
  </header>
</template>

<script setup lang="ts">
import {Search as VanSearch } from 'vant'
import { ref, reactive, watch } from 'vue'
import {useStore} from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
const searchVal = ref('')
interface Hdata {
  [item:string]: {
    to: string,
    name: string
  }
}
let data = ref<[] | Hdata>([])
data.value = store.state.tabbarData
watch(() => store.state.tabbarData, (val) => {
  data.value = val
})

const focusSearch = () => {
  router.push({path: '/search'})
}
</script>
<style scoped lang="scss"> 
  .m-header {
    ul {
      display: flex;
      padding: 10px 0;
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
    ::v-deep(.search) {
      .van-search__content {
        border: 1px solid #e7e7e7;
      }
    }
  }
</style>
