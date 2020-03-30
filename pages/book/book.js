import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
// pages/book/book.js
const LIMIT = 20
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    func : "",
    scrolltop: 0,
    words:[],
  },
  pages : 0,
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id);
    this.setData(
      {
        func : options.func
      });

    //临时标记特判
    if (options.func == "getMarkedWords")
    {
      this.setData({
        words : app.globalData.markedWords
      })
      app.globalData.isMarkedPage = true
    }

    else this.fetchWords();
      //console.log(this.data.words)
  },
  fetchWords : function()
  {
    const toast = Toast.loading({
      mask: true,
      duration: 0,
      loadingType: 'spinner',
      message: '加载中...'
    });
    wx.cloud.callFunction({
      name : this.data.func,
      success : res =>
      {
        console.log(res);
        this.setData({
          words : res.result.data
        })
        // var len = this.data.words.length;
        // var that = this;
        // for (var i in this.data.words) {
        //   console.log(i);
        //   wx.cloud.callFunction({
        //     name: 'checkMark',
        //     data:
        //     {
        //       "wordKey": that.data.words[i].wordKey
        //     },
        //     success: res => {
        //       //console.log(res.result);
        //       var flag = "words[" + i + "].flag";
        //       that.setData({
        //         [flag]: res.result
        //       })
        //       console.log(i)
        //     }
        //   })
        // }
        console.log(this.data.words)
        toast.clear()
      },
      fail : res => 
      {
        Toast.fail('加载失败')
      }
    })
  },
  scrollHandle: function(e)
  {
    //console.log(e);
    this.setData({
      scrolltop : e.detail.scrollTop
    })
  },
  scrollLoading: function()
  {
    console.log("hahah");
    //this.fetchWords();
  },

  onClick:function(e)
  {
    console.log(e);

    //console.log(this.data.words);
    app.globalData.words = this.data.words;
    var currentView = e.currentTarget.dataset.currentview;
    wx.navigateTo({
      url: '../cards/cards?currentView=' + currentView,
    })
  },
  onClose:function(event) {
    const { position, instance ,name} = event.detail;
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
          type:'success',
          message:'操作成功',
          duration:500,
          onClose:()=>
          {
            instance.close();
          }
        })
        break;
    }
  }
})