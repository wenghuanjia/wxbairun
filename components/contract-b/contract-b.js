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
    show: false,
    columns: ['请选择企业类型', '个体户或个人独资企业', '合伙企业', '有限责任公司'],
    field9: '', // 服务费
    field10: '', // 税务代理服务费率
    field11: '', // 服务企业数
    field13: '', // 企业类型 1 个体户或个人独资企业 2 合伙企业 3  有限责任公司
    field15: '', // 有效年
    field14: '', // 甲方开票金额（年）
    field16: '', // 签署日期
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBlur() {
      let data = {
        ...this.data
      }
      delete data.show
      delete data.columns
      this.triggerEvent('inputChange', data)
    },
    showPopup(e) { //打开弹出层（选择器）
      this.setData({
        show: true
      })
    },
    onClose() { //点击空白处开闭弹出层（选择器）及选择器左上角的取消
      this.setData({
        show: false
      });
    },
    onConfirm(e) { //选择器右上角的确定，点击确定获取值
      this.setData({
        field13: e.detail.value,
        show: false
      })
      this.onBlur()
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