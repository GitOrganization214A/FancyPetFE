// detail.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    hotPosts: {},
    hotOrTime: true, //true是按热度排，false按时间排
    popupshow: false,
    searchInput: '',
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  onShareAppMessage:function(){
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
  },
  onShareTimeline(){
  },

  //进入用户主页
  viewUserInfo: function(event) {
    const tempuserid = event.currentTarget.dataset.userid
    console.log("tempuserid",tempuserid) 
    wx.navigateTo({
      url:'/pages/userinfo/userinfo?userid='+tempuserid,
    })
  },

  //切换排序方式
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
          ArticleID:this.data.articleid,
        },
        success:function(res) {
            that.setData({
              commentsTime: res.data
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
          ArticleID:this.data.articleid,
        },
        success:function(res) {
            that.setData({
              commentsHot: res.data
            })
        }
      })
    }
    that.setData({
      hotOrTime: !that.data.hotOrTime,
    });
    console.log(that.data.hotOrTime)
    console.log(that.data.commentsTime)
  },

  //点赞评论
  likeComment(event) {
    // 发送点赞请求到后端，假设点赞成功后返回新的点赞数
    // 使用微信小程序的wx.request发送HTTP请求
    const commentid = event.currentTarget.dataset.commentid
    const liked = event.currentTarget.dataset.liked
    const like = event.currentTarget.dataset.like
    const index = event.currentTarget.dataset.index
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
          if(that.data.hotOrTime) //按热度
          {
            const currentItem = that.data.commentsHot[index];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            that.data.commentsHot.splice(index, 1, updatedItem);
            that.setData({
              commentsHot: that.data.commentsHot
            });
          }
          else
          {
            const currentItem = that.data.commentsTime[index];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            that.data.commentsTime.splice(index, 1, updatedItem);
            that.setData({
              commentsTime: that.data.commentsTime
            });
          }
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
          if(that.data.hotOrTime) //按热度
          {
            const currentItem = that.data.commentsHot[index];
            const updatedItem = { ...currentItem, liked: false, like: like - 1 };
            that.data.commentsHot.splice(index, 1, updatedItem);
            that.setData({
              commentsHot: that.data.commentsHot
            });
          }
          else
          {
            const currentItem = that.data.commentsTime[index];
            const updatedItem = { ...currentItem, liked: false, like: like - 1 };
            that.data.commentsTime.splice(index, 1, updatedItem);
            that.setData({
              commentsTime: that.data.commentsTime
            });
          }
        }
      });
    }     
  },

  //初始渲染
  onLoad: function (event) {
      var that = this
      this.setData({
        searchInput:event.searchinput
      })
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/searchArticlesHot/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
         data:{
          openid:app.globalData.openid,
          keyword:event.searchinput,
        },
        success:function(res) {
            that.setData({
              hotPosts: res.data
            })
        }
      });
  },
});
