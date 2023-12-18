// pages/petdetail/petdetail.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petspaceid:'',
    number:0,
    index:[0,1,2,3,4,5,6,7,8],
    images:[],
    avatar:'',
    current:0,
    show:false,
    moreUrl:"../../resource/more.png",
    showActionsheet:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(event) {
    
  },
  deletePetSpace:function(event){
    console.log(event.petspaceid)
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
  gotorecord:function(e){
    wx.navigateTo({
      url:'/pages/record/record'
    })
  },
  takephoto:function(e){
    wx.navigateTo({
      url:'/pages/photo/photo'
    })
  },
  deletePhoto:function(e){
    var that=this
    var index = this.data.number;
    console.log(e)
    console.log(index)
    var petspaceid=this.data.petspaceid
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
       if (res.confirm) {
        console.log('点击确定了');
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
  getimageID:function(e){
    console.log(e)
    this.setData({
      number:e.detail.current
    })
  },
  correctInfo:function(e){
    wx.navigateTo({
      url:'/pages/correctInfo/correctInfo?petspaceid='+app.globalData.petspaceid,
    })
  },
  showall:function(e){
    this.setData({
      show:true
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
    this.data.petspaceid = app.globalData.petspaceid
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
          that.setData({
            avatar: res.data.avatar+"?v="+new Date().getTime()
          })
          console.log(res.data.images)
          that.setData({
            images: res.data.images
          })
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.images
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