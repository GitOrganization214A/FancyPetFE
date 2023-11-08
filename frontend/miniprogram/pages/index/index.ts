// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
        nickName : "",
        avatarUrl : "",
        follow : "",
        fans : "",
        atcnum : "",
        openID : "" ,
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: true,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    haveAvatar: false,
    haveNickname: false,
    LogoUrl:"../../resource/logo.png",
    bgUrl:"../../resource/background.jpg"
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
        ['follow']:"0",
        ['fans']:"0",
        ['atcnum']:"0"
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
        ['canIUseOpenData']: true, 
    })
  },
  login() {
    // 获取微信登录的code
    var that = this;
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
            let response ;
            wx.request({
                url: 'http://127.0.0.1:8000/api/v1/login',
                data:{
                    code:usercode
                },
                method:"GET",
                header: {'content-type': 'application/json' //
                },
                success:function(res) {

                    
                    that.setData({
                        ['nickName'] : res.data.nickname,
                        ['avatarUrl'] :  res.data.avatar,
                        ['follow'] :  res.data.follow,
                        ['fans'] :  res.data.fans,
                        ['atcnum'] :  res.data.atcnum,
                        ['openID']:res.data.openid,
                    })
                    that.data.userInfo.nickName=res.data.nickname
                    that.data.userInfo.avatarUrl=res.data.avatar
                    that.data.userInfo.follow=res.data.follow
                    that.data.userInfo.fans=res.data.fans
                    that.data.userInfo.atcnum=res.data.atcnum
                    that.data.userInfo.openID=res.data.openid


                    console.log(that.data.userInfo.openID)
                    console.log(response)
                    
                }
            })

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
  },

  getUserAvatar(e:any) {
    console.log("start")
    console.log(e.detail.avatarUrl)
    const UseravatarUrl = e.detail.avatarUrl
    this.setData({
        ['haveAvatar']:true,
        ['avatarUrl']:UseravatarUrl
    })
    this.data.userInfo.avatarUrl = UseravatarUrl
    console.log(this.data.userInfo.avatarUrl)
    console.log(this.data.userInfo.nickName)
    console.log("!!testavatar!!")

    wx.request({
        url: 'http://127.0.0.1:8000/api/v1/changeInfo',
        data:{
            openid:this.data.userInfo.openID,
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
        ['haveNickname']:true,
        ['userInfo.nickName']:e.detail.value
    })
    console.log("testnickname")
    console.log(this.data.userInfo.avatarUrl)
    console.log(this.data.userInfo.nickName)
    wx.request({
        url: 'http://127.0.0.1:8000/api/v1/changeInfo',
        data:{
            openid:this.data.userInfo.openID,
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
  quitUser(){
      this.setData({
        ['nickName'] : null,
        ['avatarUrl'] : null,
        ['follow'] : null,
        ['fans'] : null,
        ['atcnum'] : null,
        ['openID'] : "" ,
        canIUseOpenData:false,
    })
  }
})