import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
// pages/book/book.js
const LIMIT = 20
const app = getApp()
var wordBookId = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wordName: "",
    scrolltop: 0,
    words: [],
  },
  pages: 0,


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id);
    wordBookId = options.wordbookid
    console.log(wordBookId)
    this.setData({
      wordName: options.wordbookname
    })
    this.fetchWords();
  },
  fetchWords: function () {
    const toast = Toast.loading({
      mask: true,
      duration: 0,
      loadingType: 'spinner',
      message: '加载中...'
    });
    const that = this
    var url = app.globalData.requestUrl;
    if (wordBookId === "marked") {
      url = url + "/words/getMarkedWords"
    } else {
      url = url + '/words/getWords'
    }
    console.log(app.globalData.openId)
    wx.request({
      url: url,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        wordBookId: wordBookId,
        userOpenId: app.globalData.openId
      },
      success(res) {
        that.setData({
          words: res.data
        })
        console.log(res.data)
        toast.clear()
      },
      fail(res) {
        console.log(res)
        toast.clear()
        Toast.fail('加载失败')
      }
    })
  },
  scrollHandle: function (e) {
    //console.log(e);
    // this.setData({
    //   scrolltop: e.detail.scrollTop
    // })
  },
  scrollLoading: function () {
    console.log("hahah");
    //this.fetchWords();
  },

  onClick: function (e) {
    console.log(e);
    var currentView = e.currentTarget.dataset.currentview;
    app.globalData.word = this.data.words[currentView];
    wx.navigateTo({
      url: '../card/card'
    })
  },
  onClose: function (event) {
    const {
      position,
      instance,
      name
    } = event.detail;
    console.log(event);
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        const flag = this.data.words[name].flag;
        this.data.words[name].flag = !flag;
        this.setData({
          words: this.data.words
        });
        Toast({
          type: 'success',
          message: '操作成功',
          duration: 500,
          onClose: () => {
            instance.close();
          }
        })
        break;
    }
  }
})