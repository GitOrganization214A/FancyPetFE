// detail.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
Page({
  data: {
    windowHeight: 0,//记录界面高度
    containerHeight: 0,//记录未固定整体滚动界面的高度
    containerBottomHeight: 0,//记录未固定整体滚动界面距离底部高度
    keyboardHeight: 0,//键盘高度
    isIphone: false,//是否为苹果手机，因苹果手机效果与Android有冲突，所以需要特殊处理
    articleid:'',
    commentsContent:"",//发送评论输入的内容
    showPlaceholder: true, // 控制placeholder显示与隐藏
    index:'', //在热门帖中的序号
    fromTab: '', //是从热门来的还是关注来的
    Post: {},
    hotOrTime: true, //true是按热度排，false按时间排
    commentsHot: [],
    commentsTime: [],
    commentPageHot:1,
    commentPageTime:1,
    hasMoreDataHot:true,
    hasMoreDataTime:true,
    pageSize:10,
    popupshow: false,
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
    wx.navigateTo({
      url:'/pages/userinfo/userinfo?userid='+tempuserid,
    })
  },

  //点赞帖子
  likePost: function(event) {
    // 发送点赞请求到后端，假设点赞成功后返回新的点赞数
    // 使用微信小程序的wx.request发送HTTP请求
    const articleid = event.currentTarget.dataset.articleid
    const like = event.currentTarget.dataset.like
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
          const currentItem = that.data.Post;
          const updatedItem = { ...currentItem, liked: true, like: like + 1 };
          that.setData({
            ['Post']: updatedItem
          });
          var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
      　　var prevPage = pages[pages.length - 2]    //获取上一个页面
      　　// 设置上一个页面的数据
          if(that.data.fromTab=='hot')
          {
            prevPage.data.hotPosts.splice(that.data.index, 1, updatedItem);
            prevPage.setData({
              ['hotPosts']: prevPage.data.hotPosts
            });
          }
          else if(that.data.fromTab=='following')
          {
            prevPage.data.followPosts.splice(that.data.index, 1, updatedItem);
            prevPage.setData({
              ['followPosts']: prevPage.data.followPosts
            });
          }
          else  //从主页来的
          {
            prevPage.data.userInfo.articles.splice(that.data.index, 1, updatedItem);
            prevPage.setData({
              ['userInfo']: prevPage.data.userInfo
            });
          }
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
              const currentItem = that.data.Post;
              const updatedItem = { ...currentItem, liked: 
                false, like: like - 1 };
              that.setData({
                ['Post']: updatedItem
              });
              var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
          　　var prevPage = pages[pages.length - 2]    //获取上一个页面
          　　// 设置上一个页面的数据
              if(that.data.fromTab=='hot')
              {
                prevPage.data.hotPosts.splice(that.data.index, 1, updatedItem);
                prevPage.setData({
                  ['hotPosts']: prevPage.data.hotPosts
                });
              }
              else if(that.data.fromTab=='following')
              {
                prevPage.data.followPosts.splice(that.data.index, 1, updatedItem);
                prevPage.setData({
                  ['followPosts']: prevPage.data.followPosts
                });
              }
              else  //从主页来的
              {
                prevPage.data.userInfo.articles.splice(that.data.index, 1, updatedItem);
                prevPage.setData({
                  ['userInfo']: prevPage.data.userInfo
                });
              }
            }
      });
    }
  },

  //删除帖子
  deletePost: function(event) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认删除帖子？',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/deleteArticle/',
            method: 'GET',
            data: {
              ArticleID: that.data.Post.ArticleID, 
            },
            success: (res) => {
              var pages = getCurrentPages()    //获取加载的页面( 页面栈 )
          　　var prevPage = pages[pages.length - 2]    //获取上一个页面
          　　// 设置上一个页面的数据
              if(that.data.fromTab=='hot')
              {
                prevPage.data.hotPosts.splice(that.data.index, 1);
                prevPage.setData({
                  ['hotPosts']: prevPage.data.hotPosts
                });
              }
              else if(that.data.fromTab=='following')
              {
                prevPage.data.followPosts.splice(that.data.index, 1);
                prevPage.setData({
                  ['followPosts']: prevPage.data.followPosts
                });
              }
              else  //从主页来的
              {
                prevPage.data.userInfo.articles.splice(that.data.index, 1);
                prevPage.setData({
                  ['userInfo']: prevPage.data.userInfo
                });
              }
              wx.showToast({
                title: '删帖成功',
                icon: 'none',
                duration: 1000, 
              });
              
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
                });
              }, 1000);
            }
          });
        } 
        else if (res.cancel) {
        }
      }
    })
  },

  //删除评论
  deleteComment: function(event) {
    var that = this
    const commentid = event.currentTarget.dataset.commentid
    const index = event.currentTarget.dataset.index
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
              if(that.data.hotOrTime) //按热门排的
              {
                that.data.commentsHot.splice(index, 1);
                that.data.Post.comment -= 1;
                that.setData({
                  Post: that.data.Post,
                  commentsHot:that.data.commentsHot
                });
              }
              else //按时间排
              {
                that.data.commentsTime.splice(index, 1);
                that.data.Post.comment -= 1;
                that.setData({
                  Post: that.data.Post,
                  commentsTime:that.data.commentsTime
                });
              }
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

  //获取热门评论
  getHotComments: function () {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewCommentsHot/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        ArticleID:that.data.articleid,
        page:that.data.commentPageHot,
      },
      success:function(res) {
        that.setData({
          commentsHot: that.data.commentsHot.concat(res.data),
          commentPageHot: that.data.commentPageHot + 1
        })
        if(res.data.length<that.data.pageSize)
        {
          that.setData({
            hasMoreDataHot:false,
          })
        }
      }
    })
  },
  //获取时间评论
  getTimeComments: function () {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/viewCommentsTime/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        ArticleID:that.data.articleid,
        page:that.data.commentPageTime,
      },
      success:function(res) {
        that.setData({
          commentsTime: that.data.commentsTime.concat(res.data),
          commentPageTime: that.data.commentPageTime + 1
        })
        if(res.data.length<that.data.pageSize)
        {
          that.setData({
            hasMoreDataTime:false,
          })
        }
      }
    })
  },
  //切换排序方式
  changeSort: function(event) {
    var that = this;
    if(that.data.hotOrTime)  
    {
      that.setData({
        commentPageTime:1,
        hasMoreDataTime:true,
        commentsTime:[],
      })
      that.getTimeComments()
    }
    else //现在是时间，要改为热度
    {
      that.setData({
        commentPageHot:1,
        hasMoreDataHot:true,
        commentsHot:[],
      })
      that.getHotComments()
    }
    that.setData({
      hotOrTime: !that.data.hotOrTime,
    });
  },
  //不支持下拉刷新
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  //上拉加载
  onReachBottom: function () {
    var that =this
    if (that.data.hasMoreDataHot && that.data.hotOrTime) {
      that.getHotComments();
    }
    else if(that.data.hasMoreDataTime && !that.data.hotOrTime)
    {
      that.getTimeComments();
    }
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
      that.setData({
        articleid:event.articleid,
        index: event.index,
        fromTab: event.currentTab
      })
      //获取屏幕高度以及设备信息（是否为苹果手机）
      wx.getSystemInfo({
        success: function(res) {
          that.data.windowHeight = res.windowHeight
          that.setData({
            windowHeight: res.windowHeight
          })
          that.data.isIphone = res.model.indexOf("iphone") >= 0 || res.model.indexOf("iPhone") >= 0
        }
      });
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
      });
      that.getTimeComments();
      that.getHotComments();
  },

  onReady: function() {
    var that = this
    setTimeout(() => {
      //界面初始化渲染需要初始化获取整体界面的高度以及距离信息
      that.refreshContainerHeight()
    }, 800);
  },
    
  //刷新整体界面高度、距离等信息，如列表有上划加载数据，需要在数据加载过后调用此方法进行高度以及间距的刷新
  refreshContainerHeight: function() {
    var that = this
    var query = wx.createSelectorQuery();
    query.select('.container').boundingClientRect()
    query.exec((res) => {
      //container为整体界面的class的样式名称
      that.data.containerHeight = res[0].height;
      that.data.containerBottomHeight = res[0].bottom
    })
  },
    
  // 界面滚动监听
  onPageScroll: function(e) {
    var that = this
    // 界面滚动刷新整体界面高度以及间距
    that.refreshContainerHeight()
  },
    
  //评论框焦点获取监听
  inputCommentsFocus: function(e) {
    var that = this
    that.setData({
      keyboardHeight: 0
    })
  },

  //点击标签
  searchtag: function(e) {
    const subzone=e.currentTarget.dataset.search
    wx.navigateTo({
      url:'/pages/zoneresult/zoneresult?subzone='+subzone,
    })
  },
  //评论输入
  inputCommentsContentListening: function(e) {
    var content = e.detail.value;
    this.setData({
      'commentsContent': content,
      'showPlaceholder': content.length === 0, // 根据输入内容判断是否显示placeholder
    });
  },

  //宠物空间
  showdetails:function(event){
    const petspaceid = event.currentTarget.dataset.petspaceid
    app.globalData.petspaceid=petspaceid
    wx.navigateTo({
      url:'/pages/petdetailshow/petdetailshow?petspaceid='+petspaceid,
    })
  },

  //点击评论按钮
  clickComments: function(e) {
    var that = this
    // 获取评论内容
    var commentsContent = that.data.commentsContent;
    // 判断评论内容是否为空
    if (commentsContent.length === 0) {
      // 如果为空，给出提示或执行其他操作
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none',
      });
      return; // 不执行发送评论的操作
    }
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/postComment/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        ArticleID:this.data.articleid,
        content:this.data.commentsContent,
      },
      success:function(res) {
        // 更新页面数据
        that.setData({
          'Post.comment': that.data.Post.comment + 1,
          'commentsContent': '', // 清空评论输入框内容
          'showPlaceholder': true, // 显示placeholder
        })
        if(that.data.hotOrTime===false)  //按时间
        {
          ("time")
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/viewCommentsTime/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
              openid:app.globalData.openid,
              ArticleID:that.data.articleid,
            },
            success:function(res) {
                that.setData({
                  commentsTime: res.data
                })
            }
          })
        }
        else //现在是热度
        {
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/viewCommentsHot/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
              openid:app.globalData.openid,
              ArticleID:that.data.articleid,
            },
            success:function(res) {
              (res.data)
              that.setData({
                commentsHot: res.data
              })
            }
          })
        }

        wx.showToast({
          title: '发送成功',
          icon: 'none',
        });
      }
    })  
    
  },

  //评论框焦点失去监听
  inputCommentsBlur: function(e) {
    var that = this
    that.setData({
      keyboardHeight: 0
    })
  }
});
