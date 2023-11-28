/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    openid?:"",
    petspaceid?:"",
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}