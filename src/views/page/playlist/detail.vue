<template>
  <div class="header">

    <van-nav-bar title="歌单"
                 left-arrow
                 @click-left="onClickLeft" />
    <van-skeleton title
                  avatar
                  avatar-size="100px"
                  :row="5"
                  :loading="headLoading" />
    <div v-if="!headLoading"
         class="playListHeader">
      <div class="coverImg">
        <van-image width="100%"
                   height="100%"
                   :src="playListHeader.coverImgUrl" />
      </div>
      <div class="pl-right">
        <h1>{{playListHeader.name}}</h1>
        <div class="creator">
          <div class="creatorImg">
            <van-image width="100%"
                       height="100%"
                       :src="playListHeader.creator.backgroundUrl" />
          </div>
          <span class="creatorName">{{playListHeader.creator.nickname}}</span>
          
        </div>
        <div class="description">
          <span>简介:</span>
          <van-notice-bar :text="playListHeader.description" />
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import axios from "@axios";
import {
  NavBar as VanNavBar,
  Image as VanImage,
  Skeleton as VanSkeleton,
  NoticeBar as VanNoticeBar,
} from "vant";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
const route = useRoute();
const router = useRouter();
console.log("route", route);
interface playHeader {
  coverImgUrl: string;
  name: string;
  description: string;
  creator: {
    backgroundUrl: string;
    nickname: string;
  };
}
let playListHeader = ref<playHeader>({
  coverImgUrl: "",
  name: "",
  description: "",
  creator: {
    backgroundUrl: "",
    nickname: ''
  },
});
let oldParams: any = {
  id: "",
};
let headLoading = ref(true);
const _initDetailData = async (id: string) => {
  const detailData: any = await axios.get({
    url: "/playlist/detail",
    data: {
      id,
    },
  });
  const { playlist } = detailData;
  console.log('playlist', playlist)
  const { coverImgUrl, name, creator, description } = playlist;
  playListHeader.value = {
    coverImgUrl,
    name,
    creator,
    description,
  };
  headLoading.value = false;
};

watch(
  () => route.params,
  (val, oval) => {
    if (route.path.indexOf("/playlist/detail/") < 0) {
      return;
    }
    if (oldParams?.id === val?.id) {
      headLoading.value = false;
      return;
    }
    _initDetailData(val.id as string);
  }
);
onBeforeRouteLeave((to, from) => {
  oldParams = from.params;
  headLoading.value = true;
});

_initDetailData(route.params.id as string);
const onClickLeft = () => {
  router.back();
};
</script>
<style lang="scss" scoped>
.header::v-deep {
  background: linear-gradient(138deg, #333, #b3b3b3);
  .van-nav-bar {
    background: none;
  }
  [class*=van-hairline]::after {
    content: none;
  }
  .van-nav-bar__title {
    font-size: 16px;
    color: white;
    font-weight: bold;
  }
  .van-nav-bar .van-icon {
    color: white;
    font-size: 18px;
  }
}
.playListHeader::v-deep {
  display: flex;
  .coverImg {
    height: 130px;
    width: 130px;
    padding: 0 20px
  }
  .pl-right {
    width: calc(100vw - 150px);
    display: flex;
    align-content: flex-end;
    h1 {
      font-size: 18px;
      color: white;
      font-weight: normal;
      margin: 0px;
    }
    .creator {
      display: flex;
      .creatorImg {
        width: 20px;
        height: 20px;
        overflow: hidden;
        border-radius: 100%;
      }
      .creatorName {
        color: white;
        line-height: 20px;
        padding-left: 5px;
      }
    }
  }
}
</style>