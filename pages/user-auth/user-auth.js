// pages/user-auth/user-auth.js
const {
  login
} = require('../../common/api')
const wxUtils = require('../../utils/wxUtils').default
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 返回首页
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 获取用户信息
   * @param {*} e 用户信息
   */
  getUserInfo(e) {
    let vm = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      // this.init(e.detail.userInfo)
      let detail = e.detail
      wx.login({
        success(res) {
          if (res.code) {
            // wx.showLoading({title: ''})
            wxUtils.showToast('登录中...')
            //发起网络请求
            vm.userLogin({
              encrypted_data: detail.encryptedData,
              code: res.code,
              iv: detail.iv,
              raw_data: detail.rawData,
              signature: detail.signature
            })
          } else {
            wxUtils.showToast(res.errMsg)
          }
        }
      })
    } else {
      wxUtils.showToast('您已拒绝授权')
    }
  },

  // 授权登录
  async userLogin(data) {
    try {
      let res = await login(data)
      if (res.status === 1) {
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('user', JSON.stringify(res.data.user))
        wxUtils.showToast(res.msg)
        wx.navigateBack({
          delta: 1
        })
      } else {
        wxUtils.showToast(res.msg)
      }
    } catch (error) {
      wxUtils.showToast('登录失败，请稍后重试')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: res1 => {
        if (res1.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // this.init(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })
  },
})