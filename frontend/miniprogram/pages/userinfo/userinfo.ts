// userinfo.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    articleid:'',
    hotPost: {},
    navigationUrl:"../../resource/navigationbar.png",
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
  },
  // onLoad: function (event) {
  //     var that = this
  //     this.data.articleid = event.articleid
  //     wx.request({
  //       url: 'http://43.143.139.4:8000/api/v1/viewArticle/',
  //       method:"GET",
  //       header: {'content-type': 'application/json' //
  //       },
  //       data:{
  //         openid:app.globalData.openid,
  //         ArticleID:this.data.articleid,
  //       },
  //       success:function(res) {
  //           that.setData({
  //             hotPost: res.data
  //           })
  //       }
  //     })
  //   },
});
