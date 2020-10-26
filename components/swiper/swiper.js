// components/swiper/swiper.js
const {
  reqBannerData
} = require('../../common/api')
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
    swipers: [],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

  created() {
    this.getBannerData()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取 轮播图数据
    async getBannerData() {
      let res = await reqBannerData()
      if (res.status === 1) {
        this.setData({
          swipers: res.data
        })
      } else {
        wx.showToast({
          title: '加载失败，请稍后重试',
          icon: ''
        })
      }
    },
  }
})