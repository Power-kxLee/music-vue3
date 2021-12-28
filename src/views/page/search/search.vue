<template>
  <div class="searchBox">

    <div class="searchHead">
      <van-icon name="arrow-left"
                @click="router.go(-1)" />
      <van-search v-model="searchVal"
                  shape="round"
                  background="none"
                  :placeholder="placeholder"
                  @search="querySearch(searchVal)"
                  @update:model-value="updateSearch" />
    </div>
    <div class="bodys">

      <router-view></router-view>
      <template v-if="route.name==='search'">

        <!-- 搜索输入文字过程显示的内容 -->
        <div class="searchStatus"
             v-show="searchStatus">
          <van-loading v-show="searchResLoading"
                       type="spinner"
                       size="16px" />
          <van-cell-group v-show="!searchResLoading">
            <van-cell v-for="item in searchSuggest"
                      :key="item.feature"
                      is-link
                      @click="querySearch(item.keyword)">
              <template #title>
                <van-icon name="search" /> <span class="keyword">{{searchVal}}</span><span>{{item.keyword.replace(new RegExp(searchVal), '')}}</span>
              </template>
              <template #right-icon></template>
            </van-cell>
          </van-cell-group>
        </div>
        <!-- 没有搜索显示的内容 -->
        <div v-show="!searchStatus">

          <article class="hot commonPanel"
                   v-if="hotList.length > 0">
            <header>热搜榜</header>
            <ul>
              <li v-for="(item, i) in hotList"
                  :key="item.score"
                  :class="{'top3': i< 3}">
                <span class="num">{{i+1}}</span>
                {{item.searchWord}}

                <van-icon v-if="item.iconType === 1"
                          name="fire" />
              </li>
            </ul>
          </article>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "@axios";
import {
  Search as VanSearch,
  Icon as VanIcon,
  Tab as VanTab,
  Tabs as VanTabs,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Loading as VanLoading,
} from "vant";
import { debounce, c_loading } from "@js/common";
import { useRouter, useRoute } from "vue-router";
import { match } from "assert";
import resultPage from "./searchResult.vue";
const searchVal = ref("");
const hotList: any = ref([]);
const placeholder = ref("请输入搜索关键词");
const searchResLoading = ref(true);
const router = useRouter();
const route = useRoute();
const searchResult = ref([]); // 搜索的结果
const searchStatus = computed(() => {
  return searchSuggest.value.length > 0;
});
const searchSuggest: any = ref([]); // 搜索的建议结果
console.log("route", route);
// 热搜榜
const hot = async () => {
  const { data }: any = await axios.get({
    url: "/search/hot/detail",
  });
  hotList.value = data;
};
// 搜索默认热门关键词
const searchDefault = async () => {
  const { data }: any = await axios.get({
    url: "/search/default",
  });
  placeholder.value = data.showKeyword;
};

// 搜索建议
const searchRes = async (val: any) => {
  searchResLoading.value = true;
  const { result }: any = await axios.get({
    url: "/search/suggest",
    data: {
      keywords: val,
      type: "mobile",
      limit: 10,
    },
  });
  searchResLoading.value = false;
  if (Object.keys(result).length < 1) {
    searchSuggest.value = [
      {
        feature: "暂无",
        keyword: "匹配失败哦",
      },
    ];
    return;
  }
  const { allMatch } = result;
  searchSuggest.value =
    !searchVal.value || searchVal.value.length === 0 ? [] : allMatch;
};
interface comD {
  result: {
    songs: [];
  };
}

// 去搜索
const querySearch = async (keywords: string) => {
  router.push({
    path: `/search/result/${keywords}`,
  });
  // const loading = c_loading('努力的搜索中🏃‍♂️🏃‍♂️🏃‍♀️...')

  // const data = <comD>await axios.get({
  //   url: '/search',
  //   data: {
  //     keywords
  //   }
  // })
  // const {songs} = data.result
  // searchResult.value = songs
  // loading.clear()
};

const updateSearch = async (val: any) => {
  router.push({
    path: "/search",
  });
  // 清空搜索结果数据
  searchResult.value = [];
  if (!searchVal.value || searchVal.value.length === 0) {
    // 清空搜索建议
    searchSuggest.value = [];
    return;
  }
  debounce(searchRes, 100)(val);
};
const init = () => {
  hot();
  searchDefault();
};
init();
</script>
<style lang="scss" scoped>
.searchBox{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  .bodys {
    flex: 1;
    overflow: auto;
  }
}
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
.keyword {
  color: rgb(138, 138, 138);
}
.searchStatus {
  ::v-deep(.van-loading) {
    text-align: center;
    padding: 10px 0;
  }
}
</style>