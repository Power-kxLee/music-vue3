<template>
  <div class="searchHead">
    <van-icon name="arrow-left" />
    <van-search v-model="searchVal"
                shape="round"
                background="none"
                :placeholder="placeholder"
                @update:model-value="updateSearch" />
  </div>
  <div class="searchStatus"
       v-show="searchStatus">
    <van-loading v-show="searchResLoading"
                 type="spinner"
                 size="16px" />
    <van-cell-group v-show="!searchResLoading">
      <van-cell v-for="item in searchSuggest"
                :key="item.feature">
        <template #title>
          <van-icon name="search" /> <span class="keyword">{{searchVal}}</span><span>{{item.keyword.replace(new RegExp(searchVal), '')}}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
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
import { debounce } from "@js/common";
const searchVal = ref("");
const hotList: any = ref([]);
const placeholder = ref("请输入搜索关键词");
const searchResLoading = ref(true);
const searchStatus = computed(() => {
  return searchSuggest.value.length > 0;
});
const searchSuggest: any = ref([]); // 搜索的建议结果

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
     searchSuggest.value = [{
       feature: '暂无',
       keyword: '匹配失败哦'
     }]
     return
  }
  const { allMatch } = result;
  searchSuggest.value =
    !searchVal.value || searchVal.value.length === 0 ? [] : allMatch;
  
};

const updateSearch = async (val: any) => {
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