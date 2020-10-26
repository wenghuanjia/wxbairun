// pages/personal/personal.js
const {
  checkNumber
} = require('../../utils/util')
const utils = require('../../utils/wxUtils').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    salary: '', // 工资月薪
    remuneration: '', // 劳务报酬
    dividend: '', // 股息红利
    bonus: '', // 年终奖
  },

  // 立即 计算 按钮 事件
  onCalculation() {
    if (!this.data.salary) {
      utils.showToast('请输入工资月薪')
      return;
    }
    if (this.data.salary && !checkNumber(this.data.salary)) {
      utils.showToast('请输入纯数字格式')
      return
    }
    if (this.data.bonus && !checkNumber(this.data.bonus)) {
      utils.showToast('请输入纯数字格式')
      return
    }
    if (this.data.remuneration && !checkNumber(this.data.remuneration)) {
      utils.showToast('请输入纯数字格式')
      return
    }
    if (this.data.dividend && !checkNumber(this.data.dividend)) {
      utils.showToast('请输入纯数字格式')
      return
    }
    this.setData({
      loading: true
    })
    let str = `gongzhi=${this.data.salary}&nianzhongjiang=${this.data.bonus}&laowubaochou=${this.data.remuneration}&guxihongli=${this.data.dividend}`
    wx.navigateTo({
      url: `/pages/result/result?${str}`,
    })
    this.setData({
      loading: false,
      salary: '',
      remuneration: '',
      dividend: '',
      bonus: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})