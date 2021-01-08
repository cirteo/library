const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,
    seatID:"",
    seatLoc:""
  },
  region:function(){
    if(getApp().globalData.user.seatID != "0") {
      wx.showToast({
        title: '无法重复选座',
      })
      return;
    }
    if(getApp().globalData.user.score == "0") {
      wx.showToast({
        title: '信誉积分不足',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/region/region',
    })
  },
  random:function(){
    if(getApp().globalData.user.seatID != "0") {
      wx.showToast({
        title: '无法重复选座',
      })
      return;
    }
    if(getApp().globalData.user.score == "0") {
      wx.showToast({
        title: '信誉积分不足',
      })
      return;
    }
    
    wx.request({
            url: getApp().globalData.consturl+'libraryServer/BLL/stuReserveSeatRand.php',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              
            },            
            success: (res) => {
              console.log(res.data)
              app.globalData.user.seatID=res.data.seatID
              app.globalData.user.seatLoc=res.data.seatLoc
              this.setData({
                seatLoc:app.globalData.user.seatLoc,
                seatID:app.globalData.user.seatID,
                hiddenmodalput:!this.data.hiddenmodalput
              }) 
            }      
          })
  },
cancel:function(){
  this.setData({
    hiddenmodalput:true
    
  });
  getApp().globalData.user.seatID = "0";
  getApp().globalData.user.seatLoc = "";
},
confirm:function(){
  console.log(app.globalData.user.seatID)
  wx.request({
          
          url: getApp().globalData.consturl+'libraryServer/BLL/stuReserveSeat.php',
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data:{
              stuNum:app.globalData.user.num,
              seatID:app.globalData.user.seatID
          },            
          success: (res) => {
            console.log(res.data)
            app.globalData.user.seatLoc=res.data.seatLoc
            getApp().globalData.user.state="预约中"
            this.setData({
              hiddenmodalput:true
            })
            wx.reLaunch({
              url: '/pages/userinfo/userinfo',
            }) 
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