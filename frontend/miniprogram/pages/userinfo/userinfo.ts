// userinfo.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    openid:'',
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
    this.data.openid = event.openid
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewUserInfo/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:that.data.openid,
      },
      success:function(res) {
        that.setData({
          userInfo: res.data
        })
      }
    })
  },
});
