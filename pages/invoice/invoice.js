const Dialog = require('../../miniprogram_npm/@vant/weapp/dialog/dialog').default
const utils = require('../../utils/wxUtils').default
const {
  reqInvoice,
  delInvoice
} = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    invoiceList: []
  },

  // 添加 发票
  onCreateInvoice() {
    wx.navigateTo({
      url: '/pages/create-invoice/create-invoice'
    })
  },

  // 删除 事件
  async onDel(e) {
    let id = e.target.dataset.id
    Dialog.confirm({
        title: '提示',
        message: '确认删除发票抬头?',
      })
      .then(async () => {
        let res = await delInvoice({
          id
        });
        if (res.status === 1) {
          let ary = this.data.invoiceList.filter(v => v.id !== id)
          this.setData({
            invoiceList: ary
          })
          utils.showToast(res.msg)
        } else {
          utils.showToast(res.msg)
        }
      })
      .catch(() => {
        // on cancel
      });
  },

  // 编辑 事件
  onEdit(e) {
    let id = e.target.dataset.id
    let item = this.data.invoiceList.filter(v => v.id === id)[0]
    wx.setStorageSync('invoice', item)
    utils.navigateTo('/pages/create-invoice/create-invoice?type=edit&id=' + id, true)
  },

  async getInvoice() {
    let res = await reqInvoice();
    if (res.status === 1) {
      this.setData({
        invoiceList: res.data
      })
    } else {
      utils.showToast('数据加载失败')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInvoice();
  },
})