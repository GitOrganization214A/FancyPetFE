// pages/petdetail/petdetail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petspaceid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(event) {
    console.log(event.petspaceid)
    var that = this
    this.data.petspaceid = event.petspaceid
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewPetSpace/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        PetSpaceID:this.data.petspaceid
      },
      success:function(res) {
          that.setData({
            PetSpaceDetail: res.data
          })
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