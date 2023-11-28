// petinfo.ts
const app = getApp<IAppOption>()
Page({
  onShow() {
    var that=this
    wx.request({
    url: 'http://43.143.139.4:8000/api/v1/PetSpaces/',
    data:{
      openid:app.globalData.openid
    },
    method: 'GET',
    header: {'content-type': 'application/json' //
    },
    success: function(res) {
      that.setData({
        responseData: res.data
      })
      console.log(res.data)
    },
  })
  },
  showdetails:function(event){
    const petspaceid = event.currentTarget.dataset.petspaceid
    console.log(petspaceid)
    app.globalData.petspaceid=petspaceid
    wx.navigateTo({
      url:'/pages/petdetail/petdetail?petspaceid='+petspaceid,
    })
  },
  attentionlist:function(){
    wx.navigateTo({
      url:'/pages/list/list'
    })
  },
  addpet:function(){
    wx.navigateTo({
      url:'/pages/addpet/addpet'
    })
  },
  data: {
    currentTab: 'following', // 默认显示关注
    color1: 'red',
    color2: 'black',
    color3: 'black',
    hotPosts: [
      {id: 1, avatar: '头像URL', name: '发帖人姓名', content: '帖子1的内容', image: '图片URL'},
      {id: 2, avatar: '头像URL', name: '发帖人姓名', content: '帖子2的内容', image: '图片URL'},
      // 更多帖子...
    ],
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
  },
});
