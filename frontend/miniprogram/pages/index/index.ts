// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
        nickName : null,
        avatarUrl : "./test.jpg",
        gender : "未填写",
        province : "未填写",
        city : "未填写",
        country : "未填写",
        userCode : null ,
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    haveAvatar: false,
    haveNickname: false,
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    this.setData({
        avatarUrl:"./test.jpg"
    })

  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getSetting({
        success: (res) => {
          console.log(res)
   
          // 判断用户信息是否有授权
          if (!res.authSetting['scope.userInfo']) {
            // 获取授权
            wx.authorize({
              scope: 'scope.userInfo',
              success: (e) => {
                console.log('authorize: ', e)
   
                // 调用你们后端写的登录接口
                this.login()
              },
              fail: (err) => {
                console.log('authorize-err: ', err)
              }
            })
          } else {
            console.log('已授权')
            // 调用你们后端写的登录接口
            this.login()
          }
        },
        fail: (err)=> {
          console.log(err)
        }
      })
    this.setData({
        canIUseOpenData: true, 
    })
  },
  login() {
    // 获取微信登录的code
    let usercode = null;
    wx.login({
      success (e) {
        if (e.code) {
            wx.showToast({
                title: '登录成功！' + e.errMsg,
                icon: 'none',
                duration: 2000
              })
            usercode=e.code;
          // 请求后端写的登录逻辑接口
          // ......  
        } else {
          wx.showToast({
            title: '登录失败！' + e.errMsg,
            icon: 'none',
            duration: 2000
          })
          console.log('登录失败！' + e.errMsg)
        }
      }
    })
    this.setData({
        userCode:usercode
    })
    wx.request({
        url: 'http://127.0.0.1:8000/api/v1/login',
        data:{
            code:this.data.userInfo.userCode,
            nickname:this.data.userInfo.nickName,
            avatar:this.data.userInfo.avatarUrl,
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success(res) {
            console.log(res.data)
        }
    })
    
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserAvatar(e:any) {
    console.log("start")
    console.log(e.detail.avatarUrl)
    const UseravatarUrl = e.detail.avatarUrl
    this.setData({
        haveAvatar:true,
        avatarUrl:UseravatarUrl
    })
    wx.request({
        url: 'http://127.0.0.1:8000/api/v1/login',
        data:{
            code:this.data.userInfo.userCode,
            nickname:this.data.userInfo.nickName,
            avatar:this.data.userInfo.avatarUrl,
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success(res) {
            console.log(res.data)
        }
    })
    // 把获取到的微信头像的图像文件上传到后端
  },
  getUserNickname(e:any){
    console.log(e.detail.value)
    this.setData({
        haveNickname:true,
        nickName:e.detail.value
    })
    wx.request({
        url: 'http://127.0.0.1:8000/api/v1/login',
        data:{
            code:this.data.userInfo.userCode,
            nickname:this.data.userInfo.nickName,
            avatar:this.data.userInfo.avatarUrl,
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success(res) {
            console.log(res.data)
        }
    })
  }
})
