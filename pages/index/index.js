const {
  reqTaxSpot
} = require('../../common/api')

Page({
  data: {
    taxSpot: [],
    loading: true
  },

  // 计算器 跳转事件
  handleJump(e) {
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  },

  // 获取 财税 知多点 数据
  async getTaxSpot() {
    try {
      let res = await reqTaxSpot();
      if (res.status === 1) {
        this.setData({
          taxSpot: res.data,
          loading: false
        })
      }
    } catch (error) {
      wx.showToast({
        icon: 'none',
        title: error.msg
      })
    }
  },

  onLoad: function () {
    this.getTaxSpot()
  }
})