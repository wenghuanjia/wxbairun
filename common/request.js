const {
  getToken
} = require('../utils/util')
class Request {
  constructor(parms) {
    this.withBaseURL = parms.withBaseURL
    this.baseURL = parms.baseURL
  }
  get(url, data) {
    return this.request('GET', url, data)
  }
  post(url, data) {
    return this.request('POST', url, data, {
      'content-type': 'application/x-www-form-urlencoded'
    })
  }
  put(url, data) {
    return this.request('PUT', url, data)
  }
  request(method, url, data, header = {}) {
    const vm = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: vm.withBaseURL ? vm.baseURL + url : url,
        data,
        method,
        header: {
          'content-type': 'application/json', // 默认值
          'XX-Device-Type': 'wxapp',
          'XX-Token': getToken(),
          ...header
        },
        success(res) {
          if (res.statusCode === 200 && res.data.status === 1) {
            resolve(res.data)
          } else {
            reject({
              msg: res.msg || '请求失败',
              url: vm.withBaseURL ? vm.baseURL + url : url,
              method,
              data
            })
          }
        },
        fail(err) {
          reject({
            msg: '请求失败',
            url: vm.withBaseURL ? vm.baseURL + url : url,
            method,
            data
          })
        }
      })
    })
  }
}

const request = new Request({
  baseURL: 'https://bairunminiapp.gzwmdy.cn',
  withBaseURL: true
})

module.exports = request