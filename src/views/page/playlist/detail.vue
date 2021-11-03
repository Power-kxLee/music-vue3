<template>
  <div class="header">

    <van-nav-bar title="歌单"
                 left-arrow
                 @click-left="onClickLeft" />
    <van-skeleton title
                  avatar
                  avatar-size="100px"
                  :row="4"
                  :loading="headLoading" />
    <div v-if="!headLoading">

      <div class="playListHeader">
        <div class="coverImg">
          <van-image width="100%"
                     height="100%"
                     :src="playListHeader.coverImgUrl" />
        </div>
        <div class="pl-right">
          <h1>{{playListHeader.name}}</h1>
          <div class="creator ">
            <div class="creatorImg">
              <van-image width="100%"
                         height="100%"
                         :src="playListHeader.creator.backgroundUrl" />
            </div>
            <span class="creatorName">{{playListHeader.creator.nickname}}</span>

          </div>
          <div class="description">
            <span class="description-name">简介:</span>
            <van-notice-bar :text="playListHeader.description" />
            <van-icon name="arrow" />
          </div>

        </div>
      </div>
      <div class="header-util">
        <div>
          <van-icon name="like-o" />
          <span>{{(playListHeader.playCount  /10000) ^ 0 }}万</span>
        </div>
        <div>
          <van-icon name="smile-comment-o" />
          <span>{{playListHeader.commentCount}}</span>
        </div>
        <div>
          <van-icon name="guide-o" />
          <span>分享{{playListHeader.shareCount}}</span>
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
  Icon as VanIcon,
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
  commentCount: string;
  playCount: number,
  shareCount: string,
  creator: {
    backgroundUrl: string;
    nickname: string;
  };
}
let playListHeader = ref<playHeader>({
  coverImgUrl: "",
  name: "",
  description: "",
  playCount: 0,
  shareCount: '',
  commentCount: '',
  creator: {
    backgroundUrl: "",
    nickname: "",
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
  console.log("playlist", playlist);
  const { coverImgUrl, name, creator, description, playCount ,commentCount, shareCount} = playlist;
  playListHeader.value = {
    coverImgUrl,
    commentCount,
    name,
    creator,
    description,
    shareCount,
    playCount
  };
  headLoading.value = false;
};

const initData = (id: string) => {
  _initDetailData(id);
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
    initData(val.id as string);
  }
);
onBeforeRouteLeave((to, from) => {
  oldParams = from.params;
  headLoading.value = true;
});

initData(route.params.id as string);
const onClickLeft = () => {
  router.back();
};
</script>
<style>
:root {
  --whiteColor: white;
}
</style>
<style lang="scss" scoped>
.header::v-deep {
  background: linear-gradient(138deg, #ee9ae5, #5961f9);
  // background: linear-gradient(138deg, #FFF5C3, #9452A5);
  .van-nav-bar {
    background: none;
  }
  [class*="van-hairline"]::after {
    content: none;
  }
  .van-nav-bar__title {
    font-size: 16px;
    color: var(--whiteColor);
    font-weight: bold;
  }
  .van-nav-bar .van-icon {
    color: var(--whiteColor);
    font-size: 18px;
  }
}
.playListHeader::v-deep {
  display: flex;
  padding-bottom: 20px;
  .coverImg {
    height: 130px;
    width: 130px;
    padding: 0 20px;
  }
  .pl-right {
    width: calc(100vw - 150px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-size: 18px;
      color: var(--whiteColor);
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
        color: var(--whiteColor);
        line-height: 20px;
        padding-left: 5px;
      }
    }
  }
  .description {
    display: flex;
    .description-name {
      color: var(--whiteColor);
      line-height: 20px;
    }
    .van-notice-bar {
      flex: 1;
      height: 20px;
      line-height: 20px;
      background: none;
      color: var(--whiteColor);
      padding-left: 5px;
      .van-notice-bar__wrap {
        color: var(--whiteColor);
      }
    }
    .van-icon-arrow {
      line-height: 20px;
      color: var(--whiteColor);
      right: 4px;
    }
  }
}
.header-util::v-deep {
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  padding-bottom: 10px;
  div {
    display: flex;
    .van-icon {
      font-size: 18px;
      color: var(--whiteColor);
      line-height: 22px;
    }
    span {
      color: var(--whiteColor);
      line-height: 24px;
      padding-left: 5px;
    }
  }
}
</style>