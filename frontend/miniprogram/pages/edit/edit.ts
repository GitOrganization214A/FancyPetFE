// edit.ts
// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()
const sideBarData = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'
  ];

const dogoptions = [
    '阿富汗猎犬', '阿拉斯加雪橇犬', '爱尔兰猎狼犬', '奥大利亚牧羊犬', '爱尔兰雪达犬', '澳大利亚牧牛犬', '爱尔兰水猎犬', '安纳托利亚牧羊犬', '爱尔兰㹴', '爱尔兰红白雪达犬', '爱尔兰峡谷㹴', '澳大利亚㹴', '爱尔兰软毛㹴', 
  '边境牧羊犬', '博美犬', '巴哥犬', '比利时牧羊犬', '北京犬', '伯恩山犬', '波尔多犬', '贝灵顿㹴', '波音达', '波利犬', '波士顿㹴', '比格猎犬', '巴吉度犬', '冰岛牧羊犬', '波兰低地牧羊犬', '比利时马林诺斯犬', '标准型雪纳瑞犬', '巴仙吉犬', '比利时特伏丹犬', '布雷猎犬', '布鲁塞尔格里芬犬', '布列塔尼犬', '比利牛斯牧羊犬', '波兰德斯布比野犬', '布鲁克浣熊猎犬', '贝吉格里芬凡丁犬', '捕鼠㹴', '搏得猎狐犬', 
  '柴犬', '粗毛柯利犬', 
  '德国牧羊犬', '杜宾犬', '大丹犬', '大白熊犬', '斗牛㹴', '大麦町犬', '斗牛獒犬', '德国宾莎犬', '短毛猎狐㹴', '短脚长身㹴', '大瑞士山地犬', '德国短毛波音达', '德国硬毛波音达',
  , 
  '法国斗牛犬', '法老王猎犬', '法国狼犬', '芬兰拉普猎犬', '芬兰波美拉尼亚丝毛狗', '弗莱特寻回犬', 
  '贵宾犬', '刚毛猎狐㹴', '古代英国牧羊犬', '格雷伊猎犬', '戈登雪达犬', 
  '哈士奇', '蝴蝶犬', '惠比特犬', '哈瓦那犬', '湖畔㹴', '荷兰毛狮犬', ' 黑俄罗斯㹴', '红骨猎浣熊犬', '猴头㹴', '黑褐猎浣熊犬',
  '吉娃娃', '金毛寻回犬', '卷毛比雄犬', '杰克罗素㹴', '巨型雪纳瑞犬', '捷克㹴', '卷毛寻回犬', '迦南犬', 
  '卡斯罗', '柯利犬', '卡迪根威尔士柯基犬', '凯利蓝㹴', '凯恩', '库瓦兹犬', '凯斯㹴', 
  '罗威纳犬', '腊肠犬', '兰波格犬', '猎兔犬', '拉布拉多寻回犬', '拉萨犬', '罗得西亚脊背犬', '罗秦犬', '猎水獭犬', 
  '马尔济斯犬', '迷你杜宾', '美国爱斯基摩犬', '美国可卡犬', '马士提夫獒犬', '墨西哥无毛犬', '美国猎狐犬', '美国斯塔福郡㹴', '美国水猎犬', '美国英国猎浣熊犬', 
  '纽芬兰犬', '挪威伦德猎犬', '挪威猎鹿犬', '挪威㹴犬', '那不勒斯獒', '诺福克㹴', '挪威布哈德犬',
  , 
  '葡萄牙水犬', '彭布罗克威尔士柯基犬', '普罗特猎犬', '帕尔森罗塞尔㹴', '秋田犬', '拳狮犬', '奇努克犬', '骑士查理王小猎犬', '切萨皮克海湾寻回犬', 
  '瑞典柯基犬', '日本狆', 
  '松狮', '萨摩耶犬', '圣伯纳犬', '苏格兰㹴', '苏俄猎狼犬', '丝毛㹴', '山地犬', '萨路基猎犬', '斯塔福郡斗牛㹴', '苏格兰猎鹿犬', '史毕诺犬', '树丛浣熊猎犬', '苏塞克斯猎犬', 
  '田野小猎犬', 
  '万能㹴', '维希拉猎犬', '威尔士㹴犬', '威玛犬', '玩具曼彻斯特犬', '玩具猎狐㹴', '威尔士跳猎犬', 
  '西施犬', '西高地白㹴', '寻血猎犬', '喜乐蒂牧羊犬', '小型雪瑞犬', '西藏猎犬', '匈牙利牧羊犬', '西藏㹴', '小型斗牛㹴', '西帕基犬', '锡利哈姆㹴', '小型葡萄牙波登可犬', '西班牙小猎犬', '新斯科舍猎鸭寻猎犬', 
  '英国斗牛犬', '约克夏㹴', '英国可卡犬', '英国猎狐犬', '意大利灰狗', '英国跳猎犬', '英国玩具犬', '伊比赞猎犬', '英格兰雪达犬', '硬毛指示格里芬犬', 
  '藏獒', '中国冠毛犬', '中国沙皮犬']
