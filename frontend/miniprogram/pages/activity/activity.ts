// activity.ts
import { areaList } from '../../miniprogram_npm/@vant/area-data/data';
import { videoProps } from '../../miniprogram_npm/@vant/weapp/uploader/shared';
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
var indx = 0
Page({
  data: {
    actadopt:false,
    actparty:false,
    actlove:false,
    actcloud:false,
    pageAdopt:1,
    pageParty:1,
    pageLove:1,
    pageCloud:1,
    morePost:true,
    activitylist:[],
    pageindex:0,
    show: false,
    showadopt: false,
    showlove: false,
    showparty:false,
    showcomment:false,
    hotOrTime:true,
    fieldValue: '',
    cascaderValue: '',
    commentTarget: '',
    options:[],
    areaList,
    title:"",
    currentadoptNumber: 0,
    currentwxNumber: 0,
    currentcommentNumber: 0,
    maxadoptLen: 200,
    maxcommentLen: 200,
    wxcontent: '',
    adoptcontent: '',
    commentcontent: '',
    adoptTarget: '',
    videocomments: [],
    navigationurl:"../../resource/navigationbar.png",
    adopturl:"../../resource/adopt.png",
    partyurl:"../../resource/party.png",
    loveurl:"../../resource/love.png",
    cloudpeturl:"../../resource/cloudpet.png",
    backurl:"../../resource/back.png",
    editadoptUrl:"../../resource/EditButtonr.png",
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
    keyboardHeight: 0,
    colorcloud:'black',
    coloradopt:'black',
    colorparty:'black',
    colorlove:'black',
    current:0,
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  onLoad(){
    this.setData({
        actadopt:false,
        actlove:false,
        actparty:false,
        actcloud:true,
        pageAdopt:1,
        pageParty:1,
        pageLove:1,
        pageCloud:1,
        activitylist:[],
        colorcloud:'coral',
        coloradopt:'black',
        colorparty:'black',
        colorlove:'black',
        pageindex:0,
        title:"宠物活动"
    })
    this.actcloud()
  },
  onReachBottom: function () {
    var that =this
    if (that.data.morePost && that.data.actadopt) {
        that.actadopt();
    }
    else if (that.data.morePost && that.data.actparty) {
        that.actparty();
    }
    else if (that.data.morePost && that.data.actlove) {
        that.actlove();
    }
    else if (that.data.morePost && that.data.actcloud) {
        that.actcloud();
    }
  },
  actadopt(){
      if(!this.data.actadopt)
      {
          this.setData({
              activitylist:[],
              pageAdopt:1,
              morePost:true,
          })
      }
      this.setData({
          actadopt:true,
          actlove:false,
          actparty:false,
          actcloud:false,
          pageParty:1,
          pageLove:1,
          pageCloud:1,
          colorcloud:'black',
          coloradopt:'coral',
          colorparty:'black',
          colorlove:'black',
          pageindex:1,
          title:"宠物活动"
      })
      var that = this
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/adoptPet/',
        data:{
          openid:app.globalData.openid,
          page:that.data.pageAdopt,
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          that.setData({
            activitylist: that.data.activitylist.concat(res.data),
            pageAdopt:that.data.pageAdopt+1
          })
          if(res.data.length<10)
          {
              that.setData({
                  morePost:false,
              })
          }
        },
        fail:function(res){

        }
      })
  },
  actparty(){
    if(!this.data.actparty)
    {
        this.setData({
            activitylist:[],
            pageParty:1,
            morePost:true,
        })
    }
    this.setData({
        actadopt:false,
        actlove:false,
        actparty:true,
        actcloud:false,
        pageAdopt:1,
        pageLove:1,
        pageCloud:1,
        colorcloud:'black',
        coloradopt:'black',
        colorparty:'coral',
        colorlove:'black',
        pageindex:2,
        title:"宠物活动"
    })
    var that = this
    
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/partyPet/',
        data:{
          openid:app.globalData.openid,
          page:that.data.pageParty,
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          that.setData({
            activitylist: that.data.activitylist.concat(res.data),
            pageParty:that.data.pageParty+1
          })
          if(res.data.length<10)
          {
              that.setData({
                  morePost:false,
              })
          }
        },
        fail:function(res){
        }
      })
  },
  actlove(){
    if(!this.data.actlove)
    {
        this.setData({
            activitylist:[],
            pageLove:1,
            morePost:true,
        })
    }
    this.setData({
        actadopt:false,
        actlove:true,
        actparty:false,
        actcloud:false,
        pageAdopt:1,
        pageParty:1,
        pageCloud:1,
        colorcloud:'black',
        coloradopt:'black',
        colorparty:'black',
        colorlove:'coral',
        pageindex:3,
        title:"宠物活动"
    })
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/lovePet/',//todo
      data:{
        openid:app.globalData.openid,     
        page:that.data.pageLove, 
      },
      method: 'GET',
      header: {'content-type': 'application/json' //
      },
      success: function(res) {
         that.setData({
           activitylist: that.data.activitylist.concat(res.data),
           pageLove:that.data.pageLove+1,
         })
         if(res.data.length<10)
          {
              that.setData({
                  morePost:false,
              })
          }
      },
      fail:function(res){
      }
    })
  },
  actcloud(){
    if(!this.data.actcloud)
    {
        this.setData({
            activitylist:[],
            pageCloud:1,
            morePost:true,
        })
    }
    this.setData({
        actadopt:false,
        actlove:false,
        actparty:false,
        actcloud:true,
        pageAdopt:1,
        pageLove:1,
        pageParty:1,
        colorcloud:'coral',
        coloradopt:'black',
        colorparty:'black',
        colorlove:'black',
        pageindex:4,
        title:"宠物活动"
    })
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/petVideos/',//todo
      data:{
        openid:app.globalData.openid,    
        page:that.data.pageCloud  
      },
      method: 'GET',
      header: {'content-type': 'application/json' //
      },
      success: function(res) {
         that.setData({
           activitylist: that.data.activitylist.concat(res.data),
           pageCloud: that.data.pageCloud+1,
         })
         if(res.data.length<5)
          {
              that.setData({
                  morePost:false,
              })
          }
      },
      fail:function(res){
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
    wx.navigateTo({
        url:"../petdetail/petdetail?petspaceid="+pid
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
    wx.navigateTo({
        url:"../editsendAdopt/editsendAdopt?activityid="+e.target.dataset.index
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

                    break
                }
            }
        },
        fail:function(res){
        }
      })
  },
  guparty(e){
    this.setData({
        showparty:false,
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



        },
        fail:function(res){

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
            wx.showToast({
                title: '发送成功！',
                icon: 'none',
                duration: 2000
            })
        },
        fail:function(res){
        }
    })
  },
  bindchangev(e) {
    if(this.data.hkindex==this.data.activitylist.length-2&&e.detail.current==this.data.activitylist.length-1)
    {
        this.actcloud()
    }
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
    var aid = e.currentTarget.dataset.atcid
    // var vid = e.currentTarget.dataset.videoid
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/likeArticle/',
        method: 'GET',
        data: {
          openid: app.globalData.openid, // 传递需要点赞的帖子openid
          ArticleID: aid, 
          operation: "like",
        },
        success: (res) => {
            var templist = that.data.activitylist
            for (let item of templist)
            {
                if(item.ArticleID==aid)
                {
                    item.liked=true
                    item.like++
                }
            }
            that.setData({
                activitylist:templist
            })
            that.data.activitylist=templist
        }
      });
  },
  videounlike(e) {
    var aid = e.currentTarget.dataset.atcid
    // var vid = e.currentTarget.dataset.videoid
    var that = this
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/likeArticle/',
        method: 'GET',
        data: {
          openid: app.globalData.openid, // 传递需要点赞的帖子openid
          ArticleID: aid, 
          operation: "cancel",
        },
        success: (res) => {
            var templist = that.data.activitylist
            for (let item of templist)
            {
                if(item.ArticleID==aid)
                {
                    item.liked=false
                    item.like--
                }
            }
            that.setData({
                activitylist:templist
            })
            that.data.activitylist=templist
        }
      });
  },
  videocomment(e){
        this.setData({
            showcomment:true,
            hotOrTime: !this.data.hotOrTime,
            commentTarget:e.currentTarget.dataset.atcid,
        })
        this.changeSort(e)
  },
  changeSort: function(event) {
    var that = this;
    if(that.data.hotOrTime)  
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/viewCommentsTime/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
          ArticleID:that.data.commentTarget,
        },
        success:function(res) {
            that.setData({
              videocomments:res.data,
            })
        }
      })
    }
    else //现在是时间，要改为热度
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/viewCommentsHot/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
          ArticleID:this.data.commentTarget,
        },
        success:function(res) {
            that.setData({
              videocomments: res.data,
            })
        }
      })
    }
    that.setData({
      hotOrTime: !that.data.hotOrTime,
    });
  },
  //删除评论
  deletecomment: function(event) {
    var that = this
    const commentid = event.currentTarget.dataset.commentid
    var i = -1
    for (let c of this.data.videocomments)
    {
        i++
        if(c.CommentID==commentid)
        {
            break;
        }
    }
    wx.showModal({
      title: '提示',
      content: '确认删除评论？',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/deleteComment/',
            method: 'GET',
            data: {
              CommentID: commentid, 
            },
            success: (res) => {
              that.data.videocomments.splice(i,1)
              that.setData({
                  videocomments:that.data.videocomments,
              })
              wx.showToast({
                title: '删除评论成功',
                icon: 'none',
              });
            }
          });
        } 
        else if (res.cancel) {
        }
      }
    })
  },
  //点赞评论
  likeComment(event) {
    // 发送点赞请求到后端，假设点赞成功后返回新的点赞数
    // 使用微信小程序的wx.request发送HTTP请求
    var commentid = event.currentTarget.dataset.commentid
    var liked = event.currentTarget.dataset.liked
    var like = event.currentTarget.dataset.like
    var i = -1
    for (let c of this.data.videocomments)
    {
        i++
        if(c.CommentID==commentid)
        {
            break;
        }
    }
    var that = this
    if (!liked) {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/likeComment/',
        method: 'GET',
        data: {
          openid: app.globalData.openid, // 传递需要点赞的帖子openid
          CommentID: commentid, 
          operation: "like",
        },
        success: (res) => {
        // 更新点赞数、按钮颜色和状态
            const currentItem = that.data.videocomments[i];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            that.data.videocomments.splice(i, 1, updatedItem);
            that.setData({
              videocomments: that.data.videocomments
            });
        }
      });
    }
    else {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/likeComment/',
        method: 'GET',
        data: {
          openid: app.globalData.openid, // 传递需要点赞的帖子openid
          CommentID: commentid, 
          operation: "cancel",
        },
        success: (res) => {
          // 更新点赞数、按钮颜色和状态
            const currentItem = that.data.videocomments[i];
            const updatedItem = { ...currentItem, liked: false, like: like - 1 };
            that.data.videocomments.splice(i, 1, updatedItem);
            that.setData({
              videocomments: that.data.videocomments
            });
        }
      });
    }     
  },
  inputcomment:function(e){
    var value = e.detail.value;
    var len = parseInt(value.length)
    this.setData({
        currentcommentNumber: len,
        commentcontent: value
    })
    this.data.currentcommentNumber=len
    this.data.commentcontent=value    
  },
  gucomment(e){
    this.setData({
        showcomment:false,
        currentcommentNumber: 0,
        commentcontent: ''
    })
  },
  sendcomment(e){
    var that = this 
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/postComment/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
          ArticleID:that.data.commentTarget,
          content:that.data.commentcontent,
        },
        success:function(res) {
          // 更新页面数据
          that.setData({
            hotOrTime: !that.data.hotOrTime,
          });
          that.changeSort(e)
          that.setData({
            'commentcontent': '', // 清空评论输入框内容
          })
        }
      })
  },
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
  },
  onShareTimeline(){
  },
});