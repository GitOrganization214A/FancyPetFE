// pages/addcost/addcost.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    giveupUrl:"../../resource/th.png",
    fieldValue: '',
    show: false,
    cascaderValue: 0,
    array:['宠物食品','疫苗','宠物玩具','购买宠物','生病','服饰'],
    index: 0,
    date: new Date().toJSON().substring(0, 10),
    currentTextNumber:0,
    maxTextLen: 140,
    atccontent:[],
    money: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      date: new Date().toJSON().substring(0, 10)
    })
  },
  handleInput(e) {
    this.setData({
      money:  `￥${e.detail.value}`.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '￥$1')
    })
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
  goback(){
    wx.navigateBack({
      delta: 1
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
  addNewCost(e){
  var that = this
  var num=this.data.index
  var cost=Number(this.data.money.substring(this.data.money.lastIndexOf("￥")+1,this.data.money.length))
  wx.request({
      url: 'http://43.143.139.4:8000/api/v1/addBill/',
      data:{
          openid:app.globalData.openid,
          PetSpaceID:that.data.cascaderValue,
          date:that.data.date,
          content:that.data.atccontent,
          type:that.data.array[num],
          money:cost
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