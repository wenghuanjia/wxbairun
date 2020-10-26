// components/contract-a/contract-a.js
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
    field9: '', // 起始委托期
    field10: '', // 结束委托期
    field11: '', // 服务费率
    field12: '', // 开票金额
    field17: '' // 发票税目
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBlur() {
      this.triggerEvent('inputChange', this.data)
    },
    changeTime(e) {
      let name = e.target.dataset.name
      this.setData({
        [name]: e.detail
      })
      this.onBlur()
    }
  }
})