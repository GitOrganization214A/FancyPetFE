// activity.ts

const app = getApp<IAppOption>()


Page({
  data: {
    messageList:[],
    navigationurl:"../../resource/navigationbar.png",
    deleteurl:"../../resource/giveup.png"
  },
  onShow(){
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/showMessages/',
        data:{
          openid:app.globalData.openid,
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          that.setData({
            messageList: res.data
          })
          that.data.messageList = res.data
          console.log(res.data)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  },
  surfindex(e){
    const tempuid = e.target.dataset.index
    console.log(tempuid)
    wx.navigateTo({
      url:'/pages/userinfo/userinfo?userid='+tempuid,
    })
  },
  surfpet(e){
    const temppid = e.target.dataset.index
    console.log(temppid)
    wx.navigateTo({
      url:'/pages/petdetailshow/petdetailshow?petspaceid='+temppid,
    })
  },
  deletemessage(e){
    var that = this
    const mid = e.target.dataset.index
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/deleteMessage/',
        data:{
          openid:app.globalData.openid,
          MessageID:mid
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            var mindex = -1
            var templist = that.data.messageList
            for (var msg of templist)
            {
                mindex++
                if(msg.MessageID==mid)
                {
                    templist.splice(mindex,1)
                    that.setData({
                        messageList:templist
                    })
                    that.data.messageList=templist
                    console.log(that.data.messageList)
                    break
                }
            }
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  }
});