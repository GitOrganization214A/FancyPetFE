// pages/addrecord/addrecord.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giveupUrl:"../../resource/th.png",
    array:['打喷嚏','呕吐','腹泻','发烧','外伤','抽搐','嗜睡','发情'],
    index: 0,
    date: new Date().toJSON().substring(0, 10),
    currentTextNumber:0,
    atccontent:'',
    images:[],
    maxTextLen: 140
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      date: new Date().toJSON().substring(0, 10)
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    var splitted = e.detail.value.split("-", 3)
    var splitted2=new Date().toJSON().substring(0, 10).split("-", 3)
    var selectdate=splitted[0]+splitted[1]+splitted[2]
    var nowdate=splitted2[0]+splitted2[1]+splitted2[2]

    if (selectdate<nowdate){

      this.setData({
        date: e.detail.value
      })
    }
    else{

    this.setData({
      date: new Date().toJSON().substring(0, 10)
    })
    } 
  },
  inputText:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length)
    this.setData({
        currentTextNumber: len,
        atccontent: value 
    })
    this.data.currentTextNumber=len
    this.data.atccontent=value
},
chooseImage(e){
  var filelist = e.detail.file
  var originfilelist = this.data.images
  var newfilelist=[...originfilelist,...filelist]
  this.setData({
      images:newfilelist
  })
},
delimage(e){
var id = e.detail.index   //能获取到对应的下标
var delfileList = this.data.images  //这里是前端页面展示的数组
delfileList.splice(id,1)
this.setData({
  images:delfileList,  //在这里进行重新赋值  删除后 图片剩几张就相当于给后台传几张
})
},
addNewRecord: function(e) {
  var that = this
  var num=this.data.index
  wx.request({
      url: 'http://43.143.139.4:8000/api/v1/addHealthRecord/',
      data:{
          openid:app.globalData.openid,
          PetSpaceID:app.globalData.petspaceid,
          date:that.data.date,
          content:that.data.atccontent,
          type:that.data.array[num]
      },
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      success:function(res) {
        wx.navigateBack({
          delta: 1
        })
      },
      fail:function(res){
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
  goback(){
    wx.navigateBack({
      delta: 1
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