// pages/shareuser/shareuser.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    UserID:''
  },
  addtoShare(){
    wx.showModal({
      editable:true,//显示输入框
      placeholderText:'输入UserID',//显示输入框提示信息
      success: res => {
        if (res.confirm) { //点击了确认
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/addShareUser/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
              openid:app.globalData.openid,
              PetSpaceID:app.globalData.petspaceid,
              UserID:res.content
            },
            success:function(res) {
              console.log("成功")
            }
          })
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/showShareUsers/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        PetSpaceID:app.globalData.petspaceid
      },
      success:function(res) {
          that.setData({
            ShareUserList: res.data
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})