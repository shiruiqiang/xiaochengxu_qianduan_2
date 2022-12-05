// pages/huodong/huodong/huodongxiangqing.js

var dateUtils = require('../../../utils/DateUtils.js');
var o = getApp();

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
    if(!!this.data.act.activityDescribe){
      this.setData({"act.activity_describe": JSON.parse(this.data.act.activityDescribe)})
    }
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
            this_.activitySubscribeHandle(respose);

          }else{

          }

        }
      })
    }



  },
  activitySubscribeHandle(respose){
    
    if(!!respose.data.data){

      this.setData({activitySubscribe: respose.data.data});
      //状态，1=提交申请正在审核中、2=审核通过预约成功、3=审核不通过已退费、4=申请退费中（取消预约、审核中）、5=退费成功（非审核）、6=名额已满、
      // 7=申请退费中（取消预约、审核成功）、8=活动取消已退费、20=支付中(需要审核)、
      // 21=支付中(不需要审核)、22=订单取消（没有支付的情况）、23=退费中（审核）、24=退费中（非审核）
      if(this.data.activitySubscribe.state == 1 || this.data.activitySubscribe.state == 2
          || this.data.activitySubscribe.state == 4 || this.data.activitySubscribe.state == 7
          || this.data.activitySubscribe.state == 20  || this.data.activitySubscribe.state == 21 ){
        // 已经预约或者正在预约的过程中，不能在预约了
        this.setData({isSubscribeCondition: 1})
      }else{
        this.setData({isSubscribeCondition: 2})
      }

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
  woyaobaoming(){

    var userinfo = wx.getStorageSync("userinfo")
    // console.log(userinfo.id)
    if(!!userinfo){
      // 获取会员 预约的活动信息
      var this_ = this;
      wx.request({
        url: o.server_url + '/mini_program/activitySubscribeVerificationAndGenerate',
        method: 'POST',
        data:{ activityId: this_.data.act.id, memberId: userinfo.id , sexStr: userinfo.sexStr, name: userinfo.name ,
          phone: userinfo.phone , age: userinfo.age ,height: userinfo.height , education: userinfo.educationStr },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (respose) {
          // 200 = 使用现金结算 、 201 = 使用套餐结算、 202 = 使用套餐加附加费结算
          if(respose.data.code == 200){


          }else if(respose.data.code == 201){
            this_.activitySubscribeHandle(respose);
            wx.showToast({
              title: '预约成功成功',
              icon: 'success',
              duration: 2000
            })



          }else if(respose.data.code == 202){





          }else{
            // wx.showToast({
            //   title: '预约失败',
            //   icon: 'error',
            //   duration: 2000
            // })
            wx.showModal({
              title: '提示',
              content: respose.data.msg,
              showCancel: false,
              success (res) {
                // if (res.confirm) {
                //   console.log('用户点击确定')
                // } else if (res.cancel) {
                //   console.log('用户点击取消')
                // }
              }
            })
          }

        }
      })
    }


  },
  shenqingtuifei(){

    var this_ = this;
    wx.request({
      url: o.server_url + '/mini_program/applyForRefundActivitySubscribe',
      method: 'POST',
      data:{ id: this_.data.activitySubscribe.id,activityId: this_.data.activitySubscribe.activityId },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (respose) {
        if(respose.data.code == 200){

          this_.activitySubscribeHandle(respose);
          wx.showToast({
            title: '申请退费成功',
            icon: 'success',
            duration: 2000
          })

        }else{
          // wx.showToast({
          //   title: respose.data.msg,
          //   icon: 'error',
          //   duration: 2000
          // })

          wx.showModal({
            title: '提示',
            content: respose.data.msg,
            showCancel: false,
            success (res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // } else if (res.cancel) {
              //   console.log('用户点击取消')
              // }
            }
          })


        }

      }
    })

  },
  cexiaotuifei(){
    var this_ = this;
    wx.request({
      url: o.server_url + '/mini_program/cancellationFeesandRefundsActivitySubscribe',
      method: 'POST',
      data:{ id: this_.data.activitySubscribe.id },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (respose) {
        if(respose.data.code == 200){

          this_.activitySubscribeHandle(respose);
          wx.showToast({
            title: '撤销退费成功',
            icon: 'success',
            duration: 2000
          })

        }else{
          // wx.showToast({
          //   title: respose.data.msg,
          //   icon: 'error',
          //   duration: 2000
          // })

          wx.showModal({
            title: '提示',
            content: respose.data.msg,
            showCancel: false,
            success (res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // } else if (res.cancel) {
              //   console.log('用户点击取消')
              // }
            }
          })

        }

      }
    })
  }
})