// pages/xiaoxi/xiaoxiliebiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curpage: "xiaoxi",
    usersList:[
        {name:"童俊豪1",src:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png",time:"2022-12-25 16:15",id: 1},
      {name:"童俊豪2",src:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png",time:"2022-12-25 16:15",id: 2},
      {name:"童俊豪3",src:"http://www.tuling123.com/resources/web/v4/img/personalCen/icon40.png",time:"2022-12-25 16:15",id: 3}]

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
  chat:function(){

    wx.navigateTo({url:"/pages/xiaoxi/xinxijiaohuan/xinxijiaohuan"})
  },













  /** 点击删除 */
  handleDelete(e) {
    let {id} = e.currentTarget.dataset;
    this.itemDel(id)
  },
  /** 删除逻辑 */
  itemDel(id){
    this.data.usersList.forEach((item,index)=>{
      if(item.id==id){
        this.data.usersList.splice(index,1)
      }
      this.setData({
        usersList:this.data.usersList
      })
      wx.showToast({
        title: '删除成功',
        icon:'success'
      })
    })
  },

  /** 处理touchstart事件 */
  handleTouchStart(e) {
    this.startX = e.touches[0].pageX
  },
  /** 处理touchend事件 */
  handleTouchEnd(e) {
    if (e.changedTouches[0].pageX < this.startX && e.changedTouches[0].pageX - this.startX <= -30) {
      this.showDeleteButton(e)
    } else if (e.changedTouches[0].pageX > this.startX && e.changedTouches[0].pageX - this.startX < 30) {
      this.showDeleteButton(e)
    } else {
      this.hideDeleteButton(e)
    }
  },
  /** 显示删除按钮 */
  showDeleteButton: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setXmove(index, -65);
    // 其它复位
    let {usersList} = this.data;
    if (usersList.length > 0) {
      usersList.forEach((item,itemIndex) => {
        if (index != itemIndex && usersList[itemIndex].xmove != 0) {
          this.setData({
            ['usersList['+itemIndex+'].xmove']: 0
          });
        }
      });
    }
  },
  /** 隐藏删除按钮 */
  hideDeleteButton: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setXmove(index, 0);
  },
  /** 设置movable-view位移 */
  setXmove: function (index, xmove) {
    let {usersList} = this.data;
    usersList[index].xmove = xmove;
    this.setData({
      usersList: usersList
    })
  },
  /** 处理movable-view移动事件 */
  handleMovableChange: function (e) {
    if (e.detail.source === 'friction') {
      if (e.detail.x < -30) {
        this.showDeleteButton(e)
      } else {
        this.hideDeleteButton(e)
      }
    } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
      this.hideDeleteButton(e)
    }
  }



})