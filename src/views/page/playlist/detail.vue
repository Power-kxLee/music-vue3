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
  <div class="main">
    <van-skeleton title
                  :row="20"
                  :loading="songLoading">
      <van-list v-model:loading="loading"
                :finished="finished"
                @load="onload">

        <div class="song-content">
          <ul class="song-list">
            <li class="song-item"
                v-for="(item, i) in songList"
                :key="item.id">
              <b class="song-index">{{Number(i) + 1}}</b>
              <div class="song-item-right">
                <h4 class="song-name">
                  <span> {{item.name}} </span>
                  <span v-if="item.alia[0]">({{item.alia[0]}})</span>
                </h4>
                <p class="singer">
                  <span class="sq"
                        v-if="[1,2].includes(item.no) ">SQ</span>
                  <span>{{item.ar[0].name}} - {{item.al.name}}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </van-skeleton>
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
  List as VanList,
} from "vant";
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
} from "vue-router";
const route = useRoute();
const router = useRouter();
interface playHeader {
  coverImgUrl: string;
  name: string;
  description: string;
  commentCount: string;
  playCount: number;
  shareCount: string;
  creator: {
    backgroundUrl: string;
    nickname: string;
  };
}
let defHead = {
  coverImgUrl: "",
  name: "",
  description: "",
  playCount: 0,
  shareCount: "",
  commentCount: "",
  creator: {
    backgroundUrl: "",
    nickname: "",
  },
};
let playListHeader = ref<playHeader>(defHead);
let oldParams: any = {
  id: "",
};
let headLoading = ref(true);
let songLoading = ref(false);
interface songList {
  [item: string]: {
    id: string;
    copyright: number;
    cp: number;
    fee: number;
    no: number;
    al: {
      id: string;
      name: string;
    };
    alia: {
      [item: string]: {};
    };
    ar: {
      [item: string]: {
        name: string;
      };
    };
    name: string;
  };
}
let songList = ref<[] | songList>([]);

const loading = ref(false);
const finished = ref(false);
const onload = () => {
  console.log(page.value)
  // const { songs } = await getSong(songId);
  // songList.value = songs;
  loading.value = true
};
let page = ref({})
// 初始化歌单详情
const _initDetailData = async (id: string) => {
  const detailData: any = await axios.get({
    url: "/playlist/detail",
    data: {
      id,
    },
  });
  const { playlist } = detailData;
  const {
    coverImgUrl,
    name,
    creator,
    description,
    playCount,
    commentCount,
    shareCount,
  } = playlist;
  playListHeader.value = {
    coverImgUrl,
    commentCount,
    name,
    creator,
    description,
    shareCount,
    playCount,
  };
  headLoading.value = false;
  return playlist;
};

// 根据ids 去获取对应的歌
const getSong = async (ids: string) => {
  if (ids.length < 1) {
    return;
  }
  const detailData: any = await axios.get({
    url: "/song/detail",
    data: {
      ids,
    },
  });
  songLoading.value = false;
  return detailData;
};

// 处理trackIds数组 转成一个字符串
const handlerids = (ids: any) => {
  let songId: any = [];
  ids.forEach((item: any) => {
    songId.push(item.id);
  });
  return songId.join(",");
};

// 按着20个整理分组
const handlerPage = (list:any, num:number) => {
  let i = 0
  let _key = 0
  let _arr:any =  []
  let _obj:any = {}

  list.forEach((item:any) => {
    i++ 
    _arr.push(item)
    if (i === num) {
      i = 0
      _obj[_key] = _arr
      _key++
      _arr = []
    }
  })
  _obj[_key] = _arr
  return _obj
}
const initData = async (id: string) => {
  // 获取歌单详情
  const playlist = await _initDetailData(id);
  // 把trackIds数组的id 整成字符串 xxx,xxx
  
  const songId = handlerids(playlist.trackIds);
  page = handlerPage(playlist.trackIds, 20)
  // 获取歌列表
  // const { songs } = await getSong(songId);
  // songList.value = songs;
};

// 监听入参有没有变化
watch(
  () => route.params,
  (val, oval) => {
    if (route.path.indexOf("/playlist/detail/") < 0) {
      return;
    }

    // 判断是不是重复进来的歌单 如果是重复的 就不去获取接口 直接显示
    if (oldParams?.id === val?.id) {
      headLoading.value = false;
      songLoading.value = false;
      return;
    }
    headLoading.value = true;
    songLoading.value = true;
    playListHeader.value = defHead;
    songList.value = [];
    initData(val.id as string);
  }
);
onBeforeRouteLeave((to, from) => {
  oldParams = from.params;
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
.main::v-deep {
  .song-item {
    display: flex;
    padding-bottom: 20px;
    &:first-child {
      margin-top: 20px;
    }
    &:active {
      background: #f7f7f7;
    }
    .song-index {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45px;
      color: #b4b4b4;
      font-size: 18px;
      font-weight: normal;
    }
    .song-item-right {
      flex: 1;
    }
    .song-name {
      margin: 10px 0;
      margin-bottom: 5px;
      font-size: 16px;
    }
    .singer {
      margin: 0;
      color: #878787;
      display: flex;
      .sq {
        color: #f07473;
        font-size: 12px;
        height: 13px;
        border: 1px solid #f39897;
        background: #fff2f2;
        border-radius: 3px;
        padding: 0 2px;
        transform: scale(0.8);
        display: block;
        margin-top: 3px;
        margin-right: 3px;
      }
    }
  }
}
</style>