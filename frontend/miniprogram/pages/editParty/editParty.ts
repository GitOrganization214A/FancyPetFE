// edit.ts

import { parseTimeData } from "../../miniprogram_npm/@vant/weapp/count-down/utils";

// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()


Page({
  data: {
    userInfo: {

    },
    text: '',
    avatarUrl:'../../resource/cameraparty.png',
    show: false,
    titlecontent:[],
    addrcontent:[],
    atccontent:[],
    responseData:[],
    date:[],
    beip:"192.168.187.1",
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    giveupUrl:"../../resource/giveup.png",
    currentTitleNumber: 0,
    currentAddrNumber: 0,
    currentTextNumber: 0,
    maxTitleLen: 30,
    maxAddrLen: 50,
    maxTextLen: 100,

  },
  chooseAvatar(event){

    this.setData({
        avatarUrl:event.detail.avatarUrl
    })
    this.data.avatarUrl = event.detail.avatarUrl
  },
  // 事件处理函数
  inputAddr:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length)
    this.setData({
        currentAddrNumber: len,
        addrcontent: value 
    })
    this.data.currentAddrNumber=len
    this.data.addrcontent=value
  },
  inputTitle:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length)
    this.setData({
        currentTitleNumber: len,
        titlecontent: value
    })
    this.data.currentTitleNumber=len
    this.data.titlecontent=value

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
  guEdit: function(e) {

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
          

        },
      })
  },
  sendlove: function(e) {
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/postLove/',//todo
        data:{
            openid:app.globalData.openid,
            content:that.data.atccontent,
            PetSpaceID:that.data.cascaderValue,
        },
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        success:function(res) {

            wx.switchTab({
                url:"../activity/activity",
                success(e){
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.actlove();

                }
            })
        },
        fail:function(res){

        }
    })



    
    

    
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {

    this.setData({
      show: false,
      date:this.formatDate(event.detail)
    });
  },
  sendparty: function(e) {
    var that = this

    wx.uploadFile({
        url: 'http://43.143.139.4:8000/api/v1/postParty/', 
        filePath: that.data.avatarUrl,
        name: 'image',
        formData: {
            openid:app.globalData.openid,
            date:"时间:"+that.data.date,
            address:"地点:"+that.data.addrcontent,
            title:that.data.titlecontent,
            content:that.data.atccontent,
        },
        success (res){

            wx.switchTab({
                url:"../activity/activity",
                success(e){
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.actparty();

                }
            })
        },
        fail (res){

        }
    })
  }
})