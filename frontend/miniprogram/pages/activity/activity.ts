// activity.ts
import { areaList } from '../../miniprogram_npm/@vant/area-data/data';
const app = getApp<IAppOption>()
var indx = 0
Page({
  data: {
    actmain:true,
    actadopt:false,
    actparty:false,
    actlove:false,
    actcloud:false,
    activitylist:[],
    pageindex:0,
    show: false,
    showadopt: false,
    showlove: false,
    showparty:false,
    fieldValue: '',
    cascaderValue: '',
    options:[],
    areaList,
    currentadoptNumber: 0,
    currentwxNumber: 0,
    maxadoptLen: 200,
    wxcontent: '',
    adoptcontent: '',
    adoptTarget: '',
    navigationurl:"../../resource/navigationbar.png",
    adopturl:"../../resource/adopt.png",
    partyurl:"../../resource/party.png",
    loveurl:"../../resource/love.png",
    cloudpeturl:"../../resource/cloudpet.png",
    backurl:"../../resource/back.png",
    editadoptUrl:"../../resource/EditButton.jpg",
    giveupUrl:"../../resource/giveup.png",
    tolikeUrl:"../../resource/tolike.png",
    likedUrl:"../../resource/liked.png",
    commentUrl:"../../resource/comment.png",
    shareUrl:"../../resource/share.png",
    partyUrl:'',
    partytitle:'',
    partyaddress:'',
    partydate:'',
    partycontent:'',
    hkindex: 0,
  },
  onLoad(){
    this.setData({
        actmain:true,
        actadopt:false,
        actlove:false,
        actparty:false,
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
          openid:app.globalData.openid,
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          that.setData({
            activitylist: res.data
          })
          that.data.activitylist = res.data
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
            actparty:false,
            actcloud:false,
            pageindex:0
          })
          
      }
      console.log(this.data)

  },

  actparty(){
    this.setData({
        actmain:false,
        actparty:true,
        pageindex:2
    })
    var that = this
    
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/partyPet/',
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
          that.data.activitylist = res.data
          console.log(res.data)
          console.log(that.data.actadopt)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
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
         that.data.activitylist = res.data
         console.log(res.data)
         console.log(that.data.activitylist)
      },
      fail:function(res){
           console.log(res.errMsg)
      }
    })
  },
  actcloud(){
    this.setData({
        actmain:false,
        actcloud:true,
        pageindex:4
    })
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/petVideos/',//todo
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
         that.data.activitylist = res.data
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
  editParty(){
    wx.navigateTo({
        url:"../editParty/editParty"
    })
  },
  surf(e){
    console.log(e)
    var aid = e.currentTarget.dataset.index
    var pid = -1
    for (var activ of this.data.activitylist)
    {
        if(activ.ActivityID==aid)
        {
            pid = activ.PetSpaceID
            break
        }
    }
    console.log(aid)
    console.log(pid)
    wx.navigateTo({
        url:"../petdetailshow/petdetailshow?petspaceid="+pid
    })
  },
  surfParty(e){
    var aid = e.currentTarget.dataset.index
    for(let party of this.data.activitylist)
    {
        if(party.ActivityID==aid)
        {
            this.setData({
                showparty:true,
                partyUrl:party.img,
                partytitle:party.title,
                partydate:party.time,
                partyaddress:party.address,
                partycontent:party.content
            })
        }
    }
  },
  adopt(e){
    console.log(e)
    this.setData({
        showadopt:true,
        adoptTarget:e.target.dataset.index
    })
  },
  deleteactivity(e){
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/deleteActivity/',//todo
        data:{
          openid:app.globalData.openid,  
          ActivityID:e.currentTarget.dataset.index
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            var aid = e.currentTarget.dataset.index
            var aindex = -1
            var templist = that.data.activitylist
            for (var activ of templist)
            {
                aindex ++
                if(activ.ActivityID==aid)
                {
                    templist.splice(aindex,1)
                    that.setData({
                        activitylist:templist
                    })
                    that.data.activitylist=templist
                    console.log(that.data.activitylist)
                    break
                }
            }
        },
        fail:function(res){
            console.log(res.errMsg)
        }
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
  guadopt(e){
    this.setData({
        showadopt:false,
        currentadoptNumber: 0,
        adoptcontent: ''
    })
  },
  guparty(e){
    this.setData({
        showparty:false,
    })
  },
  sendadopt(e){
    var that = this 
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyAdopt/',
        data:{
          openid:app.globalData.openid,
          ActivityID:that.data.adoptTarget,
          content:that.data.adoptcontent,
          wxid:that.data.wxcontent
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            console.log(res.data.openid)
            wx.showToast({
                title: '发送成功！',
                icon: 'none',
                duration: 2000
            })
            that.setData({
                showadopt:false,
                currentadoptNumber: 0,
                adoptcontent: '',
                wxcontent:''
            })
            that.data.currentadoptNumber=0
            that.data.adoptcontent='' 
            that.data.wxcontent='' 
        },
        fail:function(res){
            console.log(res.errMsg)
        }
    })
  },
  love(e){
    wx.navigateTo({
        url:"../editsendLove/editsendLove?activityid="+e.currentTarget.dataset.index
    })
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e) {
    var that = this
    console.log(e)
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
            console.log(e.currentTarget.id)
            console.log(that.data.fieldValue)
            console.log(res.data.openid)
        },
        fail:function(res){
            console.log(res.errMsg)
        }
      })
  },
  participate(e){
    var that = this 
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/applyParty/',
        data:{
          openid:app.globalData.openid,
          ActivityID:e.currentTarget.dataset.index
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
            console.log(res.data.openid)
            wx.showToast({
                title: '发送成功！',
                icon: 'none',
                duration: 2000
            })
        },
        fail:function(res){
            console.log(res.errMsg)
        }
    })
  },
  bindchangev(e) {
    this.setData({
      hkindex: e.detail.current
    })
    let videoContext = wx.createVideoContext("myvideo" + e.detail.current + "")
    let videoContexta = wx.createVideoContext("myvideo" + indx + "")  
    indx = e.detail.current;
    videoContexta.pause();
    videoContexta.seek(0);
    videoContext.play();
    let xz = this.data.activitylist.length- e.detail.current ;
  },
  videolike(e) {
    var tempid = e.currentTarget.dataset.atcid
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/likeArticle/',
        method: 'GET',
        data: {
          openid: app.globalData.openid, // 传递需要点赞的帖子openid
          ArticleID: articleid, 
          operation: "like",
        },
        success: (res) => {
        // 更新点赞数、按钮颜色和状态
          if(that.data.currentTab==='hot')
          {
            const currentItem = that.data.hotPosts[index];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            // 使用 splice 方法更新数组中特定项的值
            that.data.hotPosts.splice(index, 1, updatedItem);
            that.setData({
              ['hotPosts']: that.data.hotPosts
            });
          }
          else if(that.data.currentTab==='following')
          {
            const currentItem = that.data.followPosts[index];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            // 使用 splice 方法更新数组中特定项的值
            that.data.followPosts.splice(index, 1, updatedItem);
            that.setData({
              ['followPosts']: that.data.followPosts
            });
          }
        }
      });
  },
});