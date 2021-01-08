//app.js
App({
  onLaunch: function () {
    let that = this
    wx.getSystemInfo({
      success: res => {
        that.globalData.screenHeight = res.screenHeight;
        that.globalData.screenWidth = res.screenWidth;
        that.globalData.statusBarHeight = res.statusBarHeight
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    flag:0,
    consturl:"http://localhost:8081/",
    userInfo: null,
    user : {
      name : "",
      score : "",
      num : "",
      type:"",
      seatID:"",
      seatLoc:"",
      state:""
    },
    library:{
      type:""
    },
    floor:{
      type:""
    },
    menus:[
      { 
        id:0,
        hiddens: true,
        defaults:"学生",
        txt:[
          {lis:"学生"},
          {lis:"管理员"}
          ]
     }],
     menus2:[
      { 
        id:0,
        hiddens: true,
        defaults:"1",
        txt:[
          {lis:"1"},
          {lis:"2"}
          ]
     }],
     menus3:[
      { 
        id:0,
        hiddens: true,
        defaults:"1",
        txt:[
          {lis:"1"},
          {lis:"2"},
          {lis:"3"},
          {lis:"4"},
          {lis:"5"}
          ]
     }],
     menus4:[
      { 
        id:0,
        hiddens: true,
        defaults:"1",
        txt:[
          {lis:"1"},
          {lis:"2"}
          ]
     }],
     menus5:[
      { 
        id:0,
        hiddens: true,
        defaults:"1",
        txt:[
          {lis:"1"},
          {lis:"2"},
          {lis:"3"},
          {lis:"4"},
          {lis:"5"},
          ]
     }]
    
  }
})