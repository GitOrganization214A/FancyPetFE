// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
let SCREEN_WIDTH = 750
let RATE = wx.getSystemInfoSync().screenHeight /wx.getSystemInfoSync().screenWidth
let SCREEN_HEIGHT = SCREEN_WIDTH * RATE

Page({
  data: {
    userInfo: {
        SW : SCREEN_WIDTH,
        SH : SCREEN_HEIGHT,
        avatarwidth: 0.1*SCREEN_WIDTH,
        nickName : "",
        avatarUrl : "",
        follow : "",
        fans : "",
        atcnum : "",
        openID : "" ,
        newMessage : "0",
    },
    beip:"192.168.187.1",
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    haveAvatar: false,
    haveNickname: false,
    haveNewMessage:false,
    LogoUrl:"../../resource/logoall.png",
    bgUrl:"../../resource/background.jpg",
    loginbuttonUrl:"../../resource/loginbutton.png",
    navigationUrl:"../../resource/navigationbar.png",
    messageUrl:"../../resource/nomessage.png"
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad(event) {
    // @ts-ignore
    if(!this.data.canIUseOpenData)
        wx.hideTabBar({
            success:()=>{
                console.log("hidetabbar")
            }
        })
    
    if(this.data.userInfo.newMessage!="0")
    {
        this.setData({
            messageUrl:"../../resource/havemessage.png"
        })
        this.data.messageUrl="../../resource/havemessage.png"
    }
    else
    {
        this.setData({
            messageUrl:"../../resource/nomessage.png"
        })
        this.data.messageUrl="../../resource/nomessage.png"
    }

    this.setData({
        ['follow']:"0",
        ['fans']:"0",
        ['atcnum']:"0"
    })

  },
  onShow(){
    if(this.data.canIUseOpenData)
    {
        this.getUserProfile()
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
            usercode=e.code;
            let response ;
            wx.request({
                url: 'http://43.143.139.4:8000/api/v1/login/',
                data:{
                    code:usercode
                },
                method:"GET",
                header: {'content-type': 'application/json' 
                },
                success:function(res) {
                    wx.showTabBar({
                        success:()=>{
                            console.log("showtabbar")
                        }
                    })
                    that.setData({
                        ['nickName'] : res.data.nickname,
                        ['avatarUrl'] :  res.data.avatar+"?v="+new Date().getTime(),
                        ['follow'] :  res.data.follow,
                        ['fans'] :  res.data.fans,
                        ['atcnum'] :  res.data.atcnum,
                        ['openID']:res.data.openid,
                        ['newMessage']:res.data.newMessage
                    })
                    app.globalData.openid=res.data.openid
                    
                    that.data.userInfo.nickName=res.data.nickname
                    that.data.userInfo.avatarUrl=res.data.avatar+"?v="+new Date().getTime()
                    that.data.userInfo.follow=res.data.follow
                    that.data.userInfo.fans=res.data.fans
                    that.data.userInfo.atcnum=res.data.atcnum
                    that.data.userInfo.openID=res.data.openid
                    that.data.userInfo.newMessage=res.data.newMessage
                    console.log(that.data.userInfo.newMessage)
                    if(that.data.userInfo.newMessage!="0")
                    {
                        that.setData({
                            messageUrl:"../../resource/havemessage.png"
                        })
                        that.data.messageUrl="../../resource/havemessage.png"
                    }
                    else
                    {
                        that.setData({
                            messageUrl:"../../resource/nomessage.png"
                        })
                        that.data.messageUrl="../../resource/nomessage.png"
                    }
                    console.log(that.data.userInfo.openID)
                    console.log(res)
                    
                },
                fail:function(res){
                    console.log("failed")
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
        ['avatarUrl']:UseravatarUrl+"?v="+new Date().getTime(),
    })
    
    this.data.userInfo.avatarUrl = UseravatarUrl+"?v="+new Date().getTime()
    console.log(this.data.userInfo.avatarUrl)
    console.log(this.data.userInfo.nickName)
    console.log("!!testavatar!!")

    const tempFilePaths = e.detail.avatarUrl
    console.log(tempFilePaths)
    wx.uploadFile({
      url: 'http://43.143.139.4:8000/api/v1/changeAvatar/', 
      filePath: tempFilePaths,
      name: 'avatar',
      formData: {
        openid:this.data.userInfo.openID
      },
      success (res){
        console.log(res.data)

        //do something
      }
    })
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
        url: 'http://43.143.139.4:8000/api/v1/changeInfo/',
        data:{
            openid:this.data.userInfo.openID,
            nickname:this.data.userInfo.nickName,
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success(res) {
            console.log(res.data)
        }
    })
  },
  showMessage(){
      wx.navigateTo({
          url:"../message/message"
      })
  },
  quitUser(){
      this.setData({
        ['nickName'] : "",
        ['avatarUrl'] : "",
        ['follow'] : "",
        ['fans'] : "",
        ['atcnum'] : "",
        ['openID'] : "" ,
        canIUseOpenData:false,
    })
    this.data.canIUseOpenData=false
    wx.hideTabBar({
        success:()=>{
            console.log("hidetabbar")
        }
    })
  }
})