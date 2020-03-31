// pages/cards/cards.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const DEFAULT_PAGE = 0;
const app = getApp();
Page({
  startPageX: 0,
  startPageY: 0,
  currentView: DEFAULT_PAGE,

  data: {
    animationMain: null,//正面
    animationBack: null,//背面
    show: false,
    toView: `card_${DEFAULT_PAGE}`,
    maxPage : 0,
    words: [],
    marked: [],
    notes: []
  },
  onLoad : function(options)
  {
    this.animation_main = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    
    var mark = []
    var flag = app.globalData.isMarkedPage ? true : false
    for (var i = 0; i < app.globalData.words.length; ++i) 
    {
      mark.push(flag);
    }
    this.currentView = Number(options.currentView)
    this.setData({
      words: app.globalData.words,
      maxPage : app.globalData.words.length,
      toView : `card_${this.currentView}`,
      marked : mark
    })
    //console.log(app.globalData.words)

    //console.log(mark)

  },
  //卡片反转动画
  rotateFn : function(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id

    // 点击正面
    if (id == 1) {
      this.animation_main.rotateY(180).step()
      this.animation_back.rotateY(0).step()
      this.setData({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      })
    }
    // 点击背面
    else {
      this.animation_main.rotateY(0).step()
      this.animation_back.rotateY(-180).step()
      this.setData({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      })
    }
  },

  touchStart : function(e) {
    console.log(e);
    this.startPageX = e.changedTouches[0].pageX;
    this.startPageY = e.changedTouches[0].pageY;

    this.animation_main.rotateY(0).step()
    this.animation_back.rotateY(-180).step()
    this.setData({
      animationMain: this.animation_main.export(),
      animationBack: this.animation_back.export(),
    })
    
  },

  touchEnd : function(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const moveY = e.changedTouches[0].pageY - this.startPageY;
    const maxPage = this.data.words.length - 1;
    //console.log(moveX);
    if (Math.abs(moveX) >= 150) {
      if (moveX > 0) {
        this.currentView = Number(this.currentView) !== 0 ? Number(this.currentView) - 1 : 0;
      } else {
        this.currentView = Number(this.currentView) !== Number(maxPage) ? Number(this.currentView) + 1 : Number(maxPage);
      }
      //切换卡片更新笔记
      this.setData({
        notes : []
      })
    }
    if(Math.abs(moveY) >= 150)
    {
      if(moveY < 0)
      {
        this.openComment();
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },

  onClose : function()
  {
    this.setData({
      show : false
    })
  },
  openComment : function()
  {
    console.log(this.data.notes);
    this.setData({
      show : true
    })
  },
  //标记
  mark : function(e)
  {
    var id = e.currentTarget.dataset.id
    var mark = this.data.marked
    var message = mark[id] ? "取消标记" : "标记成功"
    mark[id] = !mark[id]

    if(mark[id])app.globalData.markedWords.push(this.data.words[id]);

    Toast.success(message)
    this.setData({
      marked : mark
    })
  },
  //笔记
  showNote : function()
  {
    wx.navigateTo({
      url: '../note/note',
    })
  }
})