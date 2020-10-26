// pages/address/address.js
const Dialog = require('../../miniprogram_npm/@vant/weapp/dialog/dialog').default
const utils = require('../../utils/wxUtils').default
const {
  reqMyAddress,
  delMyAddress
} = require('../../common/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  // 新增 地址
  onCreateAddress() {
    utils.navigateTo('/pages/create-address/create-address', true)
  },

  // 删除 事件
  async onDel(e) {
    let id = e.target.dataset.id
    Dialog.confirm({
        title: '提示',
        message: '确认删除该地址?',
      })
      .then(async () => {
        let res = await delMyAddress({
          id
        });
        if (res.status === 1) {
          let ary = this.data.addressList.filter(v => v.id !== id)
          this.setData({
            addressList: ary
          })
          utils.showToast(res.msg)
        } else {
          utils.showToast(res.msg)
        }
      })
  },

  // 编辑 事件
  onEdit(e) {
    let id = e.target.dataset.id
    let item = this.data.addressList.filter(v => v.id === id)[0]
    wx.setStorageSync('address', item)
    utils.navigateTo('/pages/create-address/create-address?type=edit&id=' + id, true)
  },

  // 获取我的地址
  async getMyAddress() {
    let res = await reqMyAddress();
    if (res.status === 1) {
      this.setData({
        addressList: res.data
      })
    } else {
      utils.showToast('数据加载失败')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyAddress()
  }
})