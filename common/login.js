class Login {
  getUserInfo() {
    wx.getUserInfo({
      withCredentials: true,
      success: (result) => {
        console.log(result);
      },
      fail: (res) => {
        console.log(res);
      },
      complete: (res) => {
        console.log(res);
      },
    })
  }
}

export default new Login