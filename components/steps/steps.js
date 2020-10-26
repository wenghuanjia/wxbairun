// components/steps/steps.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 展示 数据
    steps: {
      type: Array,
      value: []
    },
    // 当前 步骤条
    active: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [{
      id: 1,
      name: '服务选择',
      icon: ' icon-fuwuqi'
    }, {
      id: 2,
      name: '信息录入',
      icon: 'icon-xinxiinfo21'
    }, {
      id: 3,
      name: '确认提交',
      icon: 'icon-querendingdan'
    }, {
      id: 4,
      name: '签署合同',
      icon: 'icon-simujijinqianshubuchongxieyi'
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
