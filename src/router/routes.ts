// name：尽量写入 保持唯一性
const routes = [
  {
    path: '/',
    component: () => import('../views/page/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home/like',
        name: 'home/like',
        component: () => import('../views/page/home/like.vue')
      },{
        path: '/home',
        name: 'home',
        component: () => import('../views/page/home/reco.vue')
      },
      {
        path: '/songSheet',
        name: 'songSheet',
        component: () => import('../views/page/songSheet/index.vue')
      },
      {
        path: '/songSheet/hot',
        name: 'songSheet/hot',
        component: () => import('../views/page/songSheet/hot.vue')
      }
    ]
  },
  {
    path: '/playlist/detail/:id',
    component: () => import('../views/page/playlist/detail.vue')
  }

]
export default routes