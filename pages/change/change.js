// dbdemo/pages/rebe/rebe.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    scrollTop: 0,
    tabs: [],
    value: '',
    activeTab: 0
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
    this.setData({
      value: event.detail
    })
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },

  onSearch() {
    console.log(this.data.value)
    this.getResult()
  },
  onClick() {
    console.log(this.data.value)
    this.getResult()
  },

  onTabChange(e) {
    this.setData({
      activeTab: e.detail.name
    })
  },

  getResult() {
    const toast = Toast.loading({
      mask: true,
      duration: 0,
      loadingType: 'spinner',
      message: '查询中...'
    });
    wx.request({
      url: app.globalData.requestUrl + '/transform/getResult',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        word: this.data.value
      },
      success: res => {
        this.setData({
          tabs: res.data
        })
        toast.clear()
        console.log(res.data)
      }
    })
  }
})