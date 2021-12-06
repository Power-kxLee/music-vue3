interface List {
  name: string;
  to: string;
}

interface Result {
  [home:string]: List[];
  songSheet: List[]
}

const data:Result = {
  home: [
    {
      name: '推荐',
      to: '/home'
    },
    {
      name: '喜欢的音乐',
      to: '/home/like'
    },
  ],
  songSheet: [
    {
      name: '歌单',
      to: '/songSheet'
    },
    {
      name: '热门歌单',
      to: '/songSheet/hot'
    }
  ],
  me: [
    {
      name: '我的',
      to: '/me'
    }
  ]
}
export default data