// pages/info-enter/info-enter.js
const wxUtils = require('../../utils/wxUtils').default
const {
  checkPhone
} = require('../../utils/util')
const {
  reqDefaultInfo
} = require('../../common/api')
let inputInfo = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    service_type: '',
    activeName: '',
    radio: '1',
    address: '1',
    person: '1',
    field1: '', // 甲方
    field2: '', // 联系地址
    field3: '', // 联系人
    field4: '', // 联系电话
    invoiceList: [], // 发票抬头列表
    addressList: [], // 地址列表
    c_data: {}
  },
  // 下一步
  onNext() {
    let data = {
      service_type: this.data.service_type,
      field1: this.data.field1,
      field2: this.data.field2,
      field3: this.data.field3,
      field4: this.data.field4,
      ...inputInfo,
    }
    if (this.data.field1.toString().trim().length === 0) {
      wxUtils.showToast('请输入甲方')
      return
    }
    if (this.data.field2.toString().trim().length === 0) {
      wxUtils.showToast('请输入联系地址')
      return
    }
    if (this.data.field3.toString().trim().length === 0) {
      wxUtils.showToast('请输入联系人')
      return
    }
    if (this.data.field4.toString().trim().length === 0) {
      wxUtils.showToast('请输入联系电话')
      return
    }
    if (!checkPhone(this.data.field4)) {
      wxUtils.showToast('联系电话格式有误')
      return
    }
    if (this.data.service_type === '税务代理') {
      if (!this.checkSWInput()) return;
      data['type'] = 1
    } else if (this.data.service_type === '商事代理') {
      if (!this.checkSSInput()) return;
      data['type'] = 2
    } else if (this.data.service_type === '新业态用工') {
      if (!this.checkXYTInput()) return;
      data['type'] = 3
    }
    wx.setStorageSync('product_data', JSON.stringify(data))
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },
  // checkInput 1 税务代理
  checkSWInput() {
    if (JSON.stringify(inputInfo) === '{}') {
      wxUtils.showToast('请输入必填信息');
      return false
    }
    if (inputInfo.field11.toString().trim().length === 0) {
      wxUtils.showToast('请输入服务费率')
      return false
    }
    if (inputInfo.field12.toString().trim().length === 0) {
      wxUtils.showToast('请输入开票金额')
      return false
    }
    if (inputInfo.field17.toString().trim().length === 0) {
      wxUtils.showToast('请输入发票税目')
      return false
    }
    return true
  },
  // checkInput 2 商事代理
  checkSSInput() {
    if (JSON.stringify(inputInfo) === '{}') {
      wxUtils.showToast('请输入必填信息');
      return false
    }
    if (inputInfo.field9.toString().trim().length === 0) {
      wxUtils.showToast('请输入服务费');
      return false
    }
    if (inputInfo.field10.toString().trim().length === 0) {
      wxUtils.showToast('请输入税务代理服务费率');
      return false
    }
    if (inputInfo.field11.toString().trim().length === 0) {
      wxUtils.showToast('请输入服务企业数');
      return false
    }
    if (inputInfo.field13.toString().trim().length === 0) {
      wxUtils.showToast('请选择企业类型');
      return false
    }
    return true
  },
  // checkInput 3 新业态用工
  checkXYTInput() {
    if (JSON.stringify(inputInfo) === '{}') {
      wxUtils.showToast('请输入必填信息');
      return false
    }
    if (inputInfo.field5.toString().trim().length === 0) {
      wxUtils.showToast('输入联系邮箱型');
      return false
    }
    if (inputInfo.field10.toString().trim().length === 0) {
      wxUtils.showToast('请输入甲方业务场景');
      return false
    }
    if (inputInfo.field11.toString().trim().length === 0) {
      wxUtils.showToast('请输入系统平台使用费');
      return false
    }
    if (inputInfo.field12.toString().trim().length === 0) {
      wxUtils.showToast('请输入服务费费率');
      return false
    }
    if (inputInfo.field13.toString().trim().length === 0) {
      wxUtils.showToast('请输入计划经营所得');
      return false
    }
    if (inputInfo.field14.toString().trim().length === 0) {
      wxUtils.showToast('请输入户名');
      return false
    }
    if (inputInfo.field15.toString().trim().length === 0) {
      wxUtils.showToast('请输入开户行');
      return false
    }
    if (inputInfo.field16.toString().trim().length === 0) {
      wxUtils.showToast('请输入账户');
      return false
    }
    if (inputInfo.field17.toString().trim().length === 0) {
      wxUtils.showToast('请输入纳税人识别号');
      return false
    }
    if (inputInfo.field18.toString().trim().length === 0) {
      wxUtils.showToast('请输入电话');
      return false
    }
    if (inputInfo.field19.toString().trim().length === 0) {
      wxUtils.showToast('请输入地址');
      return false
    }

    console.log(inputInfo);
    return true
  },

  async _getDefaultInfo() {
    try {
      let res = await reqDefaultInfo();
      if (res.status === 1) {
        console.log(res);
        if (res.data.dizhi) {
          this.setData({
            field1: res.data.dizhi.jiafang,
            field2: res.data.dizhi.lianxi_dizhi,
            field3: res.data.dizhi.lianxi_ren,
            field4: res.data.dizhi.lianxi_dianhua,
            c_data: res.data.taitou
          })
        }

      }
    } catch (error) {
      wxUtils.showToast(error.msg || '默认信息获取失败')
    }
  },

  // 获取 子组件 传递的值
  inputChange(e) {
    inputInfo = e.detail
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type) {
      wxUtils.setNavigationBarTitle(options.type + '信息录入')
      this.setData({
        service_type: options.type
      })
      this._getDefaultInfo()
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})