// edit.ts
// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()



Page({
  data: {
    userInfo: {

    },
    images:[],
    titlecontent:[],
    atccontent:[],
    beip:"192.168.187.1",
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    chooseImageUrl:"../../resource/chooseImage.png",
    giveupUrl:"../../resource/giveup.png",
    currentTitleNumber: 0,
    currentTextNumber:0,
    maxTitleLen: 30,
    maxTextLen: 1024,
    atcid:"0"
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
  choseImage: function() {
    var that = this;
    if (this.data.images.length  < 9) {
      wx.chooseImage({//选择图片
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
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/postArticle/',
        data:{
            openid:app.globalData.openid,
            ArticleID:'0',
            title:that.data.titlecontent,
            content:that.data.atccontent
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success:function(res) {
            console.log(res.data)
            var atcid = res.data.ArticleID
            for (let path of that.data.images)
            {
                console.log(atcid)  
                wx.uploadFile({
                    url: 'http://43.143.139.4:8000/api/v1/postArticle/', 
                    filePath: path,
                    name: 'image',
                    formData: {
                    ArticleID:atcid,
                    },
                    success (res){
                        wx.switchTab({
                            url:"/pages/forum/forum"
                        })
                    }
                })
            }
        },
        fail:function(res){
            console.log("failed")
        }
    })



    
    

    
  },
  
})