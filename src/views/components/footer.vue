<template>
  <van-tabbar v-model="active" >
    <van-tabbar-item v-for="item in tabbarList" :key="item.name" 
                    :name="item.name"
                    :icon="item.icon"
                    :to="item.to">{{item.label}}</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Tabbar as vanTabbar, TabbarItem as vanTabbarItem } from "vant";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import tabbarData from "@/data/tabbarData";
const store = useStore()
const active = ref('home');
const route = useRoute()
const tabbarList = [
  {
    name: 'home',
    icon: 'home-o',
    to: '/home',
    label: '首页'
  },
  {
    name: 'songSheet',
    icon: 'music-o',
    to: '/songSheet',
    label: '歌单'
  },
  {
    name: 'contact',
    icon: 'contact',
    to: '/contact',
    label: '我的'
  }
]
tabbarList.forEach((val, i) => {
  if(route.path.indexOf(val.to) === 0) {
    active.value = val.name
    return false
  }
})
console.log(route.path)

</script>