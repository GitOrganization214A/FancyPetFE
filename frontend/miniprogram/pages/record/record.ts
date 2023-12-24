// pages/record/record.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addNewUrl:"../../resource/th1.png",
    giveupUrl:"../../resource/th.png",
    sneezeUrl:"../../../resource/sneezing_face.png",
    vomiteUrl:"../../../resource/face_vomiting.png",
    overheatUrl:"../../../resource/face_with_thermometer.png",
    sleepUrl:"../../../resource/sleeping.png",
    hurtUrl:"../../../resource/face_with_head_bandage.png",
    dizzUrl:"../../../resource/tired_face.png",
    hankeyUrl:"../../../resource/hankey.png",
    loveUrl:"../../../resource/heart_eyes.png",
    number:0,
    index:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  addNewRecord(){
    wx.navigateTo({
      url:'/pages/addrecord/addrecord',
    })
  },
  goback(){
    wx.navigateBack({
      delta: 1
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
      url: 'http://43.143.139.4:8000/api/v1/showHealthRecord/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        PetSpaceID:app.globalData.petspaceid
      },
      success:function(res) {
          that.setData({
            RecordDetail: res.data
          })
          for (let record of res.data){
            console.log("1")
            var originindex=that.data.index
            let numberArray = [];
            for (let i = 0; i < that.data.number.toString().length; i++) {
              numberArray.push(parseInt(that.data.number.toString()[i]));
            }
            that.data.number=that.data.number+1
            that.data.index=[...originindex,...numberArray]
          }
      }
    })
  },
  deleteRecord(e){
    var that=this;
    console.log(e);
    wx.showModal({
      title: '提示',
      content: '确定要删除此条记录？',
      success: function (res) {
       if (res.confirm) {
        console.log('点击确定了');
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/deleteHealthRecord/',
          method:"GET",
          header: {'content-type': 'application/json' //
          },
          data:{
            PetSpaceID:app.globalData.petspaceid,
            openid:app.globalData.openid,
            index:e.currentTarget.dataset.index
          },
          success:function(res) {
            that.onShow()
          }
        })
       } else if (res.cancel) {
         console.log('点击取消了');
         return false;   
        }
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