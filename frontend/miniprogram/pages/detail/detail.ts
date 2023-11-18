// detail.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    articleid:'',
    Post: {},
    keyboardHeight:'',
    popupshow: false,
    navigationUrl:"../../resource/navigationbar.png",
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
  onShowPopupTap(e){
    this.setData({
      popupshow:true,
      keyboardHeight:e.detail.height
    })
  },
  likePost(event) {
      // 发送点赞请求到后端，假设点赞成功后返回新的点赞数
      // 使用微信小程序的wx.request发送HTTP请求
      console.log('Dataset:', event.currentTarget.dataset)
      const articleid = event.currentTarget.dataset.articleid
      const liked = event.currentTarget.dataset.liked
      const like = event.currentTarget.dataset.like
      const index = event.currentTarget.dataset.index
      console.log(liked)
      var that = this
      if (!event.currentTarget.dataset.liked) {
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/like/',
          method: 'GET',
          data: {
            openid: app.globalData.openid, // 传递需要点赞的帖子openid
            ArticleID: articleid, 
            operation: "like",
          },
          success: (res) => {
          // 更新点赞数、按钮颜色和状态
            const currentItem = that.data.Post;
            const updatedItem = { ...currentItem, liked: true, like: like + 1 };
            that.setData({
              ['Post']: updatedItem
            });
          }
        });
      }
      else {
        wx.request({
          url: 'http://43.143.139.4:8000/api/v1/like/',
          method: 'GET',
          data: {
            openid: app.globalData.openid, // 传递需要点赞的帖子openid
            ArticleID: articleid, 
            operation: "cancel",
          },
          success: (res) => {
              // 更新点赞数、按钮颜色和状态
                const currentItem = that.data.Post;
                const updatedItem = { ...currentItem, liked: 
                  false, like: like - 1 };
                that.setData({
                  ['Post']: updatedItem
                });
              }
        });
      }
       
  },
  
  onLoad: function (event) {
      var that = this
      this.data.articleid = event.articleid
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/viewArticle/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
          ArticleID:this.data.articleid,
        },
        success:function(res) {
            that.setData({
              Post: res.data
            })
        }
      })
    },
});
