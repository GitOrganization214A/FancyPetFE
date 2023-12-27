// edit.ts
// 获取应用实例
const Multipart = require('../../utils/Multipart.min.js') 
const app = getApp<IAppOption>()

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
'藏獒', '中国冠毛犬', '中国沙皮犬'];
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
];
const rabbitoptions = [
  '安哥拉兔', '阿亨特兔', 
  '比华伦兔', '标准金吉拉兔', '柏鲁美路兔', '波兰兔', '比利时野兔', 
  '垂耳兔', 
  '大型安哥拉兔', '缎毛安哥拉兔', '缎毛兔', 
  '法国安哥拉兔', '佛罗里达州大白兔', '法国垂耳兔',
  '海棠兔', '荷兰兔', '荷兰垂耳兔', '荷兰侏儒兔', '黄褐兔', 
  '加利福尼亚兔', '巨型纹路兔', '金吉拉兔', '巨型金吉拉兔', '巨型花明兔', 
  '拉拿兔', '雷克斯兔', 
  '美国金吉拉兔', '美国垂耳兔', '美国迷你垂耳兔', '迷你雷克斯兔', 
  '奶油兔', 
  '狮子兔', 
  '图林根兔', 
  '维兰特兔', 
  '香槟兔', '夏温拿兔', '喜马拉雅兔', '新西兰兔', 
  '英国安哥拉兔', '英国小型兔', '玉桂兔', '英国斑点兔', '英国垂耳兔', '英国迷你垂耳兔', '银狐兔', '银貂兔', 
  '侏儒海棠兔', '泽西长毛兔', '中国白兔']
;
const mouseoptions = [
  '布丁鼠', '北非肥尾沙鼠', 
  '草原犬鼠', '赤腹松鼠', 
  '冬白仓鼠', 
  '黄山松鼠', '褐鼠', '花枝鼠',
  '金花鼠', '金狐仓鼠', '金丝熊', 
  '毛丝鼠', '蜜袋鼯', '奶茶仓鼠', 
  '欧洲红松鼠', 
  '日本小鼯鼠', '绒鼠', 
  '三线仓鼠', '睡鼠', 
  '天竺鼠', '土拨鼠', 
  '鼯鼠', '倭仓鼠', 
  '雪地松鼠', 
  '英种天竺鼠', '银狐仓鼠', '一线仓鼠', '岩松鼠', 
  '紫衣仓鼠', '长吻松鼠'
  ]
;
const birdoptions = [
  '斑胸草雀', '白腰文鸟', 
  '长尾草雀',
  '虎皮鹦鹉', 
  '鸡尾鹦鹉', '金丝雀', 
  '七彩文鸟', 
  '桃脸牡丹鹦鹉', 
  '爪哇禾雀']
;
const fishoptions = [
  '斑马鱼', 
  '成吉思汗鱼', '慈鲷', 
  '灯鱼', '斗鱼', 
  '虎皮鱼', '魟鱼', '狐狸鱼', '红尾鲶', '黑白双星', '花斑连鳍', 
  '金鱼', '锦鲤', '剑尾鱼', '接吻鱼', 
  '孔雀鱼', 
  '龙鱼', '罗汉鱼', '丽丽鱼', 
  '曼龙鱼', '玛丽鱼', 
  '攀鲈科', 
  '七星刀鱼', 
  '神仙鱼', '三湖慈鲷', 
  '小丑鱼', '虾虎鱼', '血鹦鹉', 
  '鹦鹉鱼', '月光鱼']
;
const tortoiseoptions = [
  '安布闭壳龟', '安哥洛卡象龟', '埃及陆龟', '凹甲陆龟', 
  '巴西龟', '百色闭壳龟', '白唇泥龟', '斑点池龟', '白头龟', '豹纹陆龟', '饼干龟', 
  '草龟', 
  '东锦龟', '地龟', 
  '辐射陆龟', 
  '果核泥龟', 
  '火焰龟', '黄喉拟水龟', '黄头侧颈龟', '黑颈乌龟', '红面蛋龟', '黄缘闭壳龟', '赫曼陆龟', '黄腿陆龟', '红腿象龟', '黑靴陆龟', 
  '金头闭壳龟', '鸡龟', '锯缘龟', '加拉帕戈斯象龟', '几何陆龟', 
  '枯叶龟', '卡罗莱箱龟', 
  '丽箱龟', 
  '密西西比图龟', '马来西亚巨龟', '马来食螺龟', '缅甸陆龟', '缅甸星龟', 
  '拟鳄龟', '南美渔龟', 
  '欧洲泽龟', 
  '平胸龟', 
  '翘缘陆龟', 
  '麝香龟', '三线闭壳龟', '四眼斑水龟', '三爪箱龟', '苏卡达陆龟', '四指陆龟', '沙漠地鼠龟', 
  '剃刀龟', '头盔泥龟', '太阳龟', 
  '西部锦龟', '西氏长颈龟', 
  '云南闭壳龟', '圆澳龟', '眼斑龟', '亚达伯拉象龟', '印度星龟', 
  '真鳄龟', '中华花龟', '猪鼻龟', '窄桥麝香龟', '钻纹龟']
;

