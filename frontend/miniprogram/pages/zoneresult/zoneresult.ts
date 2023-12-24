// detail.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    hotPosts: [],
    hotOrTime: true, //true是按热度排，false按时间排
    hasMoreData:true,
    page:1,
    pageSize:10,
    popupshow: false,
    zone: '',
    subzone: '',
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

  //详情页
  postDetail(event) {
    const articleid = event.currentTarget.dataset.articleid
    const index = event.currentTarget.dataset.index
    wx.navigateTo({
      url:'/pages/detail/detail?articleid='+articleid+'&index='+index,
    })
  },

  //进入用户主页
  viewUserInfo: function(event) {
    const tempuserid = event.currentTarget.dataset.userid
    ("tempuserid",tempuserid) 
    wx.navigateTo({
      url:'/pages/userinfo/userinfo?userid='+tempuserid,
    })
  },

  //热门排序
  getHotArticles() {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewZoneArticlesHot/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        zone:that.data.zone,
        subzone:that.data.subzone,
        page:that.data.page
      },
      success:function(res) {
        that.setData({
          hotPosts: that.data.hotPosts.concat(res.data),
          page: that.data.page + 1,
        })
        if(res.data.length<that.data.pageSize)
        {
          that.setData({
            hasMoreData:false,
          })
        }
      }
    });
  },
  //时间排序
  getTimeArticles() {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewZoneArticlesTime/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        zone:that.data.zone,
        subzone:that.data.subzone,
        page:that.data.page
      },
      success:function(res) {
        that.setData({
          hotPosts: that.data.hotPosts.concat(res.data),
          page: that.data.page + 1,
        })
        if(res.data.length<that.data.pageSize)
        {
          that.setData({
            hasMoreData:false,
          })
        }
      }
    });
  },
  //不支持下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  //上拉加载
  onReachBottom: function () {
    var that =this
    if (that.data.hasMoreData && that.data.hotOrTime) {
      that.getHotArticles();
    }
    else if(that.data.hasMoreData && !that.data.hotOrTime)
    {
      that.getTimeArticles();
    }
  },
  //切换排序方式
  changeSort: function(event) {
    var that = this;
    if(that.data.hotOrTime)  
    {
      that.setData({
        page:1,
        hasMoreData:true,
        hotPosts:[],
      })
      that.getTimeArticles()
    }
    else //现在是时间，要改为热度
    {
      that.setData({
        page:1,
        hasMoreData:true,
        hotPosts:[],
      })
      that.getHotArticles()
    }
    that.setData({
      hotOrTime: !that.data.hotOrTime,
    });
  },

  //点赞帖子
  likePost(event) {
    // 发送点赞请求到后端，点赞成功后返回新的点赞数
    const articleid = event.currentTarget.dataset.articleid
    const liked = event.currentTarget.dataset.liked
    const like = event.currentTarget.dataset.like
    const index = event.currentTarget.dataset.index
    (liked)
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
            const currentItem = that.data.hotPosts[index];
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            // 使用 splice 方法更新数组中特定项的值
            that.data.hotPosts.splice(index, 1, updatedItem);
            that.setData({
              ['hotPosts']: that.data.hotPosts
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
              const currentItem = that.data.hotPosts[index];
              const updatedItem = { ...currentItem, liked: 
                false, like: like - 1 };
              // 使用 splice 方法更新数组中特定项的值
              that.data.hotPosts.splice(index, 1, updatedItem);
              that.setData({
                ['hotPosts']: that.data.hotPosts
              });
        }
      });
    }
  },

  //初始渲染
  onLoad: function (event) {
    var that = this
    that.setData({
      zone:event.zone,
      subzone:event.subzone,
    })
    that.getHotArticles()
  },
});
