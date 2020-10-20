
//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        console.log(res)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + this.globalData.appId + '&secret=' + this.globalData.appSecret + '&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            console.log(res)
            this.globalData.openId = res.data.openid
            //console.log(this.globalData.openId)
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
    words : [],
    markedWords: [],
    isMarkedPage: null,
    requestUrl: "https://localhost",
    appSecret: "7762dee5b68eb4806367f4364758c8fa",
    appId: "wxe12fe34c0c926447",
    userInfo: null,
    openId: null,
    word: null
  }
})