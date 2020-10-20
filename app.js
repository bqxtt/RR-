const { default: toast } = require("./miniprogram_npm/@vant/weapp/toast/toast")

//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        console.log(res)
        wx.request({
          url: this.globalData.requestUrl + '/words/getUserOpenId/' + res.code,
          success: res => {
            console.log(res)
            this.globalData.openId = res.data
            console.log(this.globalData.openId)
          },
          fail: res => {
            toast.fail(res)
          }
        })
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    requestUrl: "https://bqxtcg.com",
    userInfo: null,
    openId: null,
    word: null,
  }
})