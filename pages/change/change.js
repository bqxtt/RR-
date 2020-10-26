// dbdemo/pages/rebe/rebe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      })
    }
  },

  onChange: function(event) {
    console.log(event.detail)
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  }
})