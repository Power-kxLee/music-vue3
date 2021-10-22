import axios from 'axios'

// 使用vercel提供的服务
const ctx = 'https://netease-cloud-music-api2-ochre.vercel.app'
const realIP = '116.25.146.177' // 这里随便一个国内ip就可以

const post = ({ url, data, headers, formData = false }:any) => {
  if (formData && Object.keys(data).length > 0) {
    const fParam = new URLSearchParams()

    for (const key in data) {
      fParam.append(key, data[key])
    }
    data = fParam
  }
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data,
      headers,
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
const get = ({url, data}:any) => {
  
  data.realIP =  realIP
  let parame = []
  for (let key in data) {
    const val = data[key]
    parame.push(`${key}=${val}`)
  }
  url = ctx + url + '?' + parame.join('&')
  return new Promise((resolve, reject) => {
    axios.get(url, {
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}
const _axios = {
  post,
  get
}
export default _axios