const catoptions =    
    ['阿比西尼亚猫', '澳大利亚雾猫', '埃及猫', 
    '巴厘岛猫', '伯曼猫', '波米拉猫', '波米拉长毛猫', '波斯猫', '彼得秃猫', '北美洲短毛猫', '北美洲长毛猫', '布偶猫', 
    ,
    '德文帝王猫', '顿斯科伊猫', '多趾缅因猫', '东方长毛猫', '东方短毛猫', '东奇尼猫', 
    '俄罗斯蓝猫', 
    '非洲狮子猫', 
    ,
    '哈瓦那棕猫', 
    ,
    '柯尼斯卷毛猫', '科拉特猫', '库里安短尾猫', '库里安长 毛短尾猫', '拉波卷毛猫', '拉波短毛卷毛猫', '狼猫', 
    '美国断尾猫', '美国短毛断尾猫', '美国卷耳猫', '美国长毛卷耳猫', '美国短毛猫', '美国硬毛猫', '孟加拉猫', '孟加拉长毛猫', '孟买猫', '缅甸猫', '缅因猫', '马恩岛猫', '米努特（小舞步）猫', '米努特长毛猫', '曼基康猫', '曼基康长毛猫', 
    '内达华猫', '挪威森林猫', 
    '欧西猫', 
    ,
    ,
    '日本短尾猫', '日本长毛短尾猫', 
    '萨凡纳猫', '苏格兰折耳猫', '苏格兰长毛折耳猫', '苏格兰立耳猫', '苏格兰长毛立耳猫', '赛尔凯克卷毛猫', '赛尔凯克长毛卷毛猫', '索马里猫', '斯芬克斯猫', '四川简州猫', '山东狮子猫', 
    '泰国御猫', '泰国猫', '土耳其安哥拉猫', '土耳其梵猫', 
    '威尔士猫', '玩具虎猫', 
    '夏特尔猫', '喜马拉雅猫', '暹罗猫', '西伯利亚猫', '新加坡猫', '雪鞋猫', 
    '英国长毛猫', '英国短毛猫', '异国猫', '中国狸花猫'
  ]

  
