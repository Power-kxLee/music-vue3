<template>
  <article class="me-content">

    <main>
      <div class="user-account boxdiv" v-if="loading.userData">
        <div class="user-img">
          <van-image width="80"
                     height="80"
                     round
                     :src="userImg" />
        </div>
        <div class="user-detail">
          <h3 class="user-name">
            {{userData.profile ? userData.profile.nickname: '未登录' }}
            <span>Lv{{userData.level}}</span>
          </h3>
          <router-link v-if="!userData.account"
                       class="noloading-tis"
                       to="/sign/login">登录后的世界更精彩
            <van-icon name="arrow" />
          </router-link>
          <template v-else>
            <ul class="follow">
              <li>{{userData.profile.follows}}关注</li>
              <li>{{userData.profile.followeds}}粉丝</li>
            </ul>
            <ul class="label">
              <li>{{userData.birthday}}年</li>
              <li>{{userData.province}} {{userData.city}}</li>
              <li>虾听 {{Math.floor(userData.createDays / 365) }}年</li>
            </ul>
          </template>
        </div>
      </div>
      <template v-if="userData.account">
        <div class="boxdiv">
          <header>音乐品味</header>
          <van-cell is-link>
            <template #title>
              <div class="boxdivlist">
                <div class="icon">
                  <span class="music-icon"></span>
                </div>
                <div class="content">
                  <h5>听歌排行</h5>
                  <section>累计听歌{{userData.listenSongs}}首</section>
                </div>
              </div>
            </template>
            <template #right-icon></template>
          </van-cell>
          <van-cell is-link >
            <template #title>
              <div class="boxdivlist">
                <div class="icon">
                  <van-icon name="like" />
                </div>
                <div class="content">
                  <h5>我喜欢的音乐</h5>
                  <section>{{likeNum}}首</section>
                </div>
              </div>
            </template>
            <template #right-icon></template>
          </van-cell>
        </div>
        <div class="boxdiv" v-if="loading.playlist">
          <header>收藏的歌单</header>
          <van-cell is-link
                    v-for="item in playListData"
                    :key="item.id">
            <template #title>
              <div class="boxdivlist">
                <div class="icon">
                  <van-image width="60"
                             height="60"
                             :src="item.coverImgUrl" />
                </div>
                <div class="content">
                  <h5>{{item.name}}</h5>
                  <section>{{item.trackCount}}首, by {{item.creator.nickname}}, 播放{{handlePlayCount(item.playCount)}}</section>
                </div>
              </div>
            </template>
            <template #right-icon></template>
          </van-cell>

        </div>
        <div class="boxdiv" v-if="loading.comment">
          <header>我的评论</header>
          <van-cell is-link class="songCell">
            <template #title>
              <div class="songlist">
                <div class="img">
                  
                  <van-image width="25"
                            height="25"
                            fit="cover"
                            :src="_resourceInfo.avatarUrl" />
                </div>
                <span>{{_resourceInfo.name}} - {{_resourceInfo.artist.name}}</span>
                <span class="good-job">
                  {{_resourceInfo.likedCount}}
                  <van-icon name="good-job-o" />
                </span>
              </div>
              <div class="comment">
                {{_resourceInfo.content}}
              </div>
              <p class="time">{{_resourceInfo.time}}</p>
            </template>
            <template #right-icon></template>
          </van-cell>
          <van-cell is-link>
            <template #title>
              查看全部
            </template>
          </van-cell>
        </div>
      </template>
    </main>
  </article>
</template> 
<script setup lang="ts">
import { Image as VanImage, Icon as VanIcon, Cell as VanCell,Toast  } from "vant";
import axios from "@axios";
import { getLoginStatus, setDateYMD } from "@/js/common";
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import placesMap from "@/data/placesMap";
const store = useStore();
const userData: any = ref({});
const _placesMap: any = placesMap;
const userImg = ref("");
const playListData: any = ref({});
const likeNum = ref('')
const loading:any = ref({
  userData: false,
  playlist: false,
  comment: false,
  like: false
})
const vanLoading =  Toast.loading({
  message: '虾快熟了...在等等',
  forbidClick: true,
  duration: 0
})
const isLogin = () => {
  const _len = Object.keys(store.state.loginStatus).length;
  if (_len > 0 || localStorage.getItem("loginStatus")) {
    const val =
      _len > 0
        ? store.state.loginStatus
        : JSON.parse(localStorage.getItem("loginStatus") || "");
    return val.data;
  }
  return {};
};
let _resourceInfo: any = ref({});
let loginData = isLogin(); // 获取登录后的内容
const init = () => {
  // 获取用户的详情内容
  initDetail();
  // 获取喜欢的音乐数量
  initLive();
  // 获取收藏的歌单
  playList();
  // 获取历史评论
  historyComment();
};

