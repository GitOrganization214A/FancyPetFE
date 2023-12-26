// forum.ts
import deviceUtil from "../../miniprogram_npm/lin-ui/utils/device-util"
const app = getApp<IAppOption>()
const sideBarDataDog = [
  'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'
];
const sideBarDataCat = [
  'A', 'B', 'D', 'E', 'F', 'H', 'K', 'L', 'M', 'N', 'O', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'
];
const sideBarDataRabbit = [
  'A', 'B', 'C', 'D', 'F', 'H', 'J', 'L', 'M', 'N', 'S', 'T', 'W', 'X', 'Y', 'Z'
];
const sideBarDataRat = [
  'B', 'C', 'D', 'H', 'J', 'M', 'N', 'O', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'
];
const sideBarDataBird = [
  'B', 'C', 'H', 'J', 'Q', 'T', 'Z'
];
const sideBarDataFish = [
  'B', 'C', 'D', 'H', 'J', 'K', 'L', 'M', 'P', 'Q', 'S', 'X', 'Y'
];
const sideBarDataTortoise = [
  'A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'S', 'T', 'X', 'Y', 'Z'
];
const sideBarDataOther = [
  'C', 'H', 'M', 'Q', 'W', 'X', 'Y', 'Z'
];

const nameDataDog = [
  ['阿富汗猎犬', '阿拉斯加雪橇犬', '爱尔兰猎狼犬', '奥大利亚牧羊犬', '爱尔兰雪达犬', '澳大利亚牧牛犬', '爱尔兰水猎犬', '安纳托利亚牧羊犬', '爱尔兰㹴', '爱尔兰红白雪达犬', '爱尔兰峡谷㹴', '澳大利亚㹴', '爱尔兰软毛㹴'], 
['边境牧羊犬', '博美犬', '巴哥犬', '比利时牧羊犬', '北京犬', '伯恩山犬', '波尔多犬', '贝灵顿㹴', '波音达', '波利犬', '波士顿㹴', '比格猎犬', '巴吉度犬', '冰岛牧羊犬', '波兰低地牧羊犬', '比利时马林诺斯犬', '标准型雪纳瑞犬', '巴仙吉犬', '比利时特伏丹犬', '布雷猎犬', '布鲁塞尔格里芬犬', '布列塔尼犬', '比利牛斯牧羊犬', '波兰德斯布比野犬', '布鲁克浣熊猎犬', '贝吉格里芬凡丁犬', '捕鼠㹴', '搏得猎狐犬'], 
['柴犬', '粗毛柯利犬'], 
['德国牧羊犬', '杜宾犬', '大丹犬', '大白熊犬', '斗牛㹴', '大麦町犬', '斗牛獒犬', '德国宾莎犬', '短毛猎狐㹴', '短脚长身㹴', '大瑞士山地犬', '德国短毛波音达', '德国硬毛波音达'],
['法国斗牛犬', '法老王猎犬', '法国狼犬', '芬兰拉普猎犬', '芬兰波美拉尼亚丝毛狗', '弗莱特寻回犬'], 
['贵宾犬', '刚毛猎狐㹴', '古代英国牧羊犬', '格雷伊猎犬', '戈登雪达犬'], 
['哈士奇', '蝴蝶犬', '惠比特犬', '哈瓦那犬', '湖畔㹴', '荷兰毛狮犬', ' 黑俄罗斯㹴', '红骨猎浣熊犬', '猴头㹴', '黑褐猎浣熊犬'],
['吉娃娃', '金毛寻回犬', '卷毛比雄犬', '杰克罗素㹴', '巨型雪纳瑞犬', '捷克㹴', '卷毛寻回犬', '迦南犬'], 
['卡斯罗', '柯利犬', '卡迪根威尔士柯基犬', '凯利蓝㹴', '凯恩', '库瓦兹犬', '凯斯㹴'], 
['罗威纳犬', '腊肠犬', '兰波格犬', '猎兔犬', '拉布拉多寻回犬', '拉萨犬', '罗得西亚脊背犬', '罗秦犬', '猎水獭犬'], 
['马尔济斯犬', '迷你杜宾', '美国爱斯基摩犬', '美国可卡犬', '马士提夫獒犬', '墨西哥无毛犬', '美国猎狐犬', '美国斯塔福郡㹴', '美国水猎犬', '美国英国猎浣熊犬'], 
['纽芬兰犬', '挪威伦德猎犬', '挪威猎鹿犬', '挪威㹴犬', '那不勒斯獒', '诺福克㹴', '挪威布哈德犬'],
['葡萄牙水犬', '彭布罗克威尔士柯基犬', '普罗特猎犬', '帕尔森罗塞尔㹴'], ['秋田犬', '拳狮犬', '奇努克犬', '骑士查理王小猎犬', '切萨皮克海湾寻回犬'], 
['瑞典柯基犬', '日本狆'], 
['松狮', '萨摩耶犬', '圣伯纳犬', '苏格兰㹴', '苏俄猎狼犬', '丝毛㹴', '山地犬', '萨路基猎犬', '斯塔福郡斗牛㹴', '苏格兰猎鹿犬', '史毕诺犬', '树丛浣熊猎犬', '苏塞克斯猎犬'], 
['田野小猎犬'], 
['万能㹴', '维希拉猎犬', '威尔士㹴犬', '威玛犬', '玩具曼彻斯特犬', '玩具猎狐㹴', '威尔士跳猎犬'], 
['西施犬', '西高地白㹴', '寻血猎犬', '喜乐蒂牧羊犬', '小型雪瑞犬', '西藏猎犬', '匈牙利牧羊犬', '西藏㹴', '小型斗牛㹴', '西帕基犬', '锡利哈姆㹴', '小型葡萄牙波登可犬', '西班牙小猎犬', '新斯科舍猎鸭寻猎犬'], 
['英国斗牛犬', '约克夏㹴', '英国可卡犬', '英国猎狐犬', '意大利灰狗', '英国跳猎犬', '英国玩具犬', '伊比赞猎犬', '英格兰雪达犬', '硬毛指示格里芬犬'], 
['藏獒', '中国冠毛犬', '中国沙皮犬']
];
const nameDataCat = [
  ['阿比西尼亚猫', '澳大利亚雾猫', '埃及猫'], 
  ['巴厘岛猫', '伯曼猫', '波米拉猫', '波米拉长毛猫', '波斯猫', '彼得秃猫', '北美洲短毛猫', '北美洲长毛猫', '布偶猫'], 
  ['德文帝王猫', '顿斯科伊猫', '多趾缅因猫', '东方长毛猫', '东方短毛猫', '东奇尼猫'], 
  ['俄罗斯蓝猫'], 
  ['非洲狮子猫'], 
  ['哈瓦那棕猫'], 
  ['柯尼斯卷毛猫', '科拉特猫', '库里安短尾猫', '库里安长 毛短尾猫'], ['拉波卷毛猫', '拉波短毛卷毛猫', '狼猫'], 
  ['美国断尾猫', '美国短毛断尾猫', '美国卷耳猫', '美国长毛卷耳猫', '美国短毛猫', '美国硬毛猫', '孟加拉猫', '孟加拉长毛猫', '孟买猫', '缅甸猫', '缅因猫', '马恩岛猫', '米努特（小舞步）猫', '米努特长毛猫', '曼基康猫', '曼基康长毛猫'], 
  ['内达华猫', '挪威森林猫'], 
  ['欧西猫'], 
  ['日本短尾猫', '日本长毛短尾猫'], 
  ['萨凡纳猫', '苏格兰折耳猫', '苏格兰长毛折耳猫', '苏格兰立耳猫', '苏格兰长毛立耳猫', '赛尔凯克卷毛猫', '赛尔凯克长毛卷毛猫', '索马里猫', '斯芬克斯猫', '四川简州猫', '山东狮子猫'], 
  ['泰国御猫', '泰国猫', '土耳其安哥拉猫', '土耳其梵猫'], 
  ['威尔士猫', '玩具虎猫'], 
  ['夏特尔猫', '喜马拉雅猫', '暹罗猫', '西伯利亚猫', '新加坡猫', '雪鞋猫'], 
  ['英国长毛猫', '英国短毛猫', '异国猫'], ['中国狸花猫']
];
const nameDataRabbit = [
  ['安哥拉兔', '阿亨特兔'], 
  ['比华伦兔', '标准金吉拉兔', '柏鲁美路兔', '波兰兔', '比利时野兔'], 
  ['垂耳兔'], 
  ['大型安哥拉兔', '缎毛安哥拉兔', '缎毛兔'], 
  ['法国安哥拉兔', '佛罗里达州大白兔', '法国垂耳兔'],
  ['海棠兔', '荷兰兔', '荷兰垂耳兔', '荷兰侏儒兔', '黄褐兔'], 
  ['加利福尼亚兔', '巨型纹路兔', '金吉拉兔', '巨型金吉拉兔', '巨型花明兔'], 
  ['拉拿兔', '雷克斯兔'], 
  ['美国金吉拉兔', '美国垂耳兔', '美国迷你垂耳兔', '迷你雷克斯兔'], 
  ['奶油兔'], 
  ['狮子兔'], 
  ['图林根兔'], 
  ['维兰特兔'], 
  ['香槟兔', '夏温拿兔', '喜马拉雅兔', '新西兰兔'], 
  ['英国安哥拉兔', '英国小型兔', '玉桂兔', '英国斑点兔', '英国垂耳兔', '英国迷你垂耳兔', '银狐兔', '银貂兔'], 
  ['侏儒海棠兔', '泽西长毛兔', '中国白兔']
];
const nameDataRat = [
  ['布丁鼠', '北非肥尾沙鼠'], 
  ['草原犬鼠', '赤腹松鼠'], 
  ['冬白仓鼠'], 
  ['黄山松鼠', '褐鼠', '花枝鼠'],
  ['金花鼠', '金狐仓鼠', '金丝熊'], 
  ['毛丝鼠', '蜜袋鼯'], ['奶茶仓鼠'], 
  ['欧洲红松鼠'], 
  ['日本小鼯鼠', '绒鼠'], 
  ['三线仓鼠', '睡鼠'], 
  ['天竺鼠', '土拨鼠'], 
  ['鼯鼠', '倭仓鼠'], 
  ['雪地松鼠'], 
  ['英种天竺鼠', '银狐仓鼠', '一线仓鼠', '岩松鼠'], 
  ['紫衣仓鼠', '长吻松鼠']
];
const nameDataBird = [
  ['斑胸草雀', '白腰文鸟'], 
  ['长尾草雀'],
  ['虎皮鹦鹉'], 
  ['鸡尾鹦鹉', '金丝雀'], 
  ['七彩文鸟'], 
  ['桃脸牡丹鹦鹉'], 
  ['爪哇禾雀']
];
const nameDataFish = [
  ['斑马鱼'], 
  ['成吉思汗鱼', '慈鲷'], 
  ['灯鱼', '斗鱼'], 
  ['虎皮鱼', '魟鱼', '狐狸鱼', '红尾鲶', '黑白双星', '花斑连鳍'], 
  ['金鱼', '锦鲤', '剑尾鱼', '接吻鱼'], 
  ['孔雀鱼'], 
  ['龙鱼', '罗汉鱼', '丽丽鱼'], 
  ['曼龙鱼', '玛丽鱼'], 
  ['攀鲈科'], 
  ['七星刀鱼'], 
  ['神仙鱼', '三湖慈鲷'], 
  ['小丑鱼', '虾虎鱼', '血鹦鹉'], 
  ['鹦鹉鱼', '月光鱼']
];
const nameDataTortoise = [
  ['安布闭壳龟', '安哥洛卡象龟', '埃及陆龟', '凹甲陆龟'], 
  ['巴西龟', '百色闭壳龟', '白唇泥龟', '斑点池龟', '白头龟', '豹纹陆龟', '饼干龟'], 
  ['草龟'], 
  ['东锦龟', '地龟'], 
  ['辐射陆龟'], 
  ['果核泥龟'], 
  ['火焰龟', '黄喉拟水龟', '黄头侧颈龟', '黑颈乌龟', '红面蛋龟', '黄缘闭壳龟', '赫曼陆龟', '黄腿陆龟', '红腿象龟', '黑靴陆龟'], 
  ['金头闭壳龟', '鸡龟', '锯缘龟', '加拉帕戈斯象龟', '几何陆龟'], 
  ['枯叶龟', '卡罗莱箱龟'], 
  ['丽箱龟'], 
  ['密西西比图龟', '马来西亚巨龟', '马来食螺龟', '缅甸陆龟', '缅甸星龟'], 
  ['拟鳄龟', '南美渔龟'], 
  ['欧洲泽龟'], 
  ['平胸龟'], 
  ['翘缘陆龟'], 
  ['麝香龟', '三线闭壳龟', '四眼斑水龟', '三爪箱龟', '苏卡达陆龟', '四指陆龟', '沙漠地鼠龟'], 
  ['剃刀龟', '头盔泥龟', '太阳龟'], 
  ['西部锦龟', '西氏长颈龟'], 
  ['云南闭壳龟', '圆澳龟', '眼斑龟', '亚达伯拉象龟', '印度星龟'], 
  ['真鳄龟', '中华花龟', '猪鼻龟', '窄桥麝香龟', '钻纹龟']
];
const nameDataOther = [
  ['宠物博物馆', '宠物健康知识', '宠物时尚', '宠物美容'], 
  ['好物种草', '活动推荐'], 
  ['萌宠漫画', '萌宠视频', '美术展览'], 
  ['趣闻分享', '趣味测试', '取名创意'], 
  ['温馨日常', '文艺创作'], 
  ['小白教程', '训练技巧'], 
  ['有趣梗图'], 
  ['珍奇宠物', '主题壁纸']
];

