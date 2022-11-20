// pages/huodong/huodong/huodongxiangqing.js

var dateUtils = require('../../utils/DateUtils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    act: {},
    isPlaceShow: false,
    activitySubscribe: {},    //会员预约活动信息
    isSubscribeCondition: 2,  //会员预约活动情况

    iso: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({act: JSON.parse(decodeURIComponent(options.param))});

    // 距离活动的小时差
    var sjc = dateUtils.getHour(new Date(), new Date(this.data.act.activityDate.replace(/-/g, '/')) );
    if(sjc >= 0 && sjc <= 24){
      this.setData({isPlaceShow: true})
    }else{
      this.setData({isPlaceShow: false})
    }


    var userinfo = wx.getStorageSync("userinfo")
    // console.log(userinfo.id)
    if(!!userinfo){
      // 获取会员 预约的活动信息
      var this_ = this;
      wx.request({
        url: o.server_url + '/mini_program/selectXqActivitySubscribe',
        method: 'GET',
        data:{activityId: this_.data.act.id,memberId: userinfo.id },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (respose) {
          if(respose.data.code == 200){

            if(!!respose.data.data){

              this_.setData({activitySubscribe: respose.data.data});
              // 状态，1=提交申请正在审核中、2=审核通过预约成功、3=审核不通过已退费、4=申请退费中（取消预约、审核中）、5=退费成功、6=名额已满、7=申请退费中（取消预约、审核成功）、8=活动取消已退费
              if(this_.data.activitySubscribe.state == 1 || this_.data.activitySubscribe.state == 2 || this_.data.activitySubscribe.state == 4
                  || this_.data.activitySubscribe.state == 7){
                // 已经预约，不能在预约了
                this_.setData({isSubscribeCondition: 1})
              }else{
                this_.setData({isSubscribeCondition: 2})
              }

            }
          }else{

          }

        }
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

  }
})