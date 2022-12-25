// pages/tuijian/huiyuanzhanshi/huiyuanzhanshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {



    member: {},
    photolist: [],




    interval: 0,
    indicatorDots: !0,
    indicatorColor: "rgba(255, 255, 255, .2)",
    indicatorActiveColor: "rgba(255, 255, 255, .6)",
    vertical: !1,
    autoplay: !1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({member: JSON.parse(decodeURIComponent(options.param))});

    if(!!this.data.member.pictureJson){
      this.setData({photolist: JSON.parse(this.data.member.pictureJson)})
    }else{
      this.setData({photolist: []})
    }


    if(this.data.photolist.length == 0){
      this.setData({interval: -1})
    }else{
      this.setData({interval: 0})
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
  intervalChange: function(t) {
    this.setData({
      interval: t.detail.current
    })
  }
})