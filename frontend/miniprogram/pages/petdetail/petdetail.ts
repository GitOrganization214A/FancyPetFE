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
    status:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(event) {
    
  },
  setpublic:function(e){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要修改宠物空间公开状态吗？',
      success: function (res) {
       if (res.confirm) {
        ('点击确定了');
        if(that.data.status){
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/setPublic/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
                PetSpaceID:app.globalData.petspaceid,
                openid:app.globalData.openid,
                operation:'private',
            },
            success:function(res) {
              that.onShow()
            }
          })
        }
        else{
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/setPublic/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
                PetSpaceID:app.globalData.petspaceid,
                openid:app.globalData.openid,
                operation:'public',
            },
            success:function(res) {
              that.onShow()
            }
          })
        }
       } else if (res.cancel) {
         ('点击取消了');
         return false;   
        }
      }
   
     })
  },
  deletePetSpace:function(event){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定要删除此宠物空间吗？',
      success: function (res) {
       if (res.confirm) {
        ('点击确定了');
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/deletePetSpace/',
          method:"GET",
          header: {'content-type': 'application/json' //
          },
          data:{
            PetSpaceID:that.data.petspaceid,
            openid:app.globalData.openid
          },
          success:function(res) {
            wx.switchTab({
              url:'/pages/petspace/petspace'
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
  gotorecord:function(e){
    wx.navigateTo({
      url:'/pages/record/record'
    })
  },
  gotouser:function(e){
    wx.navigateTo({
      url:'/pages/shareuser/shareuser'
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
    (e)
    (index)
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
            openid:app.globalData.openid,
            index:index
          },
          success:function(res) {
            that.onShow()
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
        PetSpaceID:this.data.petspaceid,
        openid:app.globalData.openid
      },
      success:function(res) {
          that.setData({
            PetSpaceDetail: res.data
          })
          that.setData({
            avatar: res.data.avatar+"?v="+new Date().getTime()
          })
          (res.data.images)
          that.setData({
            status: res.data.public
          })
      },
      fail(err){
        wx.showToast({
          title: '该宠物空间无法查看',
          icon: 'none',
          duration: 2000//持续的时间
        })
        wx.navigateBack({
          delta: 1
        });
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