Page({
  data: {
    // 页面垂直滑动的距离
    currentClassKey: "eight", //当前大分类
    scrollTop: undefined,

    //下面是分区的索引栏和内容数据
    nameDataDog,
    nameDataCat,
    nameDataRabbit,
    nameDataRat,
    nameDataBird,
    nameDataFish,
    nameDataTortoise,
    nameDataOther,
    sideBarDataDog,
    sideBarDataCat,
    sideBarDataRabbit,
    sideBarDataRat,
    sideBarDataBird,
    sideBarDataFish,
    sideBarDataTortoise,
    sideBarDataOther,

    currentTab: 'hot', // 默认显示热门
    color1: 'black',
    color2: 'coral',
    color3: 'black',
    hotPosts: [],
    searchinput: '',

    pageHot:1,//用于分页推送热门帖子
    pageFollow:1,//用于分页推送关注帖子
    pageSize:10,
    hasMoreDataHot:true,
    hasMoreDataFollow:true,

    isLoading: false, //加载中图标
    followPosts: [], //关注的帖子
    EditAtcUrl:"../../resource/EditButtonr.png",
    navigationUrl:"../../resource/navigationbar.png",
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  onShareAppMessage:function(event){
    const articleid=event.currentTarget.dataset.articleid
    wx.showShareMenu({
      withShareTicket:true,
      menu:['shareAppMessage','shareTimeline']
    })
    // wx.request({
    //   url: 'http://43.143.139.4:8000/api/v1/shareArticle/',
    //   method: 'GET',
    //   data: {
    //     ArticleID: articleid, 
    //   },
    //   success: (res) => {
    //   }
    // })
  },
  onShareTimeline(){
  },
  // 页面监听函数
  onPageScroll(res) {
    this.setData({
      scrollTop: res.scrollTop,
    })
  },
  // 搜索输入
  searchInput: function(event) {
    const input = event.detail.value
    this.setData({
      searchinput: input
    })
  },
  //清除搜索框
  clearSearchInput: function(event) {
    this.setData({
      searchinput: ''
    })
  },
  //向后端发送请求获取关注帖子
  getFollowArticles: function () {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/followArticles/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        page:that.data.pageFollow
      },
      success:function(res) {
        if(res.data.length<that.data.pageSize)
        {
          that.setData({
            hasMoreDataFollow:false,
          })
        }
        that.setData({
          followPosts:that.data.followPosts.concat(res.data),
          pageFollow: that.data.pageFollow + 1
        })
      }
    })
  },

  //向后端发送请求获取热门帖子
  getHotArticles: function () {
    var that = this
    wx.request({
      url: 'http://43.143.139.4:8000/api/v1/HotArticles/',
      method:"GET",
      header: {'content-type': 'application/json' //
      },
      data:{
        openid:app.globalData.openid,
        page:that.data.pageHot
      },
      success:function(res) {
        that.setData({
          hotPosts:that.data.hotPosts.concat(res.data),
          pageHot: that.data.pageHot + 1
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

  //搜索
  search: function(event) {
    var that = this
    if(that.data.searchinput.length===0)
    {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'error',
        duration: 1000,
      })
    }
    else
    {
      const searchinput=that.data.searchinput
      wx.navigateTo({
        url:'/pages/searchresult/searchresult?searchinput='+searchinput,
      })
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    var that = this;
    if(that.data.currentTab==="classification")
    {
      wx.stopPullDownRefresh();
      return;
    }
    that.setData({
      isLoading:true,
      pageFollow:1,
      pageHot:1,
      hasMoreDataFollow:true,
      hasMoreDataHot:true,
      hotPosts:[],
      followPosts:[],
    }, function () {
    // setData 生效后执行的操作
    if(that.data.currentTab==="hot")
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/HotArticles/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
          page:that.data.pageHot,
        },
        success:function(res) {
            that.setData({
              hotPosts: res.data,
              pageHot:that.data.pageHot+1
            })
            setTimeout(() => {
              // 停止下拉刷新
              wx.stopPullDownRefresh();
              // 隐藏自定义加载中图标
              that.setData({
                isLoading: false,
              });
            }, 1000);
        },
        fail:function(res) {
          setTimeout(() => {
            // 停止下拉刷新
            wx.stopPullDownRefresh();
          }, 1000);
          // 隐藏自定义加载中图标
          that.setData({
            isLoading: false,
          });
        }
      })
    }
    if(that.data.currentTab==="following")
    {
      wx.request({
        url: 'http://43.143.139.4:8000/api/v1/followArticles/',
        method:"GET",
        header: {'content-type': 'application/json' //
        },
        data:{
          openid:app.globalData.openid,
          page:that.data.pageFollow
        },
        success:function(res) {
          that.setData({
            followPosts: res.data,
            pageFollow: that.data.pageFollow
          })
          setTimeout(() => {
            // 停止下拉刷新
            wx.stopPullDownRefresh();
            // 隐藏自定义加载中图标
            that.setData({
              isLoading: false,
            });
          }, 1000);
        },
        fail:function(res) {
          setTimeout(() => {
            // 停止下拉刷新
            wx.stopPullDownRefresh();
            // 隐藏自定义加载中图标
            that.setData({
              isLoading: false,
            });
          }, 1000);
        }
      })
    }
    });
  },
  //上拉加载
  onReachBottom: function () {
    var that =this
    if (that.data.hasMoreDataHot && that.data.currentTab=="hot") {
      that.getHotArticles();
    }
    else if(that.data.hasMoreDataFollow && that.data.currentTab=="following")
    {
      that.getFollowArticles();
    }
    else if(that.data.currentTab=="following" || that.data.currentTab=="hot") {
      wx.showToast({
        title: '没有更多数据',
        duration: 1000
      })
    }
  },
  //查看帖子详情
  postDetail(event) {
    const articleid = event.currentTarget.dataset.articleid
    const index = event.currentTarget.dataset.index
    const currentTab = this.data.currentTab
    wx.navigateTo({
      url:'/pages/detail/detail?articleid='+articleid+'&index='+index+'&currentTab='+currentTab,
    })
  },
  //进入用户主页
  viewUserInfo: function(event) {
    const tempuserid = event.currentTarget.dataset.userid
    wx.navigateTo({
      url:'/pages/userinfo/userinfo?userid='+tempuserid,
    })
  },
  //点赞帖子，内外同步
  likePost(event) {
      // 发送点赞请求到后端，假设点赞成功后返回新的点赞数
      const articleid = event.currentTarget.dataset.articleid
      const liked = event.currentTarget.dataset.liked
      const like = event.currentTarget.dataset.like
      const index = event.currentTarget.dataset.index
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
            if(that.data.currentTab==='hot')
            {
              const currentItem = that.data.hotPosts[index];
              const updatedItem = { ...currentItem, liked: true, like: like + 1 };
              // 使用 splice 方法更新数组中特定项的值
              that.data.hotPosts.splice(index, 1, updatedItem);
              that.setData({
                ['hotPosts']: that.data.hotPosts
              });
            }
            else if(that.data.currentTab==='following')
            {
              const currentItem = that.data.followPosts[index];
              const updatedItem = { ...currentItem, liked: true, like: like + 1 };
              // 使用 splice 方法更新数组中特定项的值
              that.data.followPosts.splice(index, 1, updatedItem);
              that.setData({
                ['followPosts']: that.data.followPosts
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
              if(that.data.currentTab==='hot')
              {
                const currentItem = that.data.hotPosts[index];
                const updatedItem = { ...currentItem, liked: 
                  false, like: like - 1 };
                // 使用 splice 方法更新数组中特定项的值
                that.data.hotPosts.splice(index, 1, updatedItem);
                that.setData({
                  ['hotPosts']: that.data.hotPosts
                });
              }
              else if(that.data.currentTab==='following')
              {
                const currentItem = that.data.followPosts[index];
                const updatedItem = { ...currentItem, liked: 
                  false, like: like - 1 };
                // 使用 splice 方法更新数组中特定项的值
                that.data.followPosts.splice(index, 1, updatedItem);
                that.setData({
                  ['followPosts']: that.data.followPosts
                });
              }
          }
        });
      }
  },
  onLoad: function (event) {
    var that = this
    that.getHotArticles()
  },
  //切换分类内的标签
  changeTabs: function (event) {
    // 滚动到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0, // 滚动动画时长
      success: () => {
        // 滚动完成后设置currentClassKey
        const key = event.detail.activeKey;
        this.setData({
          currentClassKey: key,
        });
      },
    });
  },
  //切换关注、热门、分类
  switchTab: function (event) {
    const tab = event.currentTarget.dataset.tab;
    const id = event.currentTarget.dataset.id;
    this.setData({
        currentTab: tab,
        color1: id === '1' ? 'coral' : 'black',
        color2: id === '2' ? 'coral' : 'black',
        color3: id === '3' ? 'coral' : 'black'
    });
    if(tab == "hot") {
      var that = this
      that.setData({
        hasMoreDataHot:true,
        pageHot:1,
        hotPosts:[],
      }, function () {
        // setData 生效后执行的操作
        that.getHotArticles();
      });
    }
    if(tab == "following") {  
      var that = this
      that.setData({
        hasMoreDataFollow:true,
        pageFollow:1,
        followPosts:[],
      }, function () {
        // setData 生效后执行的操作
        that.getFollowArticles();
      });
    }
  },
  //进入发帖页面
  EditAtc:function(e){
        wx.navigateTo({
            url:"../edit/edit"
        })
  },
  //分类详情
  viewZone: function(e) {
    const zone = e.currentTarget.dataset.zone
    const subzone = e.currentTarget.dataset.subzone
    var that = this
    wx.navigateTo({
      url:'/pages/zoneresult/zoneresult?zone='+zone+'&subzone='+subzone,
    })
  },
  
});