const initDetail = async () => {
  // 获取用户详情
  const detailData = await axios.get({
    url: "/user/detail",
    data: {
      uid: loginData.profile.userId,
    },
  });
  userData.value = Object.assign(loginData, detailData);
  userData.value.province = _placesMap[loginData.profile.province].replace(
    /[&省]$/,
    ""
  );
  userData.value.city = _placesMap[loginData.profile.city].replace(
    /[&市]$/,
    ""
  );
  const year: any = new Date(loginData.profile.birthday)
    .getFullYear()
    .toString();
  // 比如是1991年 那么就返回 91年
  userData.value.birthday = year.substring(year.length - 2, year.length);
  userImg.value = userData.value.profile.backgroundUrl;

  loading.value.userData = true
  hideLoading()
};
const initLive = async () => {
  const { ids }: any = await axios.get({
    url: "/likelist",
    data: {
      uid: loginData.profile.userId,
    },
  });
  likeNum.value = ids.length;
  loading.value.like = true
  hideLoading()
  return ids
};
// 保留多少位小数, 不会四舍五入
// 如果是整数会直接返回
const toFixed = (val: number, count: number) => {
  const [l, r]: any = val.toString().split(".");
  const nr = r ? (r.length > count ? r.substr(0, count) : r) : "";
  return l + "." + nr;
};
const handlePlayCount = (playCount: number) => {
  const _playCount: string = playCount.toString();
  let newPlayCount: any =
    _playCount.length >= 9
      ? toFixed(Number(_playCount) / 100000000, 1) + "亿"
      : toFixed(Number(_playCount) / 10000, 1) + "万";
  return newPlayCount;
};
// 获取用户收藏了多少歌单
const playList = async () => {
  const { playlist }: any = await axios.get({
    url: "/user/playlist",
    data: {
      uid: loginData.profile.userId,
    },
  });
  let defaultNum = 2; // 默认值显示头2个
  const newPlayList = playlist.filter((item: any) => {
    if (item.subscribed && defaultNum) {
      defaultNum--;
      return item;
    }
  });
  playListData.value = newPlayList;
  loading.value.playlist = true
  hideLoading()
};

// 获取用户的历史评论
const historyComment = async () => {
  let { data }: any = await axios.get({
    url: "/user/comment/history",
    data: {
      uid: loginData.profile.userId,
      limit: 1,
    },
  });
  let { resourceInfo, user, content,likedCount, time } = data.comments[0];
  resourceInfo = JSON.parse(resourceInfo);
  _resourceInfo.value = { ...resourceInfo, ...user };
  _resourceInfo.value.likedCount = likedCount
  _resourceInfo.value.content = content
  _resourceInfo.value.time = setDateYMD(time)
 loading.value.comment = true
 hideLoading()
};

const hideLoading = () => {
  for (const i in loading.value) {
    const state:any = loading.value[i]
    if (!state) {
      return false
    }
  }
  vanLoading.clear()
}

init();

</script>
<style lang="scss" scoped>
.me-content {
  overflow: hidden;
  background: linear-gradient(11deg, #ee9ae5, #5961f9);
  height: calc(100vh - 51px);
  main {
    overflow: auto;
    height: calc(100vh - 51px - 50px);
  }
  .follow{
    display: flex;
    color: rgb(160, 160, 160);
    margin: 5px 0;
    li {
      padding-right: 10px;
    }
  }
  .label {
    display: flex;
    li {
      border: 1px solid rgb(221, 221, 221);
      border-radius: 10px;
      margin-right: 5px;
      padding: 0 7px;
      font-size: 12px;
    }
  }
  ::v-deep(.boxdiv) {
    padding: 10px;
    margin: 20px 10px;
    background: white;
    border-radius: 10px;
    .van-cell {
      padding-left: 0px;
    }
    header {
      font-size: 18px;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .boxdivlist {
      display: flex;
      .icon {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        background: #f44336;
        margin-right: 10px;
        position: relative;
        text-align: center;
        .music-icon {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          width: 4px;
          height: 25px;
          border-radius: 10px;
          &::after {
            content: "";
            width: 4px;
            height: 15px;
            background: white;
            position: absolute;
            bottom: 0px;
            left: -10px;
            border-radius: 10px;
          }
          &::before {
            content: "";
            width: 4px;
            height: 10px;
            background: white;
            position: absolute;
            bottom: 0px;
            right: -10px;
            border-radius: 10px;
          }
        }
        .van-icon {
          color: white;
          font-size: 26px;
          line-height: 60px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        h5 {
          font-size: 14px;
          font-weight: normal;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: calc(100vw - 120px);
        }
        section {
          color: rgb(133, 133, 133);
          font-size: 13px;
        }
      }
    }
    .songCell {
      .songlist {
        display: flex;
        position: relative;
        span{
          color: rgb(150, 150, 150);
        }
        .img {
          width: 25px;
          height: 25px;
          border-radius: 5px;
          overflow: hidden;
          margin-right: 10px;
        }
        .good-job {
          position: absolute;
          right: 0px;
          .van-icon {
            font-size: 16px;
          }
        }
      }
      .comment {
        margin: 5px 0;
        
      }
      .time {
        font-size: 12px;
        color: rgb(150, 150, 150);
      }
    }
  }
  .user-account {
    display: flex;
    .user-detail {
      margin-left: 20px;
      display: flex;

      flex-direction: column;
      justify-content: center;
      .user-name {
        font-size: 18px;
      }
    }
  }
}
</style>