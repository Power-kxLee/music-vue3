<template>
  <div class="searchHead">
    <van-icon name="arrow-left" />
    <van-search v-model="searchVal"
                shape="round"
                background="none"
                :placeholder="placeholder" />
  </div>
  <article class="hot commonPanel">
    <header>热搜榜</header>
    <ul>
      <li v-for="(item, i) in hotList" :key="item.score" :class="{'top3': i< 3}">
        <span class="num" >{{i+1}}</span>
        {{item.searchWord}}
        
        <van-icon v-if="item.iconType === 1" name="fire" />
      </li>
    </ul>
  </article>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "@axios";
import {
  Search as VanSearch,
  Icon as VanIcon,
  Tab as VanTab,
  Tabs as VanTabs,
} from "vant";
const searchVal = ref("");
const hotList:any = ref([])
const placeholder= ref('请输入搜索关键词')
// 热搜榜
const hot = async () => {
  const {data}:any = await axios.get({
    url: '/search/hot/detail'
  })
  hotList.value = data
}
// 搜索建议
const searchDefault = async () => {
  const {data}:any =  await axios.get({
    url: '/search/default'
  })
  placeholder.value = data.showKeyword
}
const init = () => {
  hot()
  searchDefault()
}
init()
</script>
<style lang="scss" scoped>
.searchHead {
  display: flex;
  ::v-deep(.van-icon-arrow-left) {
    font-size: 24px;
    width: 30px;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  ::v-deep(.van-search) {
    flex: 1;
  }
}
.hot {
  margin: 0 20px;
  header {
    font-weight: bold;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
     flex-wrap: wrap;
     box-shadow: 0px 0px 5px rgb(236, 236, 236);
     border-radius: 10px;
     padding: 10px;
    li {
      width: 50%;
      display: flex;
      font-size: 14px;
      margin-bottom: 5px;
      .van-icon-fire {
        color: #f44336;
        margin-left: 5px;
      }
      &.top3 {
        .num {
          color: #f44336;
          font-weight: bold;
        }
      }
      .num {
        color: rgb(168, 168, 168);
        width: 26px;
        display: block;
      }
    }
  }
}
</style>