Page({
  data: {
    userInfo: {

    },
    images:[],
    breedcontent:"",
    titlecontent:[],
    atccontent:[],
    beip:"192.168.187.1",
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    chooseImageUrl:"../../resource/chooseImage.png",
    giveupUrl:"../../resource/giveup.png",
    currentTitleNumber: 0,
    currentTextNumber:0,
    maxTitleLen: 30,
    maxTextLen: 1024,
    atcid:"0",
    show: false,
    showbreed: false,
    breedfocus: false,
    options:[],
    possiblebreed:[],
    dogoptions,
    catoptions,
    fieldValue: '',
    cascaderValue: '',
  },
  // 事件处理函数
  inputBreed:function(e){
    var value = e.detail.value;
    this.setData({
        breedcontent: value,
        possiblebreed: []
    })
    this.data.breedcontent=value
    this.data.possiblebreed=[]
    console.log(value)
    var pbl = []
    if(value.length>0)
    {
        for (let b of this.data.dogoptions)
        {
            if(pbl.length>=5)
            break;
            if(b?.includes(value))
            {
                pbl.push(b)
            }
            
        }
        for (let b of this.data.catoptions)
        {
            if(pbl.length>=5)
            break;
            if(b?.includes(value))
            {
                pbl.push(b)
            }
        }
        this.setData({
            possiblebreed:pbl,
        })
        this.data.possiblebreed=pbl
    }
    console.log(this.data.possiblebreed)
  },
  replaceBreed:function(e){
    this.setData({
        breedcontent:e.currentTarget.dataset.breed,
        possiblebreed:[]
    })
  },
  inputTitle:function(e){
        var value = e.detail.value;
        var len = parseInt(value.length)
        this.setData({
            currentTitleNumber: len,
            titlecontent: value
        })
        this.data.currentTitleNumber=len
        this.data.titlecontent=value
        console.log(this.data.titlecontent)
  },
  inputText:function(e){
        var value = e.detail.value;
        var len = parseInt(value.length)
        this.setData({
            currentTextNumber: len,
            atccontent: value 
        })
        this.data.currentTextNumber=len
        this.data.atccontent=value
  },
//   choseImage: function() {
//     var that = this;
//     if (this.data.images.length  < 9) {
//       wx.chooseImage({//选择图片
//         count:1,//一张图片
//         sizeType: ['original', 'compressed'],
//         success: function (res) {
//           that.setData({
//             images: that.data.images.concat(res.tempFilePaths),
 
//           })
//           console.log(that.data.images)
          
//         }
//       })
//     } 
//     else{
//         wx.showToast({
//             title: '最多选择九张图片！',
//             icon: 'none',
//             duration: 3000
//           })
//     }
//   },
  chooseImage(e){
      var filelist = e.detail.file
      var originfilelist = this.data.images
      var newfilelist=[...originfilelist,...filelist]
      this.setData({
          images:newfilelist
      })
      console.log(newfilelist)
  },
  delimage(e){
    var id = e.detail.index   //能获取到对应的下标
    var delfileList = this.data.images  //这里是前端页面展示的数组
    delfileList.splice(id,1)
    this.setData({
      images:delfileList,  //在这里进行重新赋值  删除后 图片剩几张就相当于给后台传几张
    })
  },
  guEdit: function(e) {
      console.log("gu")
      wx.switchTab({
          url:"/pages/forum/forum"
      })
  },
  handleclicksc(e) {
    this.showvideoplay = true;
  },
  sendAtc: function(e) {
    var breedtag = '';
    var pbreed = this.data.breedcontent
    for (let b of this.data.dogoptions)
    {
        if(pbreed===b)
        {
            breedtag = '狗'
            break;
        }
    }
    for (let b of this.data.catoptions)
    {
        if(pbreed===b)
        {
            breedtag = '猫'
            break;
        }
    }
    console.log(breedtag)
    if((breedtag=='')&&(this.data.breedcontent.length>0))
    {
        wx.showToast({
            title: '请填写正确的分区',
            icon: 'none',
            duration: 3000
          })
    }
    else
    {
        var that = this
        wx.request({
            url: 'http://43.143.139.4:8000/api/v1/postArticle/',
            data:{
                openid:app.globalData.openid,
                ArticleID:'0',
                title:that.data.titlecontent,
                content:that.data.atccontent,
                zone:breedtag,
                subzone:that.data.breedcontent,
                PetSpaceID:that.data.cascaderValue,
            },
            method:"GET",
            header: {'content-type': 'application/json' //
            },
            success:function(res) {
                if(that.data.images.length<1)
                {
                    wx.switchTab({
                        url:"/pages/forum/forum"
                    })
                }

                console.log(res.data)
                var atcid = res.data.ArticleID
                for (let path of that.data.images)
                {
                    console.log(path.url)  
                    wx.uploadFile({
                        url: 'http://43.143.139.4:8000/api/v1/postArticle/', 
                        filePath: path.url,
                        name: 'image',
                        formData: {
                        ArticleID:atcid,
                        },
                        success (res){
                            wx.switchTab({
                                url:"/pages/forum/forum"
                            })
                        }
                    })
                }
            },
            fail:function(res){
                console.log("failed")
            }
        })
    } 
  },
  onClick() {
    var that = this
    this.setData({
      show: true,
    });
    wx.request({
        url: 'http://43.143.139.4:8000/api/v1/PetSpaces/',
        data:{
          openid:app.globalData.openid
        },
        method: 'GET',
        header: {'content-type': 'application/json' //
        },
        success: function(res) {
          var op = []
          for (let pet of res.data)
          {
              op.push({
                  text:pet.name,
                  value:pet.PetSpaceID
              })
          }
          that.setData({
              options:op,
          })
          
          console.log(res.data)
        },
      })
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e) {
    const { selectedOptions, value } = e.detail;
    const fieldValue = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      fieldValue,
      cascaderValue: value,
    })
  },
  breedFocus(e){
    this.setData({
        breedfocus:true,
    })
  },    
  breedBlur(e){
    this.setData({
        breedfocus:false,
    })
  }
})