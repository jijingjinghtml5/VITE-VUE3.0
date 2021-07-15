// 用户相关api

export const userApi = {
  Login: '/api/app/users/login', // 登录
  UserInfo: '/api/wechat/getuserbytoken' // 用户信息
}

export const commonApi = {
  UploadImage: '/api/wechat/user/getimage', // 上传图片
  ImageAiInfo: '/api/web/upload-ai-imgs', // ai信息
  EventTypes: '/api/meta-data/event-types', // 案件分类
  UploadFile: '/api/web/upload-origin-imgs' // 上传图片
}
