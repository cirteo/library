const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    score:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      score:app.globalData.user.score
    })
    wx.request({
            url: getApp().globalData.consturl+'libraryServer/BLL/stuQueryScore.php',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              stuNum:app.globalData.user.num
            },            
            success: (res) => {
              console.log(res.data) 
              this.setData({
                array:res.data
              })            
            }      
          })
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