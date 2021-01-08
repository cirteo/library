const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  clickA:function(){
    var seat = app.globalData.library.type+app.globalData.floor.type+"A"
    console.log(seat)
    if(getApp().globalData.user.type == "管理员"){
      wx.navigateTo({
      url: '/pages/edit-seat/edit-seat?seat='+seat,
    })
    }else{
      wx.navigateTo({
        url: '/pages/seat-select/seat-select?seat='+seat,
    })
  }
  },
  clickB:function(){
    var seat = app.globalData.library.type+app.globalData.floor.type+"B"
    console.log(seat)
    if(getApp().globalData.user.type == "管理员"){
      wx.navigateTo({
      url: '/pages/edit-seat/edit-seat?seat='+seat,
    })
    }else{
      wx.navigateTo({
        url: '/pages/seat-select/seat-select?seat='+seat,
    })
  }
  },
  clickC:function(){
    var seat = app.globalData.library.type+app.globalData.floor.type+"C"
    console.log(seat)
    if(getApp().globalData.user.type == "管理员"){
      wx.navigateTo({
      url: '/pages/edit-seat/edit-seat?seat='+seat,
    })
    }else{
      wx.navigateTo({
        url: '/pages/seat-select/seat-select?seat='+seat,
    })
  }
  },
  clickD:function(){
    var seat = app.globalData.library.type+app.globalData.floor.type+"D"
    console.log(seat)
    if(getApp().globalData.user.type == "管理员"){
      wx.navigateTo({
      url: '/pages/edit-seat/edit-seat?seat='+seat,
    })
    }else{
      wx.navigateTo({
        url: '/pages/seat-select/seat-select?seat='+seat,
    })
  }
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