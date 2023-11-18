// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    petname:'',
    pettype:'',
    QRcodeurl:'',
    token:''    
  },
  onLoad(e) {
    var that = this
    const curscene = decodeURIComponent(e.scene)
    wx.request({
        url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx17396561c08eee6a&secret=1553b8c2bdf47f280ffeb61c989e0f50",
        method: 'POST',
        data: {
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          // 请求成功，处理返回的数据
          console.log(res.data);
          that.data.token=res.data.access_token
          console.log(that.data.token);

          wx.request({
            url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token="+that.data.token,
            method: 'POST',
            data: {
                scene:curscene
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              // 请求成功，处理返回的数据
              console.log(res.data);
              var base64 = wx.arrayBufferToBase64(res.data)
              console.log(base64);
            },
            fail: function(err) {
              // 请求失败，处理错误信息
              console.error(err);
            }
          });

          
        },
        fail: function(err) {
          // 请求失败，处理错误信息
          console.error(err);
        }
      });
  },
})