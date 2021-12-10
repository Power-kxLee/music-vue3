import {createRouter, createWebHashHistory} from 'vue-router'
import routes from './routes'
import {getLoginStatus} from '@/js/common'

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

router.beforeEach((to:any, from, next) => {
  const t = async () => {
    const loginStatus = localStorage.getItem('loginStatus')
    // 如果没有登录信息保存到localStorage
    if (!loginStatus) {
      // 尝试走接口去获取登录的信息
      await getLoginStatus()
    }

    const loginStatusObj = JSON.parse(localStorage.getItem('loginStatus')|| '') 
    const {profile} = loginStatusObj.data
    // 如果有登录信息 就不允许在进入登录界面了 只要进来就重定向到首页
    localStorage.setItem('userId', profile.userId)
    if (profile.userId) {
      // 根据路由设置的name , 去设定哪些路由 不允许进入, 只要进来就重定向到首页
      const _exclude = ['login']
      if (_exclude.includes(to.name)) {
        next({
          path: '/'
        });
      } else {
        next()
      }
    } else { // 如果没有该干嘛就干嘛
      next()
    }
  }
  
  t()
  
})
export default router