import request from '@/utils/request'
import { userApi } from '@/api/index'

// axios
// 登录
export function fetchLogin(data: { username: string; password: string }) {
  return request({
    url: userApi.Login,
    method: 'post',
    data
  })
}

// 用户信息 post 方法
export function getUserInfo(data?: any) {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    data
  })
}

// // 用户名称 get 方法
// export function getUserName(params: any) {
//   return request({
//     url: userApi.UserName,
//     method: 'get',
//     params,
//     hideloading: true
//   })
// }
