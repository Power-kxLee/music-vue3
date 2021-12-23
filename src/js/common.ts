import {store} from '@/store/index'
import axios from "@axios";
import {Toast}  from "vant";
// 获取登录的用户信息
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

// 根据传入的时间，返回xxxx年xx月xx日
const setDateYMD = (time:any) => {
  const date = new Date(time)
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
}

// 防抖,返回一个函数
// 使用: debounce(fn, delay)(args)
const debounce = (fn: any, delay: number):any => {

  return (args: any) => {
    const _this = this;
    const _args = args;
    if (fn.id) {
      clearTimeout(fn.id);
    }
    fn.id = setTimeout(() => {
      fn.call(_this, _args);
    }, delay); 
  };
};

const c_loading = (text:string):any => {
  return Toast.loading({
    message: text,
    forbidClick: true,
    loadingType: 'spinner',
  });
} 

export {
  getLoginStatus,
  setDateYMD,
  debounce,
  c_loading
}