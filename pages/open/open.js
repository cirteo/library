const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  startdateValue:'2020-12-11',
  enddateValue:'2020-12-13'
  },
   startdatePickerBindchange:function(e){
    this.setData({
     startdateValue:e.detail.value
    })
   },
   enddatePickerBindchange:function(e){
    this.setData({
     enddateValue:e.detail.value
    })
   },
   close:function(){
     var seatID = app.globalData.library.type+app.globalData.floor.type
    wx.request({
      url: getApp().globalData.consturl+'libraryServer/BLL/adminCloseLibrary.php',
      method: 'POST',
      dataType: 'json',
      data:{
        startTime : this.data.startdateValue,
        endTime : this.data.enddateValue,
        seatID : seatID
      },
      success : (res) =>{
        console.log(res);
      }
    })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})