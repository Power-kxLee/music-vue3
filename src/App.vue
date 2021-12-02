<template>

  <router-view v-slot="{ Component }" >
    <keep-alive exclude ="songDetail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>