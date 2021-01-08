const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consturl:app.globalData.consturl,
    password:"",
    username:""

  },
  getUser:function(e){
    console.log(e)
    this.setData({

      username:e.detail.value
    })
  },
  getPwd:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  login:function(){

    wx.request({
            url: this.data.consturl+'libraryServer/BLL/accountCheck.php',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              account:this.data.username, //账号
              pwd:this.data.password, //密码
              type:getApp().globalData.user.type //登录类型，只有’学生’或者’管理员’
            },
            success: (res) => {
              console.log(res);
              app.globalData.user.name=res.data.stuName
              app.globalData.user.num=res.data.stuNum
              app.globalData.user.score=res.data.stuScore
              app.globalData.user.seatID = res.data.stuSeated
              app.globalData.user.state = res.data.stuState
              app.globalData.user.seatLoc = res.data.stuSeatLoc
              console.log(app.globalData.user.score)
              if(res.data.state==0&&getApp().globalData.user.type=="学生"){
                wx.reLaunch({
                  url: '/pages/booking/booking',
                })
              }else if(res.data.state==0&&getApp().globalData.user.type=='管理员'){
                wx.reLaunch({
                  url: '/pages/admin/admin',
                })
              }
              else{
                wx.showToast({
                  title: '账号或密码错误',
                })
              }
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