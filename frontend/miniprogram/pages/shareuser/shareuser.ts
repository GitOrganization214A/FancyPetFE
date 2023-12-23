// pages/shareuser/shareuser.ts
const app = getApp<IAppOption>()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    show: false,
    options:[],
    cascaderValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e) {
    wx.showModal({
      title: '提示',
      content: '确定将该宠物主人换为此人吗？',
      success: function (res) {
       if (res.confirm) {
        const { selectedOptions, value } = e.detail;
        const fieldValue = selectedOptions
            .map((option) => option.text || option.name)
            .join('/');
        console.log('点击确定了');
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/changeOwner/',
          method:"GET",
          header: {'content-type': 'application/json' //
          },
          data:{
            openid:app.globalData.openid,
            PetSpaceID:app.globalData.petspaceid,
            UserID:value
          },
          success:function(res) {
            console.log("成功")
          }
        })
       } else if (res.cancel) {
         console.log('点击取消了');
         return false;   
        }
      }
   
     })
  },
  addtoShare(){
    var that=this
    wx.showModal({
      editable:true,//显示输入框
      placeholderText:'输入UserID',//显示输入框提示信息
      success: res => {
        if (res.confirm) { //点击了确认
          console.log(res.content)
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/addShareUser/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
              openid:app.globalData.openid,
              PetSpaceID:app.globalData.petspaceid,
              UserID:res.content
            },
            success:function(res) {
              console.log("成功")
              that.onShow()
            }
          })
        } else {
          console.log('用户点击了取消')
        }
      }
    })
  },
  changeowner(){
    var that = this
    this.setData({
      show: true,
    });
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
      url: 'http://43.143.139.4:8000/api/v1/showShareUsers/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        PetSpaceID:app.globalData.petspaceid
      },
      success:function(res) {
        console.log("aaaaaa")
          that.setData({
            ShareUserList: res.data
          })
          var op = []
          for (let user of res.data)
          {
              op.push({
                  text:user.nickname,
                  value:user.UserID
              })
          }
          that.setData({
              options:op,
          })
      }
    })
  },
  deleteShareUser(e){
    var that=this
    console.log(e)
    wx.showModal({
      title: '提示',
      content: '确定要删除此共享用户吗？',
      success: function (res) {
       if (res.confirm) {
        console.log('点击确定了');
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/deleteShareUser/',
          method:"GET",
          header: {'content-type': 'application/json' //
          },
          data:{
            openid:app.globalData.openid,
            PetSpaceID:app.globalData.petspaceid,
            UserID:e.currentTarget.dataset.userid
          },
          success:function(res) {
            console.log("成功")
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