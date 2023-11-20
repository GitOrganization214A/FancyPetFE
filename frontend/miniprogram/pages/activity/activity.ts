// activity.ts

const app = getApp<IAppOption>()


Page({
  data: {
    actmain:true,
    actadopt:false,
    actmedic:false,
    actlove:false,
    actcloud:false,
    activitylist:[],
    pageindex:0,
    navigationurl:"../../resource/navigationbar.png",
    adopturl:"../../resource/adopt.png",
    medicurl:"../../resource/medic.png",
    loveurl:"../../resource/love.png",
    cloudpeturl:"../../resource/cloudpet.png",
    backurl:"../../resource/back.png",
    editadoptUrl:"../../resource/EditButton.jpg"
  },
  onLoad(){
    this.setData({
        actmain:true,
        actadopt:false,
        actlove:false,
        actcloud:false,
        pageindex:0
    })
  },
  actadopt(){
      this.setData({
          actmain:false,
          actadopt:true,
          pageindex:1
      })
      var that = this
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/adoptPet/',
        data:{
          openid:app.globalData.openid
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          that.setData({
            activitylist: res.data
          })
          console.log(res.data)
          console.log(that.data.actadopt)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  },
  switchpage(){
      var curindex = this.data.pageindex
      if(curindex < 5)
      {
          this.setData({
            actmain:true,
            actadopt:false,
            actlove:false,
            actcloud:false,
            pageindex:0
          })
          
      }

  },
  editAdopt(){
    wx.navigateTo({
        url:"../editAdopt/editAdopt"
    })
  },
  surf(e){
    console.log(e.currentTarget.id)
    wx.switchTab({
        url:"../petspace/petspace"
    })
  },
  adopt(e){
    console.log(e.currentTarget.id)
    
  }

});