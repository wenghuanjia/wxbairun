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
    rate: '', // 企业增值税率
    money: '', // 开票金额
    profit: '', // 费用
    cost: '', // 企业 营业成本
    num: '', // 员工数
    average: '', // 平均年收入
    show: false, //控制弹出层是否弹出的值
    columns: ['13%'] //选择器中的值
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
      rate: e.detail.value,
      show: false
    })
  },

  // 立即 计算 按钮 事件
  onCalculation() {
    if (!this.checkInput()) return;
    this.setData({
      loading: true
    })
    let rate = this.changeRate()
    let str = `nkp_yye=${this.data.money}&qy_feiyong=${this.data.profit}&yuangong_num=${this.data.num}&yuangong_nian_gz=${this.data.average}&rate=${rate}&yycb=${this.data.cost}` 
    wx.navigateTo({
      url: `/pages/e-result/e-result?${str}`
    })
    this.setData({
      loading: false,
      rate: '',
      money: '',
      profit: '',
      num: '',
      cost: '',
      average: ''
    })
  },

  // 检测 文本框输入
  checkInput() {
    if (!this.data.rate) {
      utils.showToast('请选择企业增值税率')
      return false
    }
    if (!this.data.money) {
      utils.showToast('请输入企业开票金额')
      return false
    }
    if (this.data.money && !checkNumber(this.data.money)) {
      utils.showToast('企业开票金额必须为数字')
      return false
    }
    if (!this.data.profit) {
      utils.showToast('请输入企业费用')
      return false
    }
    if (this.data.profit && !checkNumber(this.data.profit)) {
      utils.showToast('企业年费用必须为数字')
      return false
    }
    if (this.data.cost && !checkNumber(this.data.cost)) {
      utils.showToast('企业营业成本必须为数字')
      return false
    }
    if (this.data.num && !checkNumber(this.data.num)) {
      utils.showToast('企业员工数必须为数字')
      return false
    }
    if (this.data.average && !checkNumber(this.data.average)) {
      utils.showToast('员工平均年收入必须为数字')
      return false
    }
    
    return true
  },

  // 企业增值税率
  changeRate() {
    let rate;
    switch (this.data.rate) {
      case '13%':
        rate = 0.13
        break;
    }
    return rate
  }
})