Page({
  data: {
    userInfo: {

    },
    show:false,
    date: new Date().toJSON().substring(0, 10),
    avatarUrl:'',
    images:[],
    gender:[],
    breed:"",
    titlecontent:[],
    
    IsEditingText: true, // 如需尝试获取用户信息可改为false
    navigationUrl:"../../resource/navigationbar.png",
    chooseImageUrl:"../../resource/chooseImage.png",
    giveupUrl:"../../resource/giveup.png",
    currentTitleNumber: 0,
    currentTextNumber:0,
    maxTitleLen: 10,
    showbreed: false,
    breedfocus: false,
    options:[],
    possiblebreed:[],
    dogoptions,
    catoptions,
    rabbitoptions,
    mouseoptions,
    birdoptions,
    fishoptions,
    tortoiseoptions,
  },
  // 事件处理函数
  inputTitle:function(e){
        var value = e.detail.value;
        var len = parseInt(value.length)
        this.setData({
            currentTitleNumber: len,
            titlecontent: value
        })
        this.data.currentTitleNumber=len
        this.data.titlecontent=value

  },
  bindDateChange: function(e) {
    var splitted = e.detail.value.split("-", 3)
    var splitted2=new Date().toJSON().substring(0, 10).split("-", 3)
    var selectdate=splitted[0]+splitted[1]+splitted[2]
    var nowdate=splitted2[0]+splitted2[1]+splitted2[2]


    if (selectdate<nowdate){

      this.setData({
        date: e.detail.value
      })
    }
    else{

    this.setData({
      date: new Date().toJSON().substring(0, 10)
    })
    } 
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
  },
  inputBreed:function(e){
    var value = e.detail.value;
    this.setData({
        breed: value,
        possiblebreed: []
    })
    this.data.breed=value
    this.data.possiblebreed=[]
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
      for (let b of this.data.rabbitoptions)
      {
          if(pbl.length>=5)
          break;
          if(b?.includes(value))
          {
              pbl.push(b)
          }
      }
      for (let b of this.data.mouseoptions)
      {
          if(pbl.length>=5)
          break;
          if(b?.includes(value))
          {
              pbl.push(b)
          }
      }
      for (let b of this.data.birdoptions)
      {
          if(pbl.length>=5)
          break;
          if(b?.includes(value))
          {
              pbl.push(b)
          }
      }
      for (let b of this.data.fishoptions)
      {
          if(pbl.length>=5)
          break;
          if(b?.includes(value))
          {
              pbl.push(b)
          }
      }
      for (let b of this.data.tortoiseoptions)
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
  },
  replaceBreed:function(e){
    this.setData({
        breed:e.currentTarget.dataset.breed,
        possiblebreed:[]
    })
  },
  getGender:function(e){
    var Gender=e.detail.value;
    this.setData({
      gender: Gender
    })
    this.data.gender=Gender
  },
  chooseAvatar(event){
    this.setData({
        avatarUrl:event.detail.avatarUrl
    })
    this.data.avatarUrl = event.detail.avatarUrl
  },
  guEdit: function(e) {
      wx.navigateBack({
        delta: 1
      })
  },
  onLoad(e){
  },
  addPet: function(e) {
    var breedtag = '';
    var pbreed = this.data.breed
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
    for (let b of this.data.rabbitoptions)
    {
        if(pbreed===b)
        {
            breedtag = '兔'
            break;
        }
    }
    for (let b of this.data.mouseoptions)
    {
        if(pbreed===b)
        {
            breedtag = '鼠'
            break;
        }
    }
    for (let b of this.data.birdoptions)
    {
        if(pbreed===b)
        {
            breedtag = '鸟'
            break;
        }
    }
    for (let b of this.data.fishoptions)
    {
        if(pbreed===b)
        {
            breedtag = '鱼'
            break;
        }
    }
    for (let b of this.data.tortoiseoptions)
    {
        if(pbreed===b)
        {
            breedtag = '龟'
            break;
        }
    }
    if(this.data.titlecontent.length==0)
    {
      wx.showToast({
        title: '名字不可为空',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if(((breedtag=='')&&(this.data.breed.length>=0)))
    {
        wx.showToast({
            title: '请输入已有的种类',
            icon: 'none',
            duration: 3000
          })
        return
    }
    if(this.data.avatarUrl.length==0)
    {
        wx.showToast({
            title: '请选择宠物头像',
            icon: 'none',
            duration: 3000
          })
        return
    }
    if(this.data.gender.length==0)
    {
        wx.showToast({
            title: '请选择宠物性别',
            icon: 'none',
            duration: 3000
          })
        return
    }
    var that = this
    wx.uploadFile({
      url: 'http://43.143.139.4:8000/api/v1/newPetSpace/', 
      filePath: that.data.avatarUrl,
      name: 'avatar',
      formData: {
        openid:app.globalData.openid,
        name:that.data.titlecontent,
        birthday:that.data.date,
        gender:that.data.gender,
        breed:that.data.breed
      },
      success (res){
        wx.switchTab({
            url:"/pages/petspace/petspace"
        })
      },
      fail(e){
        console.log(e)
      }
    })

    
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date:this.formatDate(event.detail)
    });
  },
  
})