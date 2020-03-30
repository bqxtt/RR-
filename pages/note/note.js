// pages/note/note.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  note : '',
  /**
   * 页面的初始数据
   */
  data: {

  },

  tmpNote: function(e)
  {
    console.log(e)
    this.note = e.detail
  },
  sendNote: function()
  {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var newNotes = prevPage.data.notes;
    newNotes.push(this.note);
    console.log(this.note);
    prevPage.setData({
      notes : newNotes
    })
    Toast({
      type: 'success',
      duration : 1000,
      message: '发送成功',
      onClose: () => {
        wx.navigateBack()
      }
    })
  }
})