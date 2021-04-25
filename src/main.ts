import { createApp } from 'vue'
import Vant from 'vant'
import App from './App.vue'

import router from './router/index'

import store from './store/index'

import 'vant/lib/index.css'

createApp(App).use(router).use(Vant).mount('#app')
