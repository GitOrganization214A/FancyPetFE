// userinfo.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    userid:'',
    userInfo: {},
    page:1,
    hasMoreData:true,
    pageSize:10,
    navigationUrl:"../../resource/navigationbar.png",
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
  },
  //获取发帖记录
  getArticles: function () {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewUserInfo/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        UserID:that.data.userid,
        openid:app.globalData.openid,
        page:that.data.page,
      },
      success:function(res) {
        that.setData({
          'userInfo.articles':that.data.userInfo.articles.concat(res.data.articles),
          page: that.data.page + 1
        })
        if(res.data.articles.length<that.data.pageSize)
        {
          that.setData({
            hasMoreData:false,
          })
        }
      }
    })
  },
  onLoad: function (event) {
    var that = this
    that.setData({
      userid:event.userid
    })
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewUserInfo/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        UserID:that.data.userid,
        openid:app.globalData.openid,
        page:that.data.page,
      },
      success:function(res) {
        that.setData({
          userInfo:res.data,
          page: that.data.page + 1
        })
        if(res.data.articles.length<that.data.pageSize)
        {
          that.setData({
            hasMoreData:false,
          })
        }
      }
    })
  },
  //点赞帖子
  likePost(event) {
    // 发送点赞请求到后端，假设点赞成功后返回新的点赞数
    // 使用微信小程序的wx.request发送HTTP请求

    const articleid = event.currentTarget.dataset.articleid
    const liked = event.currentTarget.dataset.liked
    const like = event.currentTarget.dataset.like
    const index = event.currentTarget.dataset.index

    var that = this
    if (!event.currentTarget.dataset.liked) {
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
            const currentItem = that.data.userInfo.articles[index];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            // 使用 splice 方法更新数组中特定项的值
            that.data.userInfo.articles.splice(index, 1, updatedItem);
            that.setData({
              ['userInfo']: that.data.userInfo
            });
          }
      });
    }
    else {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/likeArticle/',
        method: 'GET',
        data: {
          openid: app.globalData.openid, // 传递需要点赞的帖子openid
          ArticleID: articleid, 
          operation: "cancel",
        },
        success: (res) => {
            // 更新点赞数、按钮颜色和状态
            const currentItem = that.data.userInfo.articles[index];
            const updatedItem = { ...currentItem, liked: 
              false, like: like - 1 };
            // 使用 splice 方法更新数组中特定项的值
            that.data.userInfo.articles.splice(index, 1, updatedItem);
            that.setData({
              ['userInfo']: that.data.userInfo
            });
        }
      });
    }
  },
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/shareArticle/',
      method: 'GET',
      data: {
        ArticleID: articleid, 
      },
      success: (res) => {
      }
    })
  },
  onShareTimeline(){
  },
  //关注按钮
  followUser: function(event) {
    var that = this
    if(!that.data.userInfo.followed)
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/follow/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          UserID:that.data.userid,
          openid:app.globalData.openid,
          operation:'follow',
        },
        success:function(res) {
          const currentItem = that.data.userInfo
          const updatedItem = { ...currentItem, followed: true};
          that.setData({
            userInfo: updatedItem
          })
        }
      })
    }
    else
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/follow/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          UserID:that.data.userid,
          openid:app.globalData.openid,
          operation:'cancel',
        },
        success:function(res) {
          const currentItem = that.data.userInfo
          const updatedItem = { ...currentItem, followed: false};
          that.setData({
            userInfo: updatedItem
          })
        }
      })
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    that.setData({
      hasMoreData:true,
      page:1,
    }, function() {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/viewUserInfo/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          UserID:that.data.userid,
          openid:app.globalData.openid,
          page:that.data.page
        },
        success:function(res) {
          that.setData({
            userInfo: res.data,
            page:that.data.page+1
          })
          wx.hideLoading();
          // 隐藏导航栏加载框  
          wx.hideNavigationBarLoading();
          // 停止下拉动作  
          wx.stopPullDownRefresh();
        }
      })
    })
    
  },
  //上拉加载
  onReachBottom: function () {
    var that =this
    that.getArticles();
  },
  //帖子详情
  postDetail(event) {
    const articleid = event.currentTarget.dataset.articleid
    const index = event.currentTarget.dataset.index
    wx.navigateTo({
      url:'/pages/detail/detail?articleid='+articleid+'&index='+index+'&currentTab='+'',
    })
  },
  changeTabs() {
  },
  //宠物空间
  showdetails:function(event){
    const petspaceid = event.currentTarget.dataset.petspaceid
    wx.navigateTo({
      url:'/pages/petdetail/petdetail?petspaceid='+petspaceid,
    })
  },
});
