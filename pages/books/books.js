// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:
    [
      {
          "src": "../../../../resource/image/book.png",
          "text": "专业四级",
          "func": "getStandardDic"
      },
      {
        "src": "../../../../resource/image/book.png",
        "text":"默认",
        "func": "getMyWords"
      },
      {
        "src": "../../../../resource/image/book.png",
        "text":"标记",
        "func": "getMarkedWords"
      },
      // {
      //   "src": "../../../../resource/image/book.png",
      //   "text":"标记",
      //   "id":3
      // }
    ]

  },
  onLoad :function(options)
  {
    const app = getApp();
    app.globalData.isMarkedPage = false;
  },

 
  bookFunc: function(e)
  {
    const func = e.currentTarget.dataset.func;
    wx.navigateTo({
      url: '../book/book?func=' + func,
      fail:function(e)
      {
        console.log(e);
      }
    })
  }
})