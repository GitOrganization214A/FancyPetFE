// activity.ts
import { areaList } from '../../miniprogram_npm/@vant/area-data/data';
const app = getApp<IAppOption>()


Page({
  data: {
    actmain:true,
    actadopt:false,
    actmedic:false,
    actlove:false,
    actcloud:false,
    activitylist:[],
    pageindex:0,
    show: false,
    fieldValue: '',
    cascaderValue: '',
    options:[],
    areaList,
    navigationurl:"../../resource/navigationbar.png",
    adopturl:"../../resource/adopt.png",
    medicurl:"../../resource/medic.png",
    loveurl:"../../resource/love.png",
    cloudpeturl:"../../resource/cloudpet.png",
    backurl:"../../resource/back.png",
    editadoptUrl:"../../resource/EditButton.jpg"
  },
  onLoad(){
    this.setData({
        actmain:true,
        actadopt:false,
        actlove:false,
        actcloud:false,
        pageindex:0
    })
  },
  actadopt(){
      this.setData({
          actmain:false,
          actadopt:true,
          pageindex:1
      })
      var that = this
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/adoptPet/',
        data:{
          openid:app.globalData.openid
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          that.setData({
            activitylist: res.data
          })
          console.log(res.data)
          console.log(that.data.actadopt)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  },
  switchpage(){
      var curindex = this.data.pageindex
      if(curindex < 5)
      {
          this.setData({
            actmain:true,
            actadopt:false,
            actlove:false,
            actcloud:false,
            pageindex:0
          })
          
      }

  },

  actmedic(){
    this.setData({
        actmain:false,
        actmedic:true,
        pageindex:2
    })
    // var that = this
    // wx.request({
    //   url: 'http://43.143.139.4:8000/api/v1//',
    //   data:{
    //     openid:app.globalData.openid,        
    //   },
    //   method: 'GET',
    //   header: {'content-type': 'application/json' //
    //   },
    //   success: function(res) {
    //     that.setData({
    //       activitylist: res.data
    //     })
    //     console.log(res.data)
    //     console.log(that.data.actadopt)
    //   },
    //   fail:function(res){
    //       console.log(res.errMsg)
    //   }
    // })
  },

  actlove(){
    this.setData({
        actmain:false,
        actlove:true,
        pageindex:3
    })
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/lovePet/',//todo
      data:{
        openid:app.globalData.openid,      
      },
      method: 'GET',
      header: {'content-type': 'application/json' //
      },
      success: function(res) {
         that.setData({
           activitylist: res.data
         })
         console.log(res.data)
         console.log(that.data.activitylist)
      },
      fail:function(res){
           console.log(res.errMsg)
      }
    })
  },

  editAdopt(){
    wx.navigateTo({
        url:"../editAdopt/editAdopt"
    })
  },
  editLove(){
    wx.navigateTo({
        url:"../editLove/editLove"
    })
  },
  surf(e){
    console.log(e.currentTarget.id)
    var aid = e.currentTarget.id
    var pid = -1
    for (var activ of this.data.activitylist)
    {
        if(activ.ActivityID==aid)
        {
            pid = activ.PetSpaceID
            break
        }
    }
    wx.navigateTo({
        url:"../petdetail/petdetail?petspaceid="+pid
    })
  },
  adopt(e){
    console.log(e)

    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyAdopt/',
        data:{
          openid:app.globalData.openid,
          ActivityID:e.currentTarget.id
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            console.log(res.data.openid)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  },
  love(e){
    var that = this
    this.setData({
      show: true,
    });
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyLove/',
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

    console.log(e)

    
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e) {
    var that = this
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
    })
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyLove/',//todo
        data:{
          openid:app.globalData.openid,
          ActivityID:e.currentTarget.id,
          petSpaceid:that.data.fieldValue,//todo
          type:"love"
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            console.log(res.data.openid)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  },

});