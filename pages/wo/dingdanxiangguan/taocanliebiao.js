// pages/wode/dingdanxiangguan/taocanliebiao.js
var o = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCheckBox: false, // 显示选择框
    // 商品列表
    itemList: [
      // {
      //   sku_id: 10001,
      //   name: "可口可乐碳酸饮料330ml/听*24",
      //   boamTags: [
      //     {name: '畅销商品', color: '#19BEAE'}
      //   ],
      //   tags: [
      //     {name: '满减', color: '#19BEAE'},
      //     {name: '特价', color: '#A1D569'}
      //   ],
      //   errorCode: -10000,
      //   errorInfo: '赠品不足',
      //   checked: true
      // }, {
      //   name: "可口可乐碳酸饮料330ml/听*24可口可乐碳酸饮料330ml/听*24可口可乐碳酸饮料330ml/听*24",
      //   errorCode: -10000,
      //   errorInfo: '赠品不足',
      //   checked: true
      // },
      // {sku_id: 10002, name: "xxx", errorCode: 0,      errorInfo: '赠品不足', checked: false },
      // {sku_id: 10003, name: "xxx", errorCode: -10000, errorInfo: '赠品不足', checked: true },
      // {sku_id: 10004, name: "xxx", errorCode: 0,      errorInfo: '赠品不足', checked: false },
      // {sku_id: 10005, name: "xxx", errorCode: -10000, errorInfo: '赠品不足', checked: true },
      // {sku_id: 10006, name: "xxx", errorCode: -10000, errorInfo: '赠品不足', checked: true, disabled: true }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.taochuanliebiao()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tiaozhuanxiangqing(event){
    var item = event.currentTarget.dataset.chuancan;
    wx.navigateTo({url: "/pages/wo/dingdanxiangguan/taocangoumaiye?param=" + encodeURIComponent(JSON.stringify(item))});
  },
  taochuanliebiao(){
    var t = this;
    wx.request({
      url: o.server_url + '/mini_program/set_meal_list', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {goodsType: '1'},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.code == 200){
          if(!!res.data.data){
            res.data.data.forEach((value, index, array) => {
              if(!!value.termsJson){
                value.termsJson_ = JSON.parse(value.termsJson)
              }
            })
            t.setData({ "itemList": res.data.data });
          }
        }else{
          wx.showToast({
            title: '无可售套餐',
            icon: 'error',
            duration: 2000
          })
        }

      }
    })
  }
})
