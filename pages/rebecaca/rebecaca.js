// dbdemo/pages/rebecaca/rebecaca.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rebe:[],
    yuan:[],
    showV:[],
    showV1: [],
    color:[],
    id:0,
    i:0,
    sti:0,
    red: "#ff0000",
    black: "#000000",
    bianweiCatalog:[
    "el presente del indicativo",
    "pretérito perfecto simple del indicativo",
    "pretérito imperfecto del indicativo",
    "futuro imperfecto del indicativo",
    "presente del subjuntivo",
    "pretérito imperfecto del subjuntivo",
    "imperativo afirmado",
    "condicional simple",
    "gerundio",
    "participio pasado"
    ]   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    for(var i=0;i<500;i++)
    {
       this.data.color.push(0);
    }


    const db = wx.cloud.database()
    db.collection('verb_conjugation').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      this.setData({
        rebe: res.data
      })
    })

    const db2 = wx.cloud.database()
    db2.collection('index').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      this.setData({
        yuan: res.data
      })
    })
   var n=0;
    this.setData({
      showV: []
    })
    let showV = this.data.showV;
    for (var i = 0; i < this.data.rebe.length; i++) {

      if (this.data.rebe[i].yuanxing == this.data.yuan[this.data.id].yuanxing) {
        showV.push(this.data.rebe[i])
        n++;
        
      }

    }
    console.log(this.data.rebe.length)
    this.setData({
      showV
    })
    for (var i = 0; i < this.data.bianweiCatalog.length; i++) 
    {
      for (var j = 0; j < this.data.showV[j]; j++) {

        if (this.data.showV[j].shitai == this.data.bianweiCatalog[i]) {
          this.data.showV1.push(this.data.showV[j])

        }

      }

    }

    // let showV1 = this.data.showV1;

    // this.setData({
    //   showV1
    // })
    
     console.log(this.data.showV)

    // console.log(this.data.showV1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  increaseId: function (e) {

    this.setData({
      sti: 0
    })
    this.setData({
      showV: []
    })
    let showV = this.data.showV;
    for(var i=0;i<this.data.rebe.length;i++ )
    {

      if (this.data.rebe[i].yuanxing == this.data.yuan[this.data.id].yuanxing)
        {
        showV.push(this.data.rebe[i])
        }

    }
    this.setData({
      showV
    })
    this.setData({
      showV1: []
    })
    let showV1 = this.data.showV1;

    for (var i = 0; i < this.data.bianweiCatalog.length; i++) {
      for (var j = 0; j < this.data.showV.length; j++) {

        if (this.data.showV[j].shitai == this.data.bianweiCatalog[i]) {
          showV1.push(this.data.showV[j])

        }

      }

    }

    this.setData({
      showV1
    })
  
    var id1 = this.data.id;
    id1+=1
    this.setData({
      id: id1
    })
  },


  
  submit: function (e) {

   this.setData({
     sti:1
   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      showV: []
    })
    let showV = this.data.showV;
    for (var i = 0; i < this.data.rebe.length; i++) {

      if (this.data.rebe[i].yuanxing == this.data.yuan[this.data.id].yuanxing) {
        showV.push(this.data.rebe[i])
      }

    }
    this.setData({
      showV
    })
    this.setData({
      showV1: []
    })
    let showV1 = this.data.showV1;

    for (var i = 0; i < this.data.bianweiCatalog.length; i++) {
      for (var j = 0; j < this.data.showV.length; j++) {

        if (this.data.showV[j].shitai == this.data.bianweiCatalog[i]) {
          showV1.push(this.data.showV[j])

        }

      }

    }

    this.setData({
      showV1
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  bindKeyInput: function (e) {
   console.log(e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  checkAnswer1: function (e) {
    if (e.detail.value==this.data.showV1[0].yo)
    {
      this.setData({
        'color[1]':1
      })
    }
    else
    {
      this.setData({
        'color[1]': 0
      })
    }
 
  },

  checkAnswer2: function (e) {
    if (e.detail.value == this.data.showV1[0].tu) {
      this.setData({
        'color[2]': 1
      })
    }
    else {
      this.setData({
        'color[2]': 0
      })
    }

  },

  checkAnswer3: function (e) {
    if (e.detail.value == this.data.showV1[0].el_ella_usted) {
      this.setData({
        'color[3]': 1
      })
    }
    else {
      this.setData({
        'color[3]': 0
      })
    }

  },

  checkAnswer4: function (e) {
    if (e.detail.value == this.data.showV1[0].nosotros) {
      this.setData({
        'color[4]': 1
      })
    }
    else {
      this.setData({
        'color[4]': 0
      })
    }

  },

  checkAnswer5: function (e) {
    if (e.detail.value == this.data.showV1[0].vosotros) {
      this.setData({
        'color[5]': 1
      })
    }
    else {
      this.setData({
        'color[5]': 0
      })
    }

  },

  checkAnswer6: function (e) {
    if (e.detail.value == this.data.showV1[0].ellos_ellas_ustedes) {
      this.setData({
        'color[6]': 1
      })
    }
    else {
      this.setData({
        'color[6]': 0
      })
    }

  },









    checkAnswer7: function (e) {
    if (e.detail.value == this.data.showV1[1].yo) {
      this.setData({
        'color[7]': 1
      })
    }
    else {
      this.setData({
        'color[7]': 0
      })
    }

  },

  checkAnswer8: function (e) {
    if (e.detail.value == this.data.showV1[1].tu) {
      this.setData({
        'color[8]': 1
      })
    }
    else {
      this.setData({
        'color[8]': 0
      })
    }

  },

  checkAnswer9: function (e) {
    if (e.detail.value == this.data.showV1[1].el_ella_usted) {
      this.setData({
        'color[9]': 1
      })
    }
    else {
      this.setData({
        'color[9]': 0
      })
    }

  },

  checkAnswer10: function (e) {
    if (e.detail.value == this.data.showV1[1].nosotros) {
      this.setData({
        'color[10]': 1
      })
    }
    else {
      this.setData({
        'color[10]': 0
      })
    }

  },

  checkAnswer11: function (e) {
    if (e.detail.value == this.data.showV1[1].vosotros) {
      this.setData({
        'color[11]': 1
      })
    }
    else {
      this.setData({
        'color[11]': 0
      })
    }

  },

  checkAnswer12: function (e) {
    if (e.detail.value == this.data.showV1[1].ellos_ellas_ustedes) {
      this.setData({
        'color[12]': 1
      })
    }
    else {
      this.setData({
        'color[12]': 0
      })
    }

  },

















    checkAnswer13: function (e) {
    if (e.detail.value == this.data.showV1[2].yo) {
      this.setData({
        'color[13]': 1
      })
    }
    else {
      this.setData({
        'color[13]': 0
      })
    }

  },

  checkAnswer14: function (e) {
    if (e.detail.value == this.data.showV1[2].tu) {
      this.setData({
        'color[14]': 1
      })
    }
    else {
      this.setData({
        'color[14]': 0
      })
    }

  },

  checkAnswer15: function (e) {
    if (e.detail.value == this.data.showV1[2].el_ella_usted) {
      this.setData({
        'color[15]': 1
      })
    }
    else {
      this.setData({
        'color[15]': 0
      })
    }

  },

  checkAnswer16: function (e) {
    if (e.detail.value == this.data.showV1[2].nosotros) {
      this.setData({
        'color[16]': 1
      })
    }
    else {
      this.setData({
        'color[16]': 0
      })
    }

  },

  checkAnswer17: function (e) {
    if (e.detail.value == this.data.showV1[2].vosotros) {
      this.setData({
        'color[17]': 1
      })
    }
    else {
      this.setData({
        'color[17]': 0
      })
    }

  },

  checkAnswer18: function (e) {
    if (e.detail.value == this.data.showV1[2].ellos_ellas_ustedes) {
      this.setData({
        'color[18]': 1
      })
    }
    else {
      this.setData({
        'color[18]': 0
      })
    }

  },

























    checkAnswer19: function (e) {
    if (e.detail.value == this.data.showV1[3].yo) {
      this.setData({
        'color[19]': 1
      })
    }
    else {
      this.setData({
        'color[19]': 0
      })
    }

  },

  checkAnswer20: function (e) {
    if (e.detail.value == this.data.showV1[3].tu) {
      this.setData({
        'color[20]': 1
      })
    }
    else {
      this.setData({
        'color[20]': 0
      })
    }

  },

  checkAnswer21: function (e) {
    if (e.detail.value == this.data.showV1[3].el_ella_usted) {
      this.setData({
        'color[21]': 1
      })
    }
    else {
      this.setData({
        'color[21]': 0
      })
    }

  },

  checkAnswer22: function (e) {
    if (e.detail.value == this.data.showV1[3].nosotros) {
      this.setData({
        'color[22]': 1
      })
    }
    else {
      this.setData({
        'color[22]': 0
      })
    }

  },

  checkAnswer23: function (e) {
    if (e.detail.value == this.data.showV1[3].vosotros) {
      this.setData({
        'color[23]': 1
      })
    }
    else {
      this.setData({
        'color[23]': 0
      })
    }

  },

  checkAnswer24: function (e) {
    if (e.detail.value == this.data.showV1[3].ellos_ellas_ustedes) {
      this.setData({
        'color[24]': 1
      })
    }
    else {
      this.setData({
        'color[24]': 0
      })
    }

  },


















    checkAnswer25: function (e) {
    if (e.detail.value == this.data.showV1[4].yo) {
      this.setData({
        'color[25]': 1
      })
    }
    else {
      this.setData({
        'color[25]': 0
      })
    }

  },

  checkAnswer26: function (e) {
    if (e.detail.value == this.data.showV1[4].tu) {
      this.setData({
        'color[26]': 1
      })
    }
    else {
      this.setData({
        'color[26]': 0
      })
    }

  },

  checkAnswer27: function (e) {
    if (e.detail.value == this.data.showV1[4].el_ella_usted) {
      this.setData({
        'color[27]': 1
      })
    }
    else {
      this.setData({
        'color[27]': 0
      })
    }

  },

  checkAnswer28: function (e) {
    if (e.detail.value == this.data.showV1[4].nosotros) {
      this.setData({
        'color[28]': 1
      })
    }
    else {
      this.setData({
        'color[28]': 0
      })
    }

  },

  checkAnswer29: function (e) {
    if (e.detail.value == this.data.showV1[4].vosotros) {
      this.setData({
        'color[29]': 1
      })
    }
    else {
      this.setData({
        'color[29]': 0
      })
    }

  },

  checkAnswer30: function (e) {
    if (e.detail.value == this.data.showV1[4].ellos_ellas_ustedes) {
      this.setData({
        'color[30]': 1
      })
    }
    else {
      this.setData({
        'color[30]': 0
      })
    }

  },










    checkAnswer31: function (e) {
    if (e.detail.value == this.data.showV1[5].yo) {
      this.setData({
        'color[31]': 1
      })
    }
    else {
      this.setData({
        'color[31]': 0
      })
    }

  },

  checkAnswer32: function (e) {
    if (e.detail.value == this.data.showV1[5].tu) {
      this.setData({
        'color[32]': 1
      })
    }
    else {
      this.setData({
        'color[32]': 0
      })
    }

  },

  checkAnswer33: function (e) {
    if (e.detail.value == this.data.showV1[5].el_ella_usted) {
      this.setData({
        'color[33]': 1
      })
    }
    else {
      this.setData({
        'color[33]': 0
      })
    }

  },

  checkAnswer34: function (e) {
    if (e.detail.value == this.data.showV1[5].nosotros) {
      this.setData({
        'color[34]': 1
      })
    }
    else {
      this.setData({
        'color[34]': 0
      })
    }

  },

  checkAnswer35: function (e) {
    if (e.detail.value == this.data.showV1[5].vosotros) {
      this.setData({
        'color[35]': 1
      })
    }
    else {
      this.setData({
        'color[35]': 0
      })
    }

  },

  checkAnswer36: function (e) {
    if (e.detail.value == this.data.showV1[5].ellos_ellas_ustedes) {
      this.setData({
        'color[36]': 1
      })
    }
    else {
      this.setData({
        'color[36]': 0
      })
    }

  }









})