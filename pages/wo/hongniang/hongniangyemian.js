// pages/wo/hongniang/hongniangyemian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hongniangid: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userinfo = wx.getStorageSync("userinfo")
    // console.log(userinfo.id)
    if(!!userinfo){
      this.setData({
        hongniangid: userinfo.matchmakerWeChat
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  copyWechat: function() {
    var n = this.data.hongniangid + "";
    var this_ = this;
    !!n ? wx.setClipboardData({
      data: n,
      success: function(n) {
        wx.showModal({
          title: '提示',
          content: "复制红娘微信号成功",
        })
      },
      fail: function() {
        this_.copyErr()
      }
    }) : this_.copyErr()
  },
  copyErr: function() {
    // var n = this;
    wx.showModal({
      title: '提示',
      content: "复制失败，请稍后重试或联系红娘客服",
    })
  }
})