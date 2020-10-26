// components/user-head/user-head.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: ''
  },

  attached() {
    let user = JSON.parse(wx.getStorageSync('user'))
    if (user && user.id) {
      this.setData({
        avatarUrl: user.avatar,
        nickName: user.user_nickname
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})