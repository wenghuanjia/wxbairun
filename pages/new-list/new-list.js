const {
  reqNewsList
} = require('../../common/api')
const wxUtils = require('../../utils/wxUtils').default
let total = 0; // 总条数
let page = 1; // 分页

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: null,
    newLists: [], // 数据列表
    nothing: 0, // 0 未加载 1 上拉加载更多 2 加载中 3 无更多数据
  },
  // 初始化
  init(options) {
    if (options.type) {
      this.setData({
        type: Number(options.type)
      })
    }
    wxUtils.setNavigationBarTitle(options.title)
    this.getNewsList()
  },
  // 详情页 跳转 
  handleJump(e) {
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url
    })
  },
  // 获取对应的新闻列表数据
  async getNewsList() {
    if (this.data.nothing === 2 || this.data.nothing === 3) return;
    this.setData({
      nothing: 2
    })
    let res = await reqNewsList({
      page: page,
      id: this.data.type
    })
    if (res.status === 1) {
      this.setData({
        newLists: [...this.data.newLists, ...res.data.list]
      })
      total = res.data.count
      if (res.data.count < 10) {
        this.setData({
          nothing: 3
        })
      } else if (res.data.count === 10 && this.data.newLists.length < total) {
        this.setData({
          nothing: 1
        })
      }
    } else {
      console.log(res);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      newLists: []
    })
    page = 1;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.nothing === 2 || this.data.nothing === 3) return
    page++
    this.getNewsList()
  }
})