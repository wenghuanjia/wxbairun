// pages/business/business.js
const {
  reqContractList
} = require('../../common/api')
const {
  default: wxUtils
} = require('../../utils/wxUtils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractList: []
  },

  // 合同 预览
  viewPort(e) {
    let url = e.target.dataset.url;
    if (!url) {
      wxUtils.showToast('暂无对应合同')
      return;
    }
    console.log(url);
    // 根据小程序官方API提供
    wx.downloadFile({
      // e.target.dataset.name 是文件的地址
      url: url,
      success(res) {
        const filePath = res.tempFilePath;
        wx.openDocument({
          filePath,
          success(res) {
            wxUtils.showToast('文档打开成功')
          },
          fail: err => {
            wxUtils.showToast('文档打开失败，是否已安装相应查看软件')
          }
        })
      },
      fail: err => {
        console.log(err);
        wxUtils.showToast(JSON.stringify(err))
      }
    })

  },

  // 获取 我申请的业务
  async _getContractList() {
    try {
      let res = await reqContractList()
      if (res.status === 1) {
        res.data.forEach(v => {
          v.create_time = v.create_time.split(' ')[0]
        })
        this.setData({
          contractList: res.data
        })
      }
    } catch (error) {
      wxUtils.showToast(error.msg || '数据请求失败')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getContractList()
  }
})