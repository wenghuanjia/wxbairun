// 格式化 时间
const formatTime = (date, type = '-') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join(type)
  //  + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 补 0
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 验证字符串 是否为数字
function checkNumber(theObj) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(theObj)) {
    return true;
  }
  return false;
}

// 验证 手机号
function checkPhone(phone) {
  phone = phone.toString();
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    return false;
  }
  return true
}

// 验证 邮箱
function checkEmail(email) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!reg.test(email)) {
    return false;
  }
  return true
}

// 获取 token
function getToken() {
  var token = '';
  try {
    token = wx.getStorageSync('token')
  } catch (e) {
    // Do something when catch error
  }
  return token;
}

module.exports = {
  formatTime,
  checkNumber,
  checkPhone,
  checkEmail,
  getToken
}