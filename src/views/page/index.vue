<script setup lang="ts">
import mFooter from "@/views/components/footer.vue";
import mHeader from "@/views/components/header.vue";
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import tabbarData from "@/data/tabbarData";
const route = useRoute();
const store = useStore();
onBeforeRouteUpdate((to, form) => {
  updateTabbar(to.name);
});

const updateTabbar = (name: any) => {
  const _rou = ["home", "songSheet"];
  _rou.forEach((val, i) => {
    if (name.indexOf(val) === 0) {
      name = val;
      return;
    }
  });
  store.commit("setTabbarData", tabbarData[name]);
};
updateTabbar(route?.name);
</script>
<template>
  <m-header></m-header>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <m-footer></m-footer>
</template>