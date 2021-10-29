<template>
  
</template>
<script setup lang="ts">
import axios from '@axios'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
console.log(route.params)
const _initDetailData = async (id:string) =>  {
  await axios.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}
_initDetailData(route.params.id as string)
</script>