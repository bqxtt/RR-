// pages/note/note.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp()
var wordId
Page({
  note: '',
  data: {

  },
  onLoad: function (options) {
    wordId = options.wordId
  },

  tmpNote: function (e) {
    console.log(e)
    this.note = e.detail
  },
  sendNote: function () {
    wx.request({
      url: app.globalData.requestUrl + '/words/addComment',
      method: "POST",
      data: {
        wordId: wordId,
        userOpenId: app.globalData.openId,
        userNickname: app.globalData.userInfo.nickName,
        userAvatarUrl: app.globalData.userInfo.avatarUrl,
        comment: this.note
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        if (res.data === 'success') {
          Toast({
            type: 'success',
            duration: 1000,
            message: '保存成功',
            onClose: () => {
              wx.navigateBack()
            }
          })
        } else {
          Toast({
            type: 'fail',
            duration: 1000,
            message: '保存失败',
            onClose: () => {
              wx.navigateBack()
            }
          })
        }
      },
      fail: ret => {
        Toast({
          type: 'fail',
          duration: 1000,
          message: '保存失败',
          onClose: () => {
            wx.navigateBack()
          }
        })
      }
    })
  }
})