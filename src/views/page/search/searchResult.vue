<template>
  <article>
    <div>
      <header class="title">单曲</header>
      <van-cell-group>
        <van-cell v-for="item in searchResult"
                  :key="item.id"
                  is-link
                  @click="gosongDetial(item.id)">
          <template #title>
            <div class="box">
              <h5 class="songName">
                <span class="keyword">
                  {{route.params.keyword}}
                </span>
                <span>
                  {{item.name.replace(new RegExp(route.params.keyword), '')}}
                </span>
              </h5>
              <div class="creator">
              <div class="iconList">
                <span v-if="item.album.status <= -1"
                      class="oa-icon">原创</span>
                <span v-if="item.album.status <= 0"
                      class="sq-icon">SQ</span>
              </div>
              <span>{{handleArtistsName(item.artists)}}</span>
              <span>-</span>
              <span>{{item.album.name}}</span>
              </div>
            </div>
          </template>
          <template #right-icon></template>
        </van-cell>
      </van-cell-group>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { c_loading } from "@js/common";
import axios from "@axios";
import { Cell as VanCell, CellGroup as VanCellGroup } from "vant";
const route: any = useRoute();
const router: any = useRouter();
const searchResult: any = ref([]);
console.log(route.params.keyword);

const updateSearch = () => {};
interface comD {
  result: {
    songs: [];
  };
}
const gosongDetial = (id:string) => {
  router.push({
    path: '/song/detail/'+id
  })
}
const handleArtistsName = (arr: any[]): string => {
  const newArr: any[] = [];
  arr.forEach((item) => {
    newArr.push(item.name);
  });
  return newArr.join("/");
};
const init = async () => {
  const loading = c_loading("努力的搜索中🏃‍♂️🏃‍♂️🏃‍♀️...");
  const keywords = route.params.keyword;
  const data = <comD>await axios.get({
    url: "/search",
    data: {
      keywords,
    },
  });
  const { songs } = data.result;
  searchResult.value = songs;
  loading.clear();
};
init();
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 10px 10px;
}
.box {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 40px);
}
.creator {
  display: flex;
  color: #9e9e9e;
  .iconList {
    margin-top: 3px;
    display: flex;
  }
}
.songName {
  font-weight: normal;
  font-size: 16px;
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  .keyword {
    color: #2196f3;
  }
}
</style>