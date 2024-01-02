// petinfo.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    responseData:{},
    capsuleBarHeight: deviceUtil.getNavigationBarHeight()
  },
  onShow() {
    var that=this
    wx.request({
    url: 'http://43.143.139.4:8000/api/v1/PetSpaces/',
    data:{
      openid:app.globalData.openid
    },
    method: 'GET',
    header: {'content-type': 'application/json' //
    },
    success: function(res) {
      that.setData({
        responseData:res.data
      })
    },
  })
  },
  showdetails:function(event){
    const petspaceid = event.currentTarget.dataset.petspaceid
    wx.navigateTo({
      url:'/pages/petdetail/petdetail?petspaceid='+petspaceid,
    })
  },
  addcost:function(){
    wx.navigateTo({
      url:'/pages/cost/cost'
    })
  },
  addpet:function(){
    wx.navigateTo({
      url:'/pages/addpet/addpet'
    })
  },
});
