<script setup lang="ts">
import mFooter from "@components/footer.vue";
import mHeader from "@components/header.vue";
import { useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
import { useStore } from "vuex";
import tabbarData from "@/data/tabbarData";
const route = useRoute();
const store = useStore();
onBeforeRouteUpdate((to, form) => {
  updateTabbar(to.name as string);
});

const updateTabbar = (name: string) => {
  const _rou = ["home", "songSheet", 'me'];
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
  <div class="homePage">
    <m-header class="header"></m-header>
    <div class="pageContent">
      
      <router-view  v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <m-footer class="footer"></m-footer>
  </div>
</template>
<style lang="scss" scoped>
.homePage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(179deg, #e8f2f1 , #ffffff 38%);
}
.pageContent {
  flex: 1;
  overflow: auto;
}
::v-deep(.footer) {
  position: relative;
}
</style>