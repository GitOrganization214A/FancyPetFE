// edit.ts

import { parseTimeData } from "../../miniprogram_npm/@vant/weapp/count-down/utils";

// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()


Page({
  data: {
    userInfo: {

    },
    show: false,
    options:[],
    fieldValue: '',
    cascaderValue: '',
    activityid:'',
    images:[],
    titlecontent:[],
    atccontent:[],
    responseData:[],
    beip:"192.168.187.1",
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    giveupUrl:"../../resource/giveup.png",

    currentTextNumber:0,

    maxTextLen: 1024,

  },
  onLoad(e){
      this.setData({
            activityid:e.activityid
      })
  },
  // 事件处理函数
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
  guEdit: function(e) {
      console.log("gu")
      wx.switchTab({
          url:"/pages/activity/activity"
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
  sendlove: function(e) {
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyLove/',//todo
        data:{
            openid:app.globalData.openid,
            content:that.data.atccontent,
            PetSpaceID:that.data.cascaderValue,
            ActivityID:that.data.activityid,
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success:function(res) {
            console.log(res.data)
            wx.switchTab({
                url:"../activity/activity",
                success(){
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.actlove();
                    console.log(page)
                }
            })
            wx.showToast({
                title: '发送成功！',
                icon: 'none',
                duration: 2000
            })
        },
        fail:function(res){
            console.log("failed")
        }
    })



    
    

    
  },
  
})