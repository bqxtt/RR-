// pages/game/game.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp()
var problems = []
Page({

  score: 0,
  /**
   * 页面的初始数据
   */
  data: {
    radio: 0,
    count: 1,
    problem: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  init() {
    wx.request({
      url: app.globalData.requestUrl + '/problems/updateScore',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userOpenId: app.globalData.openId,
        score: this.score
      },
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
    this.setData({
      count: 1,
      radio: 0
    })
    this.score = 0
    wx.request({
      url: app.globalData.requestUrl + '/problems/getAllProblems',
      success: res => {
        problems = res.data
        console.log(problems)
        this.setData({
          problem: problems[this.data.count - 1]
        })
      }
    })
  },

  nextProblem() {
    var newCount = this.data.count + 1
    if (newCount > problems.length) {
      return
    }
    this.setData({
      count: newCount,
      problem: problems[newCount - 1],
      radio: 0
    })
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onClick(event) {
    var right = this.data.problem.answers[this.data.radio - 1].right
    if (right) {
      this.score++
      Dialog.alert({
        title: '回答正确',
        message: '当前积分：' + this.score,
      }).then(() => {
        this.nextProblem()
      });
    } else {
      wx.request({
        url: app.globalData.requestUrl + '/problems/getScore',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userOpenId: app.globalData.openId
        },
        success: res => {
          Dialog.alert({
            title: '闯关失败',
            message: '当前积分：' + this.score + '\n历史最高积分：' + res.data,
          }).then(() => {
            this.init()
          });
        }
      })
    }

  }
})