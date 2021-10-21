<script setup lang="ts">
import { ref } from 'vue'
import { Tabbar as vanTabbar, TabbarItem as vanTabbarItem } from 'vant';
defineProps<{ msg: string }>()

const count = ref(0)
</script>
<template>
  <van-tabbar>
    <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>