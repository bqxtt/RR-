// pages/books/books.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.requestUrl + '/words/getAllWordsBookName',
      success(res) {
        that.setData({
          books: res.data
        })
        console.log(res.data)
      }
    })
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      active: 1
    })
  }
  },

  bookFunc: function (e) {
    const id = e.currentTarget.dataset.id
    const wordbookid = this.data.books[id].wordBookId
    const wordbookname = this.data.books[id].wordBookName
    console.log(wordbookid)
    wx.navigateTo({
      url: '../book/book?wordbookid=' + wordbookid + '&wordbookname=' + wordbookname,
      fail: function (e) {
        console.log(e);
      }
    })
  }
})