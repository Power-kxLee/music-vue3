<script setup lang="ts">
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import tabbarData from "@/data/tabbarData";
const route = useRoute();
const store = useStore();
onBeforeRouteUpdate((to, form) => {
  updateTabbar(to.name as string);
});

const updateTabbar = (name: string) => {
  const _rou = ["home", "songSheet"];
  _rou.forEach((val, i) => {
    if (name.indexOf(val) === 0) {
      name = val;
      return;
    }
  });

  store.commit("setTabbarData", tabbarData[name]);
};
updateTabbar(route?.name as string);
</script>
<template>
  <m-header></m-header>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <m-footer></m-footer>
</template>