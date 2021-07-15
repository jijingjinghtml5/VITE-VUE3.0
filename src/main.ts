import { createApp } from 'vue'
import Vant from 'vant'
import router from '@/router/index'
import store from '@/store/index'
import App from '@/App.vue'

import 'vant/lib/index.css'
// 引入全局样式
import '@/assets/css/index.scss'

createApp(App).use(store).use(router).use(Vant).mount('#app')
