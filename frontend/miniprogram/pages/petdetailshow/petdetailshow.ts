// pages/petdetailshow/petdetailshow.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petspaceid:'',
    number:0,
    list:[
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(event) {
    (event.petspaceid)
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
          (res.data.images)
          for (let image of res.data.images)
            {
              that.data.number=that.data.number+1
              var numstring=that.data.number.toString()
              var numberlist=[{
                newUrl:image,
                key:numstring
              }]
              that.data.list=[...that.data.list,...numberlist]
            }
            (that.data.list)
      }
    })
  },
  deletePetSpace:function(event){
    (event.petspaceid)
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/deletePetSpace/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        PetSpaceID:this.data.petspaceid
      },
      success:function(res) {
        wx.switchTab({
          url:'/pages/petspace/petspace'
        })
      }
    })
  },
  showall:function(e){
    this.setData({
      show:true
    })
  },
  takephoto:function(e){
    wx.navigateTo({
      url:'/pages/photo/photo'
    })
  },
  deletePhoto:function(e){
    var index = this.data.number;
    (e)
    var petspaceid=this.data.petspaceid
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
       if (res.confirm) {
        ('点击确定了');
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/deletePhoto/',
          method:"GET",
          header: {'content-type': 'application/json' //
          },
          data:{
            PetSpaceID:petspaceid,
            index:index
          },
          success:function(res) {
            wx.navigateTo({
              url:'/pages/petdetail/petdetail?petspaceid='+app.globalData.petspaceid,
            })
          }
        })
       } else if (res.cancel) {
         ('点击取消了');
         return false;   
        }
      }
   
     })
  },
  getimageID:function(e){
    (e)
    this.setData({
      number:e.detail.index
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