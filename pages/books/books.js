// pages/books/books.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books : []
  },
  onLoad :function(options)
  {
    var that = this
    wx.request({
      url: app.globalData.requestUrl + '/words/getAllWordsTableName',
      success (res) {
        that.setData({
          books: res.data
        })
        console.log(res.data)
      }
    })
    app.globalData.isMarkedPage = false;
  },

 
  bookFunc: function(e){
    const tableName = e.currentTarget.dataset.tablename;
    console.log(tableName)
    wx.navigateTo({
      url: '../book/book?tablename=' + tableName,
      fail:function(e){
        console.log(e);
      }
    })
  }
})