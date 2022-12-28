// pages/xiaoxi/xinxijiaohuan/xinxijiaohuan.js

var sp='';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // head_other: 'http://v1.qzone.cc/avatar/201407/01/12/53/53b23ebb14c27312.jpg%21200x200.jpg',
    // head_me: 'http://p1.gexing.com/G1/M00/C7/73/rBACE1IgR_PBIieMAAAfAWtb1fA891_200x200_3.jpg',
    speak: [
      {name:"me",   say:"今天一起去看电影吧。今天一起去看电影吧今天一起去看电影吧今天一起去看电影吧今天一起去看电影吧今天一起去看电影吧。",path:''},
      {name:"other",say:"不要不要不要不要不不要不要不要不要不不要不要不要不要不不要不要不要不要不不要不要不要不要不不要不要不要不要不不要不要不要不要不不要不要不要不要不",path:''},
      {name:"me",   say:"我请你呢",path:''},
      {name:"other",say:"还是我请你吧",path:''}
    ],
    sendicon:'icon-audio',
    ipt:true,
    clear:'',
    scrollTop:'10000'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
// //输入文字时，将文字取出，放置全局变量中
//   speakchange:function(e){
//     sp = e.detail.value;
//   },
// //点击发送，推入new的data中的speakarr中，并且setData
//   dosend:function(){
//     debugger
//     if(sp!=""){
//       console.log(999)
//       var count = this.data.speak.length;
//       var newsp={name:'me',   say:sp,  path:''};
//       this.data.speak.push(newsp);
//       this.setData({clear:'  ',scrollTop:'1000000'});//如果不改变clearclear，那么下边clear他不会执行
//       this.setData({ clear:' ',speak: this.data.speak});
//       this.setData({scrollTop:'10000000'});
//       sp='';
//     }else{
//       this.setData({ clear:' '});
//       wx.showToast({
//         title: '请输入文字',
//         icon: 'success',
//         duration: 1500
//       });
//     }
//
//   }
})