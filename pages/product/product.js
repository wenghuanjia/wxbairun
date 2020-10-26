// pages/product/product.js
const {
  getToken
} = require('../../utils/util')
const Dialog = require('../../miniprogram_npm/@vant/weapp/dialog/dialog').default
Page({
  // '代理记账', '企业补贴', '税务代理', '商事代理', '新业态用工', '人才引进', '社保代理'
  /**
   * 页面的初始数据
   */
  data: {
    service: '税务代理', // 选择服务
    show: false, //控制弹出层是否弹出的值
    columns: ['税务代理', '商事代理', '新业态用工'], //选择器中的值
  },

  showPopup(e) { //打开弹出层（选择器）
    this.setData({
      show: true
    })
  },

  onClose() { //点击空白处开闭弹出层（选择器）及选择器左上角的取消
    this.setData({
      show: false
    });
  },

  onConfirm(e) { //选择器右上角的确定，点击确定获取值
    this.setData({
      service: e.detail.value,
      show: false
    })
  },

  // 下一步
  onNext() {
    if (!getToken()) {
      Dialog.confirm({
          title: '提示',
          message: '暂未授权登录，是否先登录',
        })
        .then(() => {
          // on confirm
          wx.switchTab({
            url: '/pages/profile/profile'
          })
        })
        .catch(() => {
          // on cancel
          console.log('cancel');
        });
      return;
    }
    wx.navigateTo({
      url: `/pages/info-enter/info-enter?type=${this.data.service}`
    })
  },
})