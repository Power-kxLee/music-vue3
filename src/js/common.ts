import { useStore } from "vuex";
import axios from "@axios";
const store = useStore()
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
    store.commit('update', {
      key: 'loginStatus',
      value
    })
  }
  return value
}

export default {
  getLoginStatus
}