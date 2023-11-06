// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
        nickName : "cuber",
        avatarUrl : "/test.jpg",
        gender : "0",
        province : "hainan",
        city : "haikou",
        country : "China"
    },
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
        var userInfo = wx.getStorageSync('userInfo');
        var that = this;
        if(userInfo.gender ==0){
        userInfo.gender = '未定义'
        }else if(userInfo.gender ==1){
        userInfo.gender = '男'
        }else {
        userInfo.gender = '女'
        }
    
        //给data中数据赋值
    
        that.setData({   
            nickName : "cuber",
            // avatarUrl:userInfo.avatarUrl,
            avatarUrl:"/test.jpg",
            gender: "0",
            province: "hainan",
            city: "haikou",
            country: "China",
            canIUseGetUserProfile: true,
        })
    }
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
  },
  login() {
 
    let _this = this;
 
    // 获取微信登录的code
    wx.login({
      success (e) {
        if (e.code) {
            wx.showToast({
                title: '登录成功！' + e.errMsg,
                icon: 'none',
                duration: 2000
              })
          // 请求后端写的登录逻辑接口
          // ......
            wx.request({
                url:'/login',
                data:{
                    code:e.code
                },
                method:"POST",
                header: {'content-type': 'application/json' //
                },
                success(res) {
                    console.log(res.data)
                    
                }
            })
 
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
    console.log(e)
    this.setData({
        canIUseOpenData:true,
        
    })
    // 把获取到的微信头像的图像文件上传到后端

  }
})
