// pages/ziliaoshenhe/ziliaotijiaoye.js

var dateUtils = require('../../utils/DateUtils.js');
var n = require("../../json/cate.js");
var o = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    form: {},
    cate:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({ cate: n.default});
    console.log(this.data.cate)

    var _this = this;
    this.setData({
      "form.type": options.type_id
    })

    var userinfo = wx.getStorageSync("userinfo")
    console.log(userinfo.id)
    if(!!userinfo){
      this.setData({
        "form.memberId": userinfo.id
      })
    }
    var xqMaterialAuditDate = wx.getStorageSync("xqMaterialAuditDate")
    if(xqMaterialAuditDate == dateUtils.showCurrentTime()){
      var xqMaterialAuditList = wx.getStorageSync('xqMaterialAuditList');
      if(!!xqMaterialAuditList){
        var item = xqMaterialAuditList.find(i => {return i.type == options.type_id });
        if(!!item){
          this.setData({
            form: item
          })
        }
      }
    }else{
      wx.request({
        url: o.server_url + '/mini_program/selectMaterialAudit', //仅为示例，并非真实的接口地址
        method: 'GET',
        data: {memberId: userinfo.id},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if(res.data.code == 200){

            if(!!res.data.data){

              var item = res.data.data.find(i => {return i.type == options.type_id });
              if(!!item){
                _this.setData({
                  form: item
                })
              }
              // 资料审核list
              wx.setStorageSync('xqMaterialAuditList', res.data.data)
              // 本地保存 资料审核 更新时间
              wx.setStorageSync('xqMaterialAuditDate', dateUtils.showCurrentTime());
            }
          }else{
            // 本地保存 资料审核 更新时间
            wx.setStorageSync('xqMaterialAuditDate', dateUtils.showCurrentTime());
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

  },

  getName: function(t) {
    this.setData({
      "form.name": t.detail.value
    })
  },
  getICard: function(t) {
    this.setData({
      "form.idCard": t.detail.value
    })
  },
  onBirth: function(t) {
    this.setData({
      "form.birthDate": t.detail.value,
      // "form.age": jjjj======
    })
  },

  oneducation: function(t) {
    this.setData({
      "form.education": this.data.cate.educationData[t.detail.value].value,
      "form.educationStr": this.data.cate.educationData[t.detail.value].name
    })
  },
  getcollegeName: function(t) {
    this.setData({
      "form.collegeName": t.detail.value
    })
  },
  onCollegeType: function (t){
    this.setData({
      "form.collegeType": this.data.cate.collegeTypeData[t.detail.value].value,
      "form.collegeTypeStr": this.data.cate.collegeTypeData[t.detail.value].name
    })
  },
  marriageChange: function(t) {
    this.setData({
      "form.marriageStr": this.data.cate.marriageData[t.detail.value].name,
      "form.marriage": this.data.cate.marriageData[t.detail.value].value
    })
  },
  carChange: function(t) {
    this.setData({
      "form.carStr": this.data.cate.carData[t.detail.value].name,
      "form.car": this.data.cate.carData[t.detail.value].value
    })
  },
  houseChange: function(t) {
    this.setData({
      "form.houseStr": this.data.cate.houseData[t.detail.value].name,
      "form.house": this.data.cate.houseData[t.detail.value].value
    })
  },
  occupationChange: function(t) {
    this.setData({
      "form.occupation": t.detail.value
    })
  },
  onincome: function(t) {
    this.setData({
      "form.income": this.data.cate.incomeData[t.detail.value].value,
      "form.incomeStr": this.data.cate.incomeData[t.detail.value].name
    })
  },




  chooseImage2: function() {
    var tt = this;
    if(this.data.form.auditState == 1 || this.data.form.auditState == 2) {
      wx.showToast({
        title: '当前状态不能上传图片',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(tt.data.files.length >= 1){
      wx.showToast({
        title: '最多上传一张图片',
        icon: 'error',
        duration: 2000
      })
      return;
    }
    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      mask: true,
      duration: 10000
    });
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: o.server_url + "/mini_program/upload",
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {},
          header: {},
          success: function (res) {
            var fileArray = tt.data.files;
            fileArray.push(JSON.parse(res.data).url)
            tt.setData({ "files": fileArray });
            wx.hideToast();
          },
        })
      },
    })
  },
  deleteImage: function(t) {
    var e = t.currentTarget.id,
        a = this;
    wx.showModal({
      title: "提示",
      content: "确定要删除该图片？"
    }).then(function(t) {
      1 == t.confirm && (a.data.files = a.data.files.filter(function(t,i) {
            return !(t == e)
          }), console.log(a.data.files), a.setData({
            files: a.data.files
          }),
              wx.request({
                url: o.server_url + '/mini_program/delete/file', //仅为示例，并非真实的接口地址
                method: 'GET',
                data: {"resource": e.substring(e.indexOf("/upload"))},
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                  console.log("******************************   " + res.data)
                }
              })
      )
    });
  },
  submitForm: function(t) {
    if(this.data.form.auditState == 1 || this.data.form.auditState == 2) {
      wx.showToast({
        title: '当前状态不能提交申请',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    var a = this;
    var e = Object.assign(this.data.form, t.detail.value);
    // console.log(e);
    // e.formId = t.detail.formId;

    // 类型，1=实名认证、2=学历认证、3=婚况认证、4=车辆认证、5=房产认证、6=工作认证、7=收入认证
    if(e.type == 1){
      if(!e.name){
        wx.showToast({
          title: '姓名不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }else if(e.name.length > 10){
        wx.showToast({
          title: '姓名最长不能10个字符',
          icon: 'none',
          duration: 2000
        })
        return;
      }else if(!e.idCard){
        wx.showToast({
          title: '身份证不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }else if(e.idCard.length > 18){
        wx.showToast({
          title: '身份证最长不能超过18个字符',
          icon: 'none',
          duration: 2000
        })
        return;
      }else if(!e.birthDate){
        wx.showToast({
          title: '出生日期不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }else if(e.type == 2){
      if(!e.educationStr){
        wx.showToast({
          title: '学历不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }else if(!!e.collegeName && e.collegeName.length >20){
        wx.showToast({
          title: '毕业院校名称不能超过20个字符',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }else if(e.type == 3){
      if(!e.marriageStr){
        wx.showToast({
          title: '婚姻状况不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }else if(e.type == 4){
      if(!e.carStr){
        wx.showToast({
          title: '买车情况不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }else if(e.type == 5){
      if(!e.houseStr){
        wx.showToast({
          title: '买房情况不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }else if(e.type == 6){
      if(!e.occupation){
        wx.showToast({
          title: '工作认证不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }else if(e.occupation.length > 20){
        wx.showToast({
          title: '工作认证不能超过20个字符',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }else if(e.type == 7){
      if(!e.incomeStr){
        wx.showToast({
          title: '收入认证不能为空',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }

    if(this.data.files.length == 0){
      wx.showToast({
        title: '相册不能为空',
        icon: 'error',
        duration: 2000
      })
      return false
    }else if(this.data.files.length > 1){
      wx.showToast({
        title: '相册不能大于一张',
        icon: 'error',
        duration: 2000
      })
      return false
    }
    e.id = undefined;
    wx.request({
      url: o.server_url + '/mini_program/submitMaterialAudit', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {memberId: e.memberId, name: e.name, idCard: e.idCard, birthDate: e.birthDate, educationStr: e.educationStr,
        education: e.education, collegeName: e.collegeName ,
        collegeType: e.collegeType, collegeTypeStr: e.collegeTypeStr, marriageStr: e.marriageStr,
        marriage: e.marriage, carStr: e.carStr, car: e.car ,houseStr: e.houseStr,
        house: e.house , occupation: e.occupation, incomeStr: e.incomeStr, income: e.income, url: JSON.stringify(this.data.files),type: e.type, auditState: 1},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.code == 200){
          wx.showToast({
            title: '资料提交成功',
            icon: 'success',
            duration: 2000
          })

          // 查询审核资料list
          wx.request({
            url: o.server_url + '/mini_program/selectMaterialAudit', //仅为示例，并非真实的接口地址
            method: 'GET',
            data: {memberId: a.data.form.memberId},
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (respose) {
              if(respose.data.code == 200){

                if(!!respose.data.data){

                  var item = respose.data.data.find(i => {return i.type == a.data.form.type });
                  if(!!item){
                    a.setData({
                      form: item
                    })
                  }
                  // 资料审核list
                  wx.setStorageSync('xqMaterialAuditList', respose.data.data)
                  // 本地保存 资料审核 更新时间
                  wx.setStorageSync('xqMaterialAuditDate', dateUtils.showCurrentTime());
                }
              }else{
                // 本地保存 资料审核 更新时间
                wx.setStorageSync('xqMaterialAuditDate', dateUtils.showCurrentTime());
              }

            }
          })

        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },
})