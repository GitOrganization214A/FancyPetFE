// userinfo.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    userid:'',
    userInfo: {},
    navigationUrl:"../../resource/navigationbar.png",
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
  },
  onLoad: function (event) {
    var that = this
    this.data.userid = event.userid
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewUserInfo/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        UserID:that.data.userid,
        openid:app.globalData.openid,
      },
      success:function(res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },

  //关注按钮
  followUser: function(event) {
    var that = this
    if(!that.data.userInfo.followed)
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/follow/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          UserID:that.data.userid,
          openid:app.globalData.openid,
          operation:'follow',
        },
        success:function(res) {
          const currentItem = that.data.userInfo
          const updatedItem = { ...currentItem, followed: true};
          that.setData({
            userInfo: updatedItem
          })
        }
      })
    }
    else
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/follow/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          UserID:that.data.userid,
          openid:app.globalData.openid,
          operation:'cancel',
        },
        success:function(res) {
          const currentItem = that.data.userInfo
          const updatedItem = { ...currentItem, followed: false};
          that.setData({
            userInfo: updatedItem
          })
        }
      })
    }
  },
});
