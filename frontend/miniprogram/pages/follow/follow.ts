const app = getApp<IAppOption>()
Page({
    data: {
      userid: "",
      followlist: "",
      followee: false,
      follower: false,
      followtitle: ""
    },
    onLoad(event) {
        if(event.type=="followee")
        {
            this.setData({
                userid:event.userid,
                followee:true,
                follower:false,
                followtitle:"关注列表"
            })
            var that = this
            wx.request({
                url: 'http://43.143.139.4:8000/api/v1/myFollows/',
                method:"GET",
                header: {'content-type': 'application/json' //
                },
                data:{
                  openid:app.globalData.openid,
                },
                success:function(res) {
                  that.setData({
                    followlist: res.data
                  })
                  that.data.followlist=res.data
                }
              })
        }
        else if(event.type=="follower")
        {
            this.setData({
                userid:event.userid,
                followee:false,
                follower:true,
                followtitle:"粉丝列表"
            })
            var that = this
            wx.request({
                url: 'http://43.143.139.4:8000/api/v1/myFans/',
                method:"GET",
                header: {'content-type': 'application/json' //
                },
                data:{
                  openid:app.globalData.openid,
                },
                success:function(res) {
                  (res.data)
                  that.setData({
                    followlist: res.data
                  })
                  that.data.followlist=res.data
                }
              })
        }
    },
    followUser: function(event){
        var that = this
        var followtag = false ;
        const tempuserid = event.currentTarget.dataset.userid
        (tempuserid)
        var target =  "";
        var iindex = -1;
        for (let item of this.data.followlist )
        {
            iindex++
            if (item.UserID==tempuserid)
            {
                target = item
                (item.followed)
                followtag=item.followed
                break
            }
        }
        if(!followtag)
        {
          wx.request({
            url: 'http://43.143.139.4:8000/api/v1/follow/',
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            data:{
                UserID:tempuserid,
                openid:app.globalData.openid,
                operation:'follow',
            },
            success:function(res) {
                (res)
                var newlist = that.data.followlist
                newlist[iindex].followed = true
                that.setData({
                    followlist:newlist
                })
                that.data.followlist=newlist
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
                UserID:tempuserid,
                openid:app.globalData.openid,
                operation:'cancel',
            },
            success:function(res) {
                (res)
                var newlist = that.data.followlist
                newlist[iindex].followed = false
                if(that.data.followee)
                    newlist.splice(iindex,1)
                that.setData({
                    followlist:newlist
                })
                that.data.followlist=newlist
            }
        })
        }
    },
    viewUserInfo: function(event) {
      const tempuserid = event.currentTarget.dataset.userid
      wx.navigateTo({
        url:'/pages/userinfo/userinfo?userid='+tempuserid,
      })
    },
    
  })