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
    atcid:"0",
    show: false,
    options:[],
    fieldValue: '',
    cascaderValue: '',
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
//   choseImage: function() {
//     var that = this;
//     if (this.data.images.length  < 9) {
//       wx.chooseImage({//选择图片
//         count:1,//一张图片
//         sizeType: ['original', 'compressed'],
//         success: function (res) {
//           that.setData({
//             images: that.data.images.concat(res.tempFilePaths),
 
//           })
//           console.log(that.data.images)
          
//         }
//       })
//     } 
//     else{
//         wx.showToast({
//             title: '最多选择九张图片！',
//             icon: 'none',
//             duration: 3000
//           })
//     }
//   },
  chooseImage(e){
      var filelist = e.detail.file
      var originfilelist = this.data.images
      var newfilelist=[...originfilelist,...filelist]
      this.setData({
          images:newfilelist
      })
      console.log(newfilelist)
  },
  delimage(e){
    var id = e.detail.index   //能获取到对应的下标
    var delfileList = this.data.images  //这里是前端页面展示的数组
    delfileList.splice(id,1)
    this.setData({
      images:delfileList,  //在这里进行重新赋值  删除后 图片剩几张就相当于给后台传几张
    })
  },
  guEdit: function(e) {
      console.log("gu")
      wx.switchTab({
          url:"/pages/forum/forum"
      })
  },
  handleclicksc(e) {
    this.showvideoplay = true;
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
            if(that.data.images.length<1)
            {
                    wx.switchTab({
                    url:"/pages/forum/forum"
               })
               
            }

            console.log(res.data)
            var atcid = res.data.ArticleID
            for (let path of that.data.images)
            {
                console.log(path.url)  
                wx.uploadFile({
                    url: 'http://43.143.139.4:8000/api/v1/postArticle/', 
                    filePath: path.url,
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
  onClick() {
    var that = this
    this.setData({
      show: true,
    });
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/PetSpaces/',
        data:{
          openid:app.globalData.openid
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          var op = []
          for (let pet of res.data)
          {
              op.push({
                  text:pet.name,
                  value:pet.PetSpaceID
              })
          }
          that.setData({
              options:op,
          })
          
          console.log(res.data)
        },
      })
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
    })
  },
  
})