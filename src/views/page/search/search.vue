<template>
  <div class="searchHead">
    <van-icon name="arrow-left" />
    <van-search v-model="searchVal"
                shape="round"
                background="none"
                placeholder="请输入搜索关键词" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Search as VanSearch, Icon as VanIcon } from "vant";
const searchVal = ref("");
</script>
<style lang="scss" scoped>
  .searchHead {
    display: flex;
    ::v-deep(.van-icon-arrow-left) {
      font-size: 24px;
      width: 30px;
      &::before{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
      }
    }
    ::v-deep(.van-search) {
      flex: 1;
    }
  }
</style>