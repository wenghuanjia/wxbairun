// components/time/time.js
const { formatTime } = require('../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '日期'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    time: '请选择日期',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDisplay() {
      this.setData({
        show: true
      });
    },
    onCancel() {
      this.setData({
        show: false
      });
    },
    onConfirm(event) {
      this.setData({
        show: false,
        currentDate: event.detail,
        time: formatTime(new Date(event.detail))
      });
      this.triggerEvent('changeTime', formatTime(new Date(event.detail)))
    },
  }
})