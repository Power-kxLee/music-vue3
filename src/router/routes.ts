// name：尽量写入 保持唯一性
const routes = [
  {
    path: '/',
    component: () => import('../views/page/index.vue'),
    redirect: 'home',
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
        component: () => import('../views/page/home/index.vue')
      },
      {
        path: '/songSheet/hot',
        name: 'songSheet/hot',
        component: () => import('../views/page/home/hot.vue')
      },
      // 我的
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/page/home/me.vue')
      },
    ]
  },
  {
    path: '/playlist/detail/:id',
    name: 'playList',
    component: () => import('../views/page/playlist/detail.vue')
  },
  {
    path: '/song/detail/:id',
    name: 'songDetail',
    component: () => import('../views/page/song/detail.vue')
  },
  // 登录页
  {
    path: '/sign/login',
    name: 'login',
    component: () => import('../views/page/sign/login.vue')
  },
  // 搜索页
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/page/search/search.vue')
  }

]
export default routes