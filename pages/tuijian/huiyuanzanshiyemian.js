// pages/tuijian/huiyuanzanshiyemian.js

var o = getApp();
var i = require("../../json/cate.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curpage: "index",
    list: [],
    searchKey: {
      pageNum: 1,
      pageSize: 20,
      // memberId: null,
      // goodsType: 1,
      params: {},
      orderByColumn: "createdate",
      isAsc: "desc"
    },
    allPages: 0,
    loadMoreData: "",


    showFilter: !1,
    cate: {},
    animateCss: "weui-animate-fade-out",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCate();
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var self = this;
    setTimeout(function () {
      if (self.data.searchKey.pageNum < self.data.allPages) {
        self.setData({
          "searchKey.pageNum": self.data.searchKey.pageNum + 1
        });
        self.initData();
      } else {
        self.setData({ loadMoreData: "没有数据了" });
      }
      wx.hideNavigationBarLoading() //完成停止加载
    }, 300);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    var self = this;
    setTimeout(function () {
      if (self.data.searchKey.pageNum < self.data.allPages) {
        self.setData({
          "searchKey.pageNum": self.data.searchKey.pageNum + 1
        });
        self.initData();

      } else {
        self.setData({ loadMoreData: "没有数据了" });
      }
      wx.hideNavigationBarLoading() //完成停止加载
    }, 300);

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  initData(){
    var this_ = this;

    var userinfo = wx.getStorageSync("userinfo")
    if(!!userinfo){
      this.setData({
          "searchKey.sex": userinfo.sex == 0 ? 1 : 0
      })
    }

    wx.request({
      url: o.server_url + '/mini_program/memberlist', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: this_.data.searchKey,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.code == 200){
          if(!!res.data.rows){
            if (this_.data.searchKey.pageNum == 1) {
              var tempArray = [];
            } else {
              var tempArray = this_.data.list;
            }
            var list = this_.data.searchKey.pageNum == 1 ? res.data.rows : tempArray.concat(res.data.rows);
            list = list.length > 0 ? list : [];
            // this_.setData({"list": list })
            this_.setData({"allPages": Math.floor(res.data.total/this_.data.searchKey.pageSize) +
                  ( (res.data.total % this_.data.searchKey.pageSize) > 0 ? 1 : 0 ) })



            res.data.rows.forEach((value, index, array) => {
              if(!!value.pictureJson){
                value.pictureJson_ = JSON.parse(value.pictureJson)
                if(value.pictureJson_.length > 0){
                  value.headPicture = value.pictureJson_[0];
                }
              }
            })
            this_.setData({ "list": list });



          }
        }else{

          // wx.showToast({
          //   title: '无可售套餐',
          //   icon: 'error',
          //   duration: 2000
          // })

        }

      }
    })
  }

  ,
  setFilterPanel: function(t) {
    var a = this,
        e = this.data.cate;
    console.log(this.data.searchKey), e.incomeData.forEach(function(t, i) {
      t.value === a.data.searchKey.income && (e.incomeActionIndex = i)
    }), e.educationData.forEach(function(t, i) {
      t.value === a.data.searchKey.education && (e.eduActionIndex = i)
    }), this.setData({
      cate: e,
      showFilter: !this.data.showFilter,
      animateCss: "weui-animate-fade-in" == a.data.animateCss ? "weui-animate-fade-out" : "weui-animate-fade-in"
    })
  },
  getCate: function() {
    var t = this.data.cate,
        a = this.data.searchKey,
        e = i.default;   //JSON.parse(decodeURIComponent(JSON.stringify(i.default)));
    e.educationData[0].name = "不限", e.incomeData[0].name = "不限", e.marriageData[0].name = "不限", t = {

      educationData: e.educationData, //学历
      eduArr: e.educationData.map(function(t) {
        return t.name
      }),
      eduActionIndex: a.eduActionIndex || 0,

      incomeData: e.incomeData,  //月收入
      incomeArr: e.incomeData.map(function(t) {
        return t.name
      }),
      incomeActionIndex: a.incomeActionIndex || 0,

      marriageData: e.marriageData,       //婚姻状况
      marriageArr: e.marriageData.map(function(t) {
        return t.name
      }),
      marriageActionIndex: a.marriageActionIndex || 0
    }, this.setData({
      searchKey: a,
      cate: t
    })
  },



  inputTapMinAge: function(t) {
    this.setData({
      "searchKey.params.beginAge": t.detail.value
    })
    if(!this.verification(t.detail.value)){
      this.setData({
        "searchKey.params.beginAge": ""
      })
    }
    if(!!this.data.searchKey.params.beginAge && !!this.data.searchKey.params.endAge){
      this.setData({"searchKey.age_show": this.data.searchKey.params.beginAge + "岁到" + this.data.searchKey.params.endAge + "岁"})
    }else{
      this.setData({"searchKey.age_show": "不限"})
    }
  },
  inputTapMaxAge: function(t) {
    this.setData({
      "searchKey.params.endAge": t.detail.value
    })

    if(!this.verification(t.detail.value)){
      this.setData({
        "searchKey.params.endAge": ""
      })
    }
    if(!!this.data.searchKey.params.beginAge && !!this.data.searchKey.params.endAge){
      this.setData({"searchKey.age_show": this.data.searchKey.params.beginAge + "岁到" + this.data.searchKey.params.endAge + "岁"})
    }else{
      this.setData({"searchKey.age_show": "不限"})
    }
  },
  inputTapMinHeight: function(t) {
    this.setData({
      "searchKey.params.beginHeight": t.detail.value
    })

    if(!this.verification(t.detail.value)){
      this.setData({
        "searchKey.params.beginHeight": ""
      })
    }


    if(!!this.data.searchKey.params.beginHeight && !!this.data.searchKey.params.endHeight){
      this.setData({"searchKey.height_show": this.data.searchKey.params.beginHeight + "cm到" + this.data.searchKey.params.endHeight + "cm"})
    }else{
      this.setData({"searchKey.height_show": "不限"})
    }
  },
  inputTapMaxHeight: function(t) {
    this.setData({
      "searchKey.params.endHeight": t.detail.value
    })


    if(!this.verification(t.detail.value)){
      this.setData({
        "searchKey.params.endHeight": ""
      })
    }

    if(!!this.data.searchKey.params.beginHeight && !!this.data.searchKey.params.endHeight){
      this.setData({"searchKey.height_show": this.data.searchKey.params.beginHeight + "到" + this.data.searchKey.params.endHeight + "cm"})
    }else{
      this.setData({"searchKey.height_show": "不限"})
    }
  },
  onEdu: function(t) {
    // 学历
    this.setData({
      "cate.eduActionIndex": t.detail.value,
      "searchKey.educationStr_": this.data.cate.educationData[t.detail.value].name,
      "searchKey.education": this.data.cate.educationData[t.detail.value].value
    })
  },
  onSalary: function(t) {
    // 月收入
    this.setData({
      "cate.salaryActionIndex": t.detail.value,
      "searchKey.incomeStr_": this.data.cate.incomeData[t.detail.value].name,
      "searchKey.income": this.data.cate.incomeData[t.detail.value].value
    })
  },
  onMarriage: function(t) {
    // 婚姻状况
    this.setData({
      "cate.marriageActionIndex": t.detail.value,
      "searchKey.marriageStr_": this.data.cate.marriageData[t.detail.value].name,
      "searchKey.marriage": this.data.cate.marriageData[t.detail.value].value
    })
  },
  resetSearchValue: function() {
    this.setData({
      searchKey: {
        pageNum: 1,
        pageSize: 20,
        // memberId: null,
        // goodsType: 1,
        params: {},
        orderByColumn: "createdate",
        isAsc: "desc"
      },
      showFilter: !1,
      animateCss: "weui-animate-fade-out"
    }), this.initData();
  },
  confirmSearchValue: function() {
    this.setData({"searchKey.pageNum": 1})
    this.setData({"searchKey.pageSize": 20})

    this.setData({
      showFilter: !1,
      animateCss: "weui-animate-fade-out"
    })
    this.initData();
  },
  maskHideFilter: function() {
    this.setData({
      showFilter: !1,
      animateCss: "weui-animate-fade-out"
    })
  },

  verification: function ( value){
    var r = /^[0-9]*[1-9][0-9]*$/　;  //正整数
   return r.test(value)

  },
  guanzhudanji(){
    wx.showToast({
      title: '无可售套餐',
      icon: 'error',
      duration: 2000
    })
  },
  getCertUrl: function(t) {
    var item = t.currentTarget.dataset.item;
    // console.log(this.data.user);
    // if (2 != this.data.user.isauth) return n.WxService.showModal({
    //   title: "提示",
    //   showCancel: !0,
    //   cancelText: "取消",
    //   confirmText: "去认证",
    //   content: "为保证平台用户真实性以及遵守相关运营规范，请完善您的实名认证信息"
    // }).then(function(t) {
    //   return 1 == t.confirm && n.WxService.navigateTo("/pages/u/verify/step1")
    // });
    // wx.navigateTo("/pages/index/member?id=", {
    //   id: a
    // })
    // var item = {};//t.currentTarget.dataset.hdxq;
    // a.WxService.getStorageSync("user") ?

    wx.navigateTo({url: "/pages/tuijian/huiyuanzhanshi/huiyuanzhanshi?param=" + encodeURIComponent(JSON.stringify(item))})

  }
})