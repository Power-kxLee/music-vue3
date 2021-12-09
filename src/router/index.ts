import {createRouter, createWebHashHistory} from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

router.beforeEach((to, from, next) => {
  console.log(to)
  try {
    const loginStatus = window.localStorage.getItem('loginStatus')
    // 如果获取不到登录信息
    if (loginStatus) {
      
      return false
    }
    const loginStatusObj = JSON.parse(loginStatus|| '') 
    const {profile} = loginStatusObj.data
    // 只要登录成功就能够获取用户id 
    if (profile.userId) {

    }
  } catch(e) {

    // next()
  }
})
export default router