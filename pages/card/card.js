// pages/card/card.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({

  data: {
    animationMain: null, //正面
    animationBack: null, //背面
    show: false,
    word: null
  },
  onLoad: function (options) {
    this.animation_main = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    this.animation_back = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })

    this.setData({
      word: app.globalData.word
    })
    //console.log(app.globalData.words)

    //console.log(mark)

  },
  //卡片反转动画
  rotateFn: function (e) {
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

  onClose: function () {
    this.setData({
      show: false
    })
  },
  openComment: function () {
    console.log(this.data.notes);
    this.setData({
      show: true
    })
  },
  //标记
  mark: function (e) {
    var wordId = e.currentTarget.dataset.wordid
    var mark = this.data.word.isMarked
    var message = mark ? "取消标记" : "标记成功"
    if(mark){
      wx.request({
        url: app.globalData.requestUrl + "/words/deleteMark?wordId=" + wordId + "&userOpenId=" + app.globalData.openId,
        method: "DELETE",
        success: res => {
          console.log(res)
          if(res.data === 'success') {
            var word = this.data.word
            word.isMarked = false
            this.setData({
              word: word
            })
            toast.success(message)
          } else {
            toast.fail("取消标记失败")
          }
        },
        fail: res => {
          toast.fail("取消标记失败")
        }
      })
    } else {
      wx.request({
        url: app.globalData.requestUrl + "/words/addMark",
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          wordId: wordId,
          userOpenId: app.globalData.openId
        },
        success: res => {
          console.log(res)
          if(res.data === 'success') {
            var word = this.data.word
            word.isMarked = true
            this.setData({
              word: word
            })
            toast.success(message)
          } else {
            toast.fail("标记失败")
          }
        },
        fail: res => {
          toast.fail("标记失败")
        }
      })
    }
  },
  //笔记
  showNote: function () {
    wx.navigateTo({
      url: '../note/note',
    })
  },
  scrollHandle: function (e) {
    //console.log(e);
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  scrollLoading: function () {
    console.log("hahah");
    //this.fetchWords();
  },
})