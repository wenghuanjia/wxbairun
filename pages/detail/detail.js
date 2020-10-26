const {
  reqNewDetail
} = require('../../common/api')
const wxUtils = require('../../utils/wxUtils').default

Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlSnip: ''
  },

  // 获取 详情数据
  async getDetailData(id) {
    let res = await reqNewDetail(id)
    console.log(res);
    if (res.status === 1) {
      wxUtils.setNavigationBarTitle(res.data.field1)
      this.setData({
        htmlSnip: res.data.content
      })
    } else {
      console.log(res)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.getDetailData(options.id)
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})