// pages/result/result.js
const {
  reqETaxSaving
} = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taxBefore: {},
    programme: []
  },

  async getResult(options) {
    wx.showLoading({
      title: ''
    })
    delete options['rate']
    console.log(options);
    let res = await reqETaxSaving(options)
    wx.hideLoading()
    let ary = [res.data.one, res.data.two, res.data.three]
    if (res.status === 1) {
      this.setData({
        taxBefore: res.data.first,
        programme: ary
      })
    } else {
      wx.showLoading({
        title: res.msg
      })
    }
  },

  // 企业增值税率
  changeRate(val) {
    let rate;
    switch (val) {
      case 0.13:
        rate = '13%'
        break;
    }
    return rate
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (const key in options) {
      options[key] = Number(options[key])
    }
    this.getResult(options)
  },
})