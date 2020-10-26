Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_data: {}
  },

  // 下一步 事件
  onNext() {
    wx.showModal({
      content: '确认信息无误？',
      fail: (res) => {},
      showCancel: true,
      success: (result) => {
        if (result.confirm) {
          wx.navigateTo({
            url: '/pages/sign/sign'
          })
        }
      },
      title: '提示',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product_data = JSON.parse(wx.getStorageSync('product_data'))
    this.setData({
      product_data
    })
  }
})