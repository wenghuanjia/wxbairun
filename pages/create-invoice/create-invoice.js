// pages/create-invoice/create-invoice.js
const utils = require('../../utils/wxUtils').default
const {
  addOrEditInvoice
} = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    field3: '', // 请输入公司名称
    field4: '', // 请输入纳税人识别号
    field5: '', // 请输入公司地址
    field6: '', // 请输入开户银行
    field7: '', // 请输入银行账户名称
    field8: '', // 银行账户
    field9: '', // 联系电话
    editId: null
  },

  async onSubmit() {
    if (!this.data.field3) {
      utils.showToast('请输入公司名称')
      return;
    }
    if (!this.data.field4) {
      utils.showToast('请输入纳税人识别号')
      return;
    }
    if (this.data.field4.toString().length !== 15) {
      utils.showToast('纳税人识别号长度15')
      return;
    }
    let data = {
      field3: this.data.field3,
      field4: this.data.field4,
      field5: this.data.field5,
      field6: this.data.field6,
      field7: this.data.field7,
      field8: this.data.field8,
      field9: this.data.field9,
    }
    if (this.data.editId) {
      data.id = this.data.editId
    }
    let res = await addOrEditInvoice(data)
    const pages = getCurrentPages(); //获取页面栈
    const beforePage = pages[pages.length - 2]; //前一个页面
    if (res.status === 1) {
      utils.showToast(res.msg)
      setTimeout(() => {
        wx.removeStorageSync('invoice')
        wx.navigateBack({
          delta: 1,
          success: function () {
            beforePage.getInvoice();
          }
        })
      }, 500)
    } else {
      utils.showToast(res.msg)
      console.log(res);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type && options.type == 'edit') {
      utils.setNavigationBarTitle('修改发票抬头')
      let data = wx.getStorageSync('invoice')
      this.setData({
        editId: options.id,
        field3: data.field3,
        field4: data.field4,
        field5: data.field5,
        field6: data.field6,
        field7: data.field7,
        field8: data.field8,
        field9: data.field9
      })
    }
  }
})