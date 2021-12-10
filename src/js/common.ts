import {store} from '@/store/index'
import axios from "@axios";

const getLoginStatus =  async() => {
  const value:any =  await axios.get({
    url: '/login/status',
    data: {
      timerstamp:Date.now()
    }
  })
  if (value.data.code === 200) {
    // 登录的状态保存到loginStatus
    window.localStorage.setItem('loginStatus', JSON.stringify(value))
    if (store) {
      
      store.commit('update', {
        key: 'loginStatus',
        value
      })
      console.log('loginStatus', store.state.loginStatus)
    }
  }
  return value
}

export {
  getLoginStatus
}