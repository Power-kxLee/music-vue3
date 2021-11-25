<template>
  asdsad
</template>
<script setup lang="ts">
import {
  useRoute
} from "vue-router";
import axios from "@axios";
const route = useRoute();
const id = route.params.id;
axios.get({
  url: "/lyric",
  data: {
    id,
  },
});
</script>