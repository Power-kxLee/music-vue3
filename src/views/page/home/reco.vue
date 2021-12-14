<template>
  <div id="reco">
    <m-panel>
      <van-skeleton :row="5"
                    :loading="bannerLoading">
        <van-swipe :autoplay="5000"
                   lazy-render
                   class="my-swipe">
          <van-swipe-item v-for="val in images"
                          :key="val.bannerId">
            <van-image width="100%"
                       height="100%"
                       :src="val.pic" />
            <span class="tis-label"
                  :class="val.titleColor">{{val.typeTitle}}</span>
          </van-swipe-item>
        </van-swipe>
      </van-skeleton>
    </m-panel>
    <div></div>
    <m-panel name="网友精选歌单">
      <van-skeleton :row="5"
                    :loading="musicLoading">
        <van-swipe :loop="false"
                   :width="songWidth"
                   :show-indicators="false"
                   class="song-sheet-swipe">
          <van-swipe-item v-for="(item, i) in songList"
                          :key="i">
            <div class="song-content">
              <div class="song-box"
                   @click="goPlayList(val)"
                   v-for="val in item"
                   :key="val.userId">
                <van-image class="coverImgUrl"
                          fit="cover"
                           :src="val.coverImgUrl" />
                <span class="playCount">
                  <van-icon name="play"
                            color="white" />
                  {{ Math.floor(val.playCount/ 10000)  }}万
                </span>
                <div class="name">{{val.name}}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </van-skeleton>
    </m-panel>
  </div>
</template>
<script setup lang="ts">
import mPanel from "@components/panel.vue";
import {
  Swipe as vanSwipe,
  SwipeItem as vanSwipeItem,
  Skeleton as vanSkeleton,
  Image as VanImage,
  Icon as VanIcon,
} from "vant";
import { onBeforeMount, onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "@axios";
interface Images {
  [val: string]: {
    bannerId: string;
    pic: string;
    titleColor: string;
    typeTitle: string;
  };
}
interface SongList {
  [item: string]: {
    [val: string]: {
      userId: string;
      coverImgUrl: string;
      playCount: number;
      name: string;
    };
  };
}
let images = ref<[] | Images>([]);
let songList = ref<SongList>({});
let bannerLoading = ref(true);
let musicLoading = ref(true);
const router = useRouter();
let songWidth = ref(document.body.clientWidth - 40);

const goPlayList = (val: any) => {
  router.push({ path: `/playlist/detail/${val.id}` });
};

onBeforeMount(async () => {
  const bannerFun = async () => {
    const { banners }: any = await axios.get({
      url: "/banner",
      data: {
        type: "2",
      },
    });
    bannerLoading.value = false;
    images.value = banners;
  };

  const playlistsFun = async () => {
    const { playlists }: any = await axios.get({
      url: "/top/playlist/highquality",
      data: {
        limit: "12",
        order: "hot",
      },
    });
    musicLoading.value = false;

    songList.value = {
      [1]: playlists.slice(0, 6),
      [2]: playlists.slice(6, 12),
    };
  };
  bannerFun();
  playlistsFun();
});

onMounted(() => {});
</script>
<style lang="scss" scoped>
#reco{
  ::v-deep(.my-swipe) {
    overflow: hidden;
    border-radius: 5px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 20vh;
      text-align: center;
      img {
        height: 100%;
      }
      .tis-label {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 2px 10px;
        z-index: 1;
        border-radius: 10px;
        font-size: var(--minFontSize);
      }
      .red {
        background: #f15151;
      }
      .blue {
        background: #5a5aff;
      }
    }
  }
  ::v-deep(.song-sheet-swipe) {
    .van-swipe-item {
      height: 40vh;
    }
    .song-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
    .song-box {
      flex-basis: 32%;
      margin-bottom: 5px;
      .coverImgUrl {
        width: 100%;
        img,
        .van-image__error {
          width: 100%;
          height: 12vh;
        }
        .van-image__error {
          position: relative;
        }
      }
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 38px;
        line-height: 19px;
      }
      .playCount {
        position: relative;
        top: -10px;
        background: #8e9db2;
        color: white;
        font-size: var(--minFontSize);
        padding: 1vw 2vw;
        display: inline-block;
        border-radius: 10px;
      }
    }
  }
}
</style>
