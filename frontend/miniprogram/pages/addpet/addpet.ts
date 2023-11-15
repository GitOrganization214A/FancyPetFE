// edit.ts
// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()



Page({
  data: {
    userInfo: {

    },
    images:[],
    year:[],
    month:[],
    gender:[],
    titlecontent:[],
    beip:"192.168.187.1",
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    chooseImageUrl:"../../resource/chooseImage.png",
    giveupUrl:"../../resource/giveup.png",
    currentTitleNumber: 0,
    currentTextNumber:0,
    maxTitleLen: 30,
    maxTextLen: 1024
  },
  // 事件处理函数
  inputTitle:function(e){
        var value = e.detail.value;
        var len = parseInt(value.length)
        this.setData({
            currentTitleNumber: len,
            titlecontent: value
        })
        this.data.currentTitleNumber=len
        this.data.titlecontent=value
        console.log(this.data.titlecontent)
  },
  inputYear:function(e){
        var count=e.detail.count;
        this.setData({
          year: count
        })
        this.data.year=count
  },
  inputMonth:function(e){
    var count=e.detail.count;
    this.setData({
      month: count
    })
    this.data.month=count
  },
  getGender:function(e){
    var Gender=e.detail.value;
    this.setData({
      gender: Gender
    })
    this.data.gender=Gender
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  chosePetImage: function(e) {
    var that = this;
    if (this.data.images.length  < 1) {
      wx.chooseImage({//选择图片.
        count:1,//一张图片
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            images: that.data.images.concat(res.tempFilePaths),
 
          })
          console.log(that.data.images)
          
        }
      })
    } 
    else{
        wx.showToast({
            title: '最多选择九张图片！',
            icon: 'none',
            duration: 3000
          })
    }
  },
  guEdit: function(e) {
      console.log("gu")
      wx.switchTab({
          url:"/pages/forum/forum"
      })
  },
  sendAtc: function(e) {
    const tempFilePaths=this.data.images[0]
    wx.uploadFile({
      url: 'http://43.143.139.4:8000/api/v1/newPetSpace/', 
      filePath: tempFilePaths,
      name: 'avatar',
      formData: {
        openid:app.globalData.openid,
        name:this.data.titlecontent,
        year:this.data.year,
        month:this.data.month,
        gender:this.data.gender,
        breed:"111222"
      },
      success (res){
        console.log(res.data)
        wx.switchTab({
          url:'/pages/petspace/petspace'
        })

        //do something
      }
    })

    
  },
  
})