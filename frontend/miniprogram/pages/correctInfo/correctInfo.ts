// pages/correctInfo/correctInfo.ts
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()



Page({
  data: {
    userInfo: {

    },
    images:'',
    year:0,
    month:1,
    gender:[],
    breed:"边境牧羊犬",
    titlecontent:[],
    beip:"192.168.187.1",
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    chooseImageUrl:"../../resource/chooseImage.png",
    giveupUrl:"../../resource/giveup.png",
    currentTitleNumber: 0,
    currentTextNumber:0,
    maxTitleLen: 30,
    maxTextLen: 1024,
    multiArray: [['狗狗', '猫猫', '兔兔', '鼠鼠', '鸟儿', '鱼儿', '龟'], ['边境牧羊犬', '博美犬', '哈士奇', '瑞典柯基犬', '金毛寻回犬']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '狗狗'
        },
        {
          id: 1,
          name: '猫猫'
        },
        {
          id: 2,
          name: '兔兔'
        },
        {
          id: 3,
          name: '鼠鼠'
        },
        {
          id: 4,
          name: '鸟儿'
        },
        {
          id: 5,
          name: '鱼儿'
        },
        {
          id: 6,
          name: '龟'
        }
      ], [
        {
          id: 0,
          name: '边境牧羊犬'
        },
        {
          id: 1,
          name: '博美犬'
        },
        {
          id: 2,
          name: '哈士奇'
        },
        {
          id: 3,
          name: '瑞典柯基犬'
        },
        {
          id: 4,
          name: '金毛寻回犬'
        }
      ]
    ],
    multiIndex: [0, 0]
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
  bindMultiPickerChange: function (e) {
    var Breed=this.data.multiArray[1][e.detail.value[1]];
    console.log('picker发送选择改变，携带值为', this.data.multiArray[1][e.detail.value[1]])
    this.setData({
      breed: Breed
    })
    this.data.breed=Breed
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['边境牧羊犬', '博美犬', '哈士奇', '瑞典柯基犬', '金毛寻回犬'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
          case 1:
            data.multiArray[1] = ['美国短毛猫', '加菲猫', '英国短毛猫', '波斯猫', '苏格兰折耳猫'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
          case 2:
            data.multiArray[1] = ['垂耳兔', '猫猫兔', '侏儒兔'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
          case 3:
            data.multiArray[1] = ['三线仓鼠', '天竺鼠', '豚鼠', '龙猫'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
          case 4:
            data.multiArray[1] = ['金丝雀', '鹦鹉', '百灵鸟'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
          case 5:
            data.multiArray[1] = ['孔雀鱼', '草金鱼', '中国斗鱼'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
          case 6:
            data.multiArray[1] = ['巴西龟', '火焰龟'];
            this.data.multiArray[1]=data.multiArray[1];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(this.data.multiArray[1])
    console.log(data.multiIndex);
    this.setData(data);
  },
  chosePetImage: function(e) {
    var that = this;
    wx.chooseImage({//选择图片.
        count:1,//一张图片
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            images: res.tempFilePaths,
 
          })
          console.log(that.data.images)
          
        }
    })
  },
  guEdit: function(e) {
      console.log("gu")
      wx.navigateBack({
        delta: 1
      })
  },
  onLoad(e){
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewPetSpace/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        PetSpaceID:app.globalData.petspaceid
      },
      success:function(res) {
          that.setData({
            PetSpaceDetail: res.data
          })
          console.log(res.data.avatar)
          that.setData({
            images: res.data.avatar,
            titlecontent:res.data.name,
            currentTitleNumber:res.data.name.length,
            year:res.data.year,
            month:res.data.month,
            gender:res.data.gender,
            breed:res.data.breed
          })
      }
    })
  },
  sendAtc: function(e) {
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/changePetInfo/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        PetSpaceID:app.globalData.petspaceid,
        openid:app.globalData.openid,
        avatar:this.data.images,
        name:this.data.titlecontent,
        year:this.data.year,
        month:this.data.month,
        gender:this.data.gender,
        breed:this.data.breed
      },
      success:function(res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })

    
  },
  
})