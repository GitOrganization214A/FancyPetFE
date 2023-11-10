// petinfo.ts

Page({
  data: {
    currentTab: 'following', // 默认显示关注
    color1: 'red',
    color2: 'black',
    color3: 'black',
    hotPosts: [],
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
        success:function(res) {
            that.setData({
              hotPosts: res.data
            })
        }
      })
    }
  },
});
