/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    openid?:"",
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}