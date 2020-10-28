// pages/create-invoice/create-invoice.js
const utils = require('../../utils/wxUtils').default
const {
  addOrEditMyAddress
} = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    field3: '', // 甲方
    field4: '', // 联系地址
    field5: '', // 联系人
    field6: '', // 联系电话
    editId: null,
    field7: false // 是否默认
  },

  async onSubmit() {
    if (!this.data.field3) {
      utils.showToast('请输入甲方')
      return;
    }
    if (!this.data.field4) {
      utils.showToast('请输入联系地址')
      return;
    }
    if (!this.data.field5) {
      utils.showToast('请输入详细人')
      return;
    }
    if (!this.data.field6) {
      utils.showToast('请输入联系电话')
      return;
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.field6))) {
      utils.showToast('联系电话格式有误')
      return;
    }
    let data = {
      field3: this.data.field3,
      field4: this.data.field4,
      field5: this.data.field5,
      field6: this.data.field6,
      field7: Number(this.data.field7)
    }
    if (this.data.editId) {
      data.id = this.data.editId
    }
    let res = await addOrEditMyAddress(data)
    const pages = getCurrentPages();//获取页面栈
    const beforePage = pages[pages.length - 2];  //前一个页面
    if (res.status === 1) {
      utils.showToast(res.msg)
      setTimeout(() => {
        wx.removeStorageSync('address')
        wx.navigateBack({
          delta: 1,
          success: function () {
            beforePage.getMyAddress(); 
          }
        })
      }, 500)
    } else {
      utils.showToast(res.msg)
    }
  },

  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ field7: detail });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type && options.type == 'edit') {
      utils.setNavigationBarTitle('修改地址')
      let data = wx.getStorageSync('address')
      this.setData({
        editId: options.id,
        field3: data.field3,
        field4: data.field4,
        field5: data.field5,
        field6: data.field6,
        field7: !!(data.field7)
      })
    }
  },

})