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
    field5: '', // 联系邮箱
    field10: '', // 甲方业务场景
    field11: '', // 系统平台使用费
    field12: '', // 服务费费率
    field13: '', // 计划经营所得
    field14: '', // 户名
    field15: '', // 开户行
    field16: '', // 账户
    field17: '', // 纳税人识别号
    field18: '', // 电话
    field19: '', // 地址
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBlur() {
      this.triggerEvent('inputChange', this.data)
    }
  }
})