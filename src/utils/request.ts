import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import router from '@/router/index'
// 根据环境不同引入不同api地址
const baseApi = import.meta.env.VITE_APP_BASEAPI
// create an axios instance
const service = axios.create({
  baseURL: baseApi as string, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    // // 不传递默认开启loading
    // if (!config.hideloading) {
    //   // loading
    //   Toast.loading({
    //     forbidClick: true
    //   })
    // }
    const token = localStorage.getItem('access_token')
    if (token) {
      config.params = {
        token,
        ...config.params
      }
    }
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  (response) => {
    Toast.clear()
    const res = response.data
    if (res.code !== 200) {
      // 登录超时,重新登录
      // if (res.status === 401) {
      //   store.dispatch('FedLogOut').then(() => {
      //     location.reload()
      //   })
      // }
      if (res.code === 401) {
        Toast({
          message: '登录失效\n将自动重新登录'
        })
        setTimeout(() => {
          router.replace('/login')
        }, 2000)
      } else {
        Toast({
          message: res.msg
        })
      }
      return Promise.reject(res || 'error')
    }
    return Promise.resolve(res)
  },
  (error) => {
    Toast.clear()
    console.log(`err${error}`) // for debug
    return Promise.reject(error)
  }
)

export default service
