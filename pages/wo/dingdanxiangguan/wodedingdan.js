// import request from '../../lib/request';
// import resource from '../../lib/resource';
// import serviceData from '../../data/config';
// import Promise from '../../lib/promiseEs6Fix';


const o = getApp();

Page({
  data: {
    loading: false,
    // activeNav: 'all',
    // navs: [{
    //   text: '全部',
    //   alias: 'all'
    // }, {
    //   text: '待付款',
    //   alias: 'unpaid'
    // }, {
    //   text: '待发货',
    //   alias: 'undelivered'
    // }, {
    //   text: '待收货',
    //   alias: 'unreceived'
    // }],
    queryParams: {
      pageNum: 1,
      pageSize: 2,
      memberId: null,
      goodsType: 1,
      orderByColumn: "createdate",
      isAsc: "desc"
    },
    allPages: 1000,
    loadMoreData: "",
    orderList: []
  },
  onLoad(options) {
    this.setData({"loading": true});
    var this_ = this;

    var userinfo = wx.getStorageSync("userinfo")
    if(!!userinfo){
      this.setData({
        "queryParams.memberId": userinfo.id
      })
    }
    this.initData();







    // const that = this;
    // if (options.t) {
    //   this.setData({
    //     activeNav: options.t
    //   });
    // }
    // this.getList().then((res) => {
    //   that.setOrderData(res.data);
    //   that.setData({
    //     orderList: res.data,
    //     loading: false
    //   });
    // });
  },
  initData(){
    var this_ = this;
    wx.request({
      url: o.server_url + '/mini_program/orderInfo/list',
      method: 'GET',
      data: this_.data.queryParams,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // debugger
        this_.setData({"loading": false});
        if(res.data.code == 200){
          if (this_.data.queryParams.pageNum == 1) {
            var tempArray = [];
          } else {
            var tempArray = this_.data.orderList;
          }
          var list = this_.data.queryParams.pageNum == 1 ? res.data.rows : res.data.rows.concat(tempArray);
          list = list.length > 0 ? list : [];
          this_.setData({"orderList": {...list}})
          this_.setData({"allPages": (res.data.total/this_.data.queryParams.pageSize) +
                ( (res.data.total % this_.data.queryParams.pageSize) > 0 ? 1 : 0 )})

          // this_.setData({"orderList": res.data.rows})

          console.log("______________________________________________________   total = " + res.data.total + "  , pageSize = " + this_.data.queryParams.pageSize + "      "
             + (  (res.data.total/this_.data.queryParams.pageSize) +
              ( (res.data.total % this_.data.queryParams.pageSize) > 0 ? 1 : 0 )))
        }
      }
    })
  },
  onPullDownRefresh() {
    // debugger
    var self = this;
    setTimeout(function () {
      if (self.data.queryParams.pageNum < self.data.allPages) {
        self.setData({
          "queryParams.pageNum": self.data.queryParams.pageNum + 1
        });
        self.initData();
      } else {
        self.setData({ loadMoreData: "没有数据了" });
      }
    }, 300);
  },
  onReachBottom() {
    debugger
    var self = this;
    setTimeout(function () {
      if (self.data.queryParams.pageNum < self.data.allPages) {
        self.setData({
          "queryParams.pageNum": self.data.queryParams.pageNum + 1
        });
        self.initData();
      } else {
        self.setData({ loadMoreData: "没有数据了" });
      }
    }, 300);
  }
  // setOrderData(data) {
  //   data.forEach((itm) => {
  //     itm.order = {
  //       orderStatus: itm.order_status,
  //       orderSn: itm.order_sn,
  //       subOrderSn : itm.sub_order_sn,
  //       isButtonHidden : itm.order_status == "待支付" ? true: false,
  //     };
  //   });
  //   return data;
  // },
  // changeList(e) {
  //   const that = this;
  //   const alias = e.target.dataset.alias;
  //
  //   if (alias !== this.data.activeNav) {
  //     this.setData({
  //       activeNav: e.target.dataset.alias,
  //       loading: true
  //     });
  //     this.getList().then((res) => {
  //       that.setOrderData(res.data);
  //       that.setData({
  //         orderList: res.data,
  //         loading: false
  //       });
  //     });
  //   }
  // },
  // getList() {
  //   const data = {
  //     type: this.data.activeNav,
  //     per_page: 10
  //   };
  //   //模拟请求数据
  //   var $promise = new Promise(function(resolve,reject) {
  //     resolve({statusCode:200, data:serviceData.orderData});
  //   });
  //   return $promise;
  //   return request({ path: '/clientOrder', data });
  // },
  // cancelOrder(e) {
  //   const that = this;
  //   console.log(that)
  //   const orderSn = e.target.dataset.orderSn;
  //   wx.showModal({
  //     content: '你是否需要取消订单',
  //     showCancel: true,
  //     success: (res) => {
  //       if(res.confirm == 0) {
  //         return;
  //       }
  //       resource.cancalOrder(orderSn).then((res) => {
  //         if (res.statusCode === 200 ) {
  //           this.data.orderList.forEach((item,key) => {
  //             if(item.order_sn == orderSn && that.data.activeNav != "all") {
  //               this.data.orderList.splice(key, 1);
  //             } else {
  //               item.order_status = '订单取消';
  //             }
  //           })
  //           resource.showTips(that, '订单取消成功');
  //           this.setData({orderList :this.setOrderData(this.data.orderList)});
  //
  //         } else {
  //           resource.showTips(that, '订单取消失败');
  //         }
  //       });
  //     }
  //   });
  //   // resource.cancalOrder(orderSn).then((res) => {
  //   //   console.log(res);
  //   //   if (res.statusCode === 200) {
  //   //     resource.successToast(() => {
  //   //       that.setOrderData(res.data);
  //   //       that.setData({
  //   //         orderList: res.data
  //   //       });
  //   //     });
  //   //   }
  //   // });
  // },
  // drawbackOrder(e) {
  //   const that = this;
  //   const orderSn = e.target.dataset.orderSn;
  //   wx.showModal({
  //     content: '亲，你是否确定退款',
  //     showCancel: true,
  //     success: (res) => {
  //       if(res.confirm == 0) {
  //         return;
  //       }
  //       resource.drawbackOrder(orderSn).then((res) => {
  //         if (res.statusCode === 200) {
  //           this.data.orderList.forEach((item,key) => {
  //             if(item.order_sn == orderSn) {
  //               item.refund_status = "待审核";
  //             }
  //           })
  //           resource.showTips(that, '退款操作成功');
  //           this.setData({orderList :  this.data.orderList});
  //         } else {
  //           resource.showTips(that, '退款操作失败');
  //         }
  //       });
  //
  //     }
  //   });
  // },
  // confirmOrder(e) {
  //   const that = this;
  //   console.log(that)
  //   const orderSn = e.target.dataset.orderSn;
  //   wx.showModal({
  //     content: '确定收货',
  //     showCancel: true,
  //     success: (res) => {
  //       if(res.confirm == 0) {
  //         return;
  //       }
  //       resource.confirmOrder(orderSn).then((res) => {
  //         if (res.statusCode === 200 ) {
  //           this.data.orderList.forEach((item,key) => {
  //             if(item.order_sn == orderSn && that.data.activeNav != "all") {
  //               this.data.orderList.splice(key, 1);
  //             } else {
  //               item.order_status = '交易成功';
  //             }
  //           })
  //           resource.showTips(that, '确认收货成功');
  //           this.setData({orderList :this.setOrderData(this.data.orderList)});
  //
  //         } else {
  //           resource.showTips(that, '确认收货失败');
  //         }
  //       });
  //     }
  //   });
  // },
  // payOrder(e) {
  //   const orderSn = e.target.dataset.orderSn;
  //   resource.getPaySign({ out_trade_no: orderSn, AppID: app.globalData.appId })
  //       .then((payRes) => {
  //         if (Number(payRes.statusCode) === 200) {
  //           const wechatData = payRes.data.payment;
  //           wx.requestPayment({
  //             appId: wechatData.appId,
  //             timeStamp: wechatData.timeStamp,
  //             nonceStr: wechatData.nonceStr,
  //             package: wechatData.package,
  //             signType: 'MD5',
  //             paySign: wechatData.paySign,
  //             success(res) {
  //               if (res.errMsg === 'requestPayment:ok') {
  //                 app.globalData.type = 'success';
  //                 wx.navigateTo({
  //                   url: '../result/result'
  //                 });
  //               } else if (res.errMsg === 'requestPayment:cancel') {
  //                 app.globalData.type = 'fail';
  //                 wx.navigateTo({
  //                   url: '../orders/orders?t=unpaid'
  //                 });
  //               }
  //             },
  //             fail() {
  //             },
  //             complete(res) {
  //               console.log(res);
  //             }
  //           });
  //         } else {
  //           this.setData({
  //             toast: {
  //               toastClass: 'yatoast',
  //               toastMessage: '获取支付验证错误!'
  //             }
  //           });
  //           setTimeout(() => {
  //             this.setData({
  //               toast: {
  //                 toastClass: '',
  //                 toastMessage: ''
  //               }
  //             });
  //           }, 2000);
  //         }
  //       });
  // }
});
