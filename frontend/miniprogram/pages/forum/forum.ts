// forum.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    currentTab: 'following', // 默认显示关注
    color1: 'red',
    color2: 'black',
    color3: 'black',
    hotPosts: [],
    EditAtcUrl:"../../resource/EditButton.jpg",
    navigationUrl:"../../resource/navigationbar.png",
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  postDetail(event) {
    const articleid = event.currentTarget.dataset.articleid
    wx.navigateTo({
      url:'/pages/detail/detail?articleid='+articleid,
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
          url: 'http://43.143.139.4:8000/api/v1/like/',
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
       
>>>>>>> f135d43651f0679d3b196591c0e5919de794f695
  },
  switchTab: function (event) {
    const tab = event.currentTarget.dataset.tab;
    const id = event.currentTarget.dataset.id;
    this.setData({
        currentTab: tab,
        color1: id === '1' ? 'red' : 'black',
        color2: id === '2' ? 'red' : 'black',
        color3: id === '3' ? 'red' : 'black'
    });
    if(tab == "hot") {
      var that = this
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/HotArticles/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
        },
        success:function(res) {
            that.setData({
              hotPosts: res.data
            })
        }
      })
    }
  },
  EditAtc:function(e){
        wx.navigateTo({
            url:"../edit/edit"
        })
  },
});
