// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
        nickName : "cuber",
        avatarUrl : "",
        gender : "0",
        province : "hainan",
        city : "haikou",
        country : "China"
    },
    hasUserInfo: false,
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
            avatarUrl:userInfo.avatarUrl,
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
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
            nickName : res.userInfo.nickName,
            avatarUrl:res.userInfo.avatarUrl,
            gender: res.userInfo.gender,
            province: res.userInfo.province,
            city: res.userInfo.city,
            country: res.userInfo.country,
            hasUserInfo: true,
            canIUseOpenData: true
        })
        wx.setStorage({
            data: res.userInfo,
            key: 'userInfo',
        })
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
  }
})
