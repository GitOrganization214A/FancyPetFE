// pages/cost/cost.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:0,
    index:[],
    foodUrl:"../../../resource/food.png",
    vaccineUrl:"../../../resource/vaccine.png",
    toyUrl:"../../../resource/toy.png",
    buyUrl:"../../../resource/buy.png",
    sickUrl:"../../../resource/sick.png",
    clothUrl:"../../../resource/cloth.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  deleteBill(e){
    var that=this;
;
    wx.showModal({
      title: '提示',
      content: '确定要删除此条账单？',
      success: function (res) {
       if (res.confirm) {
;
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/deleteBill/',
          method:"GET",
          header: {'content-type': 'application/json' //
          },
          data:{
            openid:app.globalData.openid,
            index:e.currentTarget.dataset.index
          },
          success:function(res) {
            that.onShow()
          }
        })
       } else if (res.cancel) {
;
         return false;   
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
      url: 'http://43.143.139.4:8000/api/v1/showBills/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
      },
      success:function(res) {
          that.setData({
            Cost: res.data
          })
          for (let record of res.data){

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
  addtoBill(e){
    wx.navigateTo({
      url:'/pages/addcost/addcost',
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