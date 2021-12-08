export const state = () => {
  return {
    tabbarData: [],
    palyState: false, // 是否在播放音乐
    lyric: {}, // 保存当前的歌词
    songDetail: {}, // 保存当前音乐的信息
    playTime: '', // 保存当前播放的进度
    loginToken: '' // 登录后获取到的token
  }
}