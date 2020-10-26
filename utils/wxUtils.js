export default {
  setNavigationBarTitle(title) {
    wx.setNavigationBarTitle({
      title
    })
  },
  showToast(title, icon = 'none') {
    wx.showToast({
      title,
      icon
    })
  },
  navigateTo(url, isLogin = false) {
    let token = wx.getStorageSync('token')
    // islogin 为true 说明 需要 登录， 查看 token 是否存在 存在 跳转， 不存在 提示用户授权登录 islogin false 直接跳转
    if (isLogin) {
      if (token) {
        wx.navigateTo({
          url
        })
      } else {
        wx.showToast({
          title: '请先授权',
          icon: 'none'
        })
      }
    } else {
      wx.navigateTo({
        url
      })
    }
  }
}