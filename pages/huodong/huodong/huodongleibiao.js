// pages/huodong/huodong/huodongleibiao.js

var o = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    msgStatus: !1,
    hasMore: !0,
    act: {},
    userCheck: {
      basic_check: 1,
      is_introduce: 1,
      more_check: 1,
      want_check: 1
    },
    showLoading: !0,
    curpage:'act',
    type:0,

    list: [],
    tabTitleContent: "活动筹备中....."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.initData();

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
  initData: function() {
    // http.get('activity', {"type":this.data.type}).then(data => {
    //
    // });

    var this_ = this;
    wx.request({
      url: o.server_url + '/mini_program/selectXqActivityList', //仅为示例，并非真实的接口地址
      method: 'POST',
      data:{stateList: [1,2] },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (respose) {
        if(respose.data.code == 200){

          if(!!respose.data.data){

            this_.setData({list: respose.data.data});

            // var item = respose.data.data.find(i => {return i.type == a.data.form.type });
            // if(!!item){
            //   a.setData({
            //     form: item
            //   })
            // }
            // // 资料审核list
            // wx.setStorageSync('xqMaterialAuditList', respose.data.data)
            // // 本地保存 资料审核 更新时间
            // wx.setStorageSync('xqMaterialAuditDate', dateUtils.showCurrentTime());
          }
        }else{
          // 本地保存 资料审核 更新时间
          // wx.setStorageSync('xqMaterialAuditDate', dateUtils.showCurrentTime());
        }

      }
    })

  },
  huodongxiangqing: function(t) {
    // var e = t.currentTarget.dataset.id;
    var item = t.currentTarget.dataset.hdxq;
    // a.WxService.getStorageSync("user") ?
    wx.navigateTo({url: "/pages/huodong/huodong/huodongxiangqing?param=" + encodeURIComponent(JSON.stringify(item))})
    //     : (a.WxService.showLoading({
    //     title: "您还未登录"
    // }), setTimeout(function() {
    //     a.WxService.hideLoading(), a.WxService.navigateTo("/pages/register/step/step1")
    // }, 1e3))
  },
  onTabClick: function(t) {
    var e = t.currentTarget.dataset.id;

    if(e == 0){
      // 进行中的活动
      this.initData();
      this.setData({tabTitleContent: "活动筹备中....."});
      this.setData({activeIndex: 0});

    }else if(e == 1){
      // 往期活动
      this.setData({list: []});
      this.setData({tabTitleContent: "功能正在开发中....."});
      this.setData({activeIndex: 1});
    }

  }
})