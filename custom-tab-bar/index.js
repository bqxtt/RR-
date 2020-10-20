Component({
  data: {
    active: 0,
    list:
    [
      {
          "pagePath": "/pages/home/home",
          "icon": "home-o",
          "text": "首页"
      },
      {
        "pagePath": "/pages/books/books",
        "icon": "records",
        "text": "单词"
      },
      {
        "pagePath": "/pages/my/my",
        "icon": "apps-o",
        "text": "我的"
      }
    ]
  },
  methods:
  {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      //console.log(event.detail);
      const id = event.detail;
      const url = this.data.list[id].pagePath;
      //console.log(url);
      wx.switchTab({ url });
      this.setData({ active: id });
      //console.log(this.data.active);
    }
  }

});