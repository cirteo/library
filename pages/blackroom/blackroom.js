const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    consturl:app.globalData.consturl,
    array:[],
    id:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //flag  =  0 加载所有学生
    console.log("flag="+getApp().globalData.flag)
    if(getApp().globalData.flag == 0){
        wx.request({
                  //url: app.globalData.consturl+'recommend',
                  url: this.data.consturl+'libraryServer/BLL/adminQueryAllViolations.php',
                  method: 'POST',
                  dataType: 'json',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  data:{
                
                  },
                  success: (res) => {
                    console.log(res.data);
                    this.setData({
                      array:res.data
                    })
                  }           
                })
    }else if(getApp().globalData.flag == 1){ //加载单个学生
        wx.request({
                  //url: app.globalData.consturl+'recommend',
                  url: this.data.consturl+'libraryServer/BLL/adminQuerySingleViolation.php',
                  method: 'POST',
                  dataType: 'json',
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  data:{
                    stuNum : getApp().globalData.stuNum
                  },
                  success: (res) => {
                    console.log(res)
                    this.setData({
                      array:[res.data]
                    })
                  }
                })     
    }
     
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getId:function(e){
    this.setData({
      id:e.detail.value
    })
  },
  search:function(e){
      //把学生学号存为全局变量，使其不会重加载时被销毁
    getApp().globalData.stuNum = this.data.id;
    console.log(getApp().globalData.stuNum);
     //修改标志量，代表此次加载为查询单个学生
    getApp().globalData.flag = 1;
    this.onLoad();
  },

  unblock:function(e){
      //初始化flag，使其解封后能够显示所有小黑屋学生信息
      getApp().globalData.flag = 0;
    console.log(e);
    wx.request({
            //url: app.globalData.consturl+'recommend',
            url: this.data.consturl+'libraryServer/BLL/adminSetOut.php',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              stuNum : e.target.dataset.index
            },
            success: (res) => {
              console.log(res);
              this.onLoad();
              wx.showToast({
                title: res.data.msg,
              })
            }
          })
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
    getApp().globalData.flag=0
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