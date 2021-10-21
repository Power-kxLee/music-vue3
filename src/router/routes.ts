
const routes = [
  { 
    path: '/', 
    component: () => import('../views/page/home/index.vue'),
    children: [{
      path: 'like',
      component: () => import('../views/page/home/like.vue')
    }]
  },
  { 
    path: '/songSheet/', 
    component: () => import('../views/page/songSheet/index.vue'),
    children: [{
      path: 'hot',
      component: () => import('../views/page/songSheet/hot.vue')
    }]
  }
]
export default routes