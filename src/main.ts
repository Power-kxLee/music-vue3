// 使用rem布局
import './styles/reset.scss'
import 'vant/lib/index.css'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store/index'
const _app = createApp(App)
_app.use(router).use(store).mount('#app')
