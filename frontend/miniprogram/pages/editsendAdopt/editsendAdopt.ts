// edit.ts

import { parseTimeData } from "../../miniprogram_npm/@vant/weapp/count-down/utils";

// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()


Page({
  data: {
    userInfo: {

    },
    activityid:'',
    wxcontent:'',
    adoptcontent:'',
    currentwxNumber:0,
    currentadoptNumber:0,
    maxadoptLen:200,
  },
  onLoad(e){
    this.setData({
          activityid:e.activityid
    })
  },
  inputwx:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length)
    this.setData({
        currentwxNumber: len,
        wxcontent: value
    })
    this.data.currentwxNumber=len
    this.data.wxcontent=value    
    console.log(this.data.adoptcontent)
  },
  inputadopt:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length)
    this.setData({
        currentadoptNumber: len,
        adoptcontent: value
    })
    this.data.currentadoptNumber=len
    this.data.adoptcontent=value    
    console.log(this.data.adoptcontent)
  },
  sendadopt(e){
    var that = this 
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyAdopt/',
        data:{
          openid:app.globalData.openid,
          ActivityID:that.data.activityid,
          content:that.data.adoptcontent,
          wxid:that.data.wxcontent
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            console.log(res.data.openid)
            wx.switchTab({
                url:"../activity/activity",
                success(){
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.actadopt();
                    console.log(page)
                }
            })
            wx.showToast({
                title: '发送成功！',
                icon: 'none',
                duration: 2000
            })
            that.setData({
                currentadoptNumber: 0,
                currentwxNumber: 0,
                adoptcontent: '',
                wxcontent:''
            })
        },
        fail:function(res){
            console.log(res.errMsg)
        }
    })
  },
  
})