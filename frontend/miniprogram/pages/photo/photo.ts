// pages/photo/photo.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh:0,
    src:'',
    pos:'back',
    istake:0
  },
  takePhoto() {
    const ctx = wx.createCameraContext();
    var that = this;
    ctx.takePhoto({
     quality: 'high',
     success: (res) => {
     //res.tempImagePath表示获取到的图片地址
      that.setData({ src: res.tempImagePath });
    }
  }); 
  },
  choosePhoto(){
    var that = this;
    wx.chooseImage({
     count: 1,
     mediaType:['image'],
     sizeType: ['original'],
     sourceType: ['album'],
     success (res) {
      if(res.errMsg === 'chooseImage:ok' && res.tempFilePaths.length !== 0) {          
        that.setData({            
        src: res.tempFilePaths[0]          
        })
    }
  }
  })
 },
 reChoose:function(){
   this.setData({
     src:''
   })
 },
 changePos:function(){
   if(this.data.pos=='back'){
  this.setData({
    pos:'front'
  })
  }
  else if(this.data.pos=='front'){
    this.setData({
      pos:'back'
    })
    }
 },
 addtoAlbum:function(){
  var image=this.data.src
  wx.uploadFile({
    url: 'http://43.143.139.4:8000/api/v1/newPhoto/', 
    filePath: image,
    name: 'image',
    formData: {
      PetSpaceID:app.globalData.petspaceid
    },
    success (res){
      wx.navigateBack({
        delta: 1
      })
    }
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  var sysinfo=wx.getSystemInfoSync();
  var windowHeight=sysinfo.screenHeight;
  this.setData({
    wh:windowHeight-125
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