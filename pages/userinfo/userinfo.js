const app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'GEYBZ-ICWRJ-5GTFO-FDUTQ-HWFQK-URBLQ' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seatLoc:"",
    color:"#1A88F7",
    name:"",
    id:"",
    timer:'',
    text:'00:00',
    min:0,
    sec:0,
    countDownNum:5
  },



  cancel:function(){
    let _this=this;
    console.log(app.globalData.user.seatID)
    if(getApp().globalData.user.seatID == "0") {
      wx.showToast({
        title: '请先选座',
      })
      return;
    }
    if(getApp().globalData.user.state != "预约中") {
      wx.showToast({
        title: '使用座位中无法取消',
      })
      return;
    }
    wx.request({
            url: getApp().globalData.consturl+'libraryServer/BLL/stuCancelReserve.php',
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
              getApp().globalData.user.seatID='0'
              console.log(res)
              this.setData({
               seatLoc:"",

              })
              wx.showToast({
                title: res.data.msg,
              }) 
              _this.onShow();           
            }      
          })
  },
  exit:function(){
    let _this=this;
    if(getApp().globalData.user.seatID == "0") {
      wx.showToast({
        title: '请先选座',
      })
      return;
    }
    if(getApp().globalData.user.state != "使用中") {
      wx.showToast({
        title: '预约中无法签退',
      })
      return;
    }
    wx.request({
            url: getApp().globalData.consturl+'libraryServer/BLL/stuSignOut.php',
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
              getApp().globalData.user.seatID='0'
              console.log(res) 
              this.setData({
                seatLoc:""
              })
              //设置签到view的背景颜色
              this.setData({
                color:"#1A88F7"
              })
              wx.showToast({
                title: res.data.msg,
              })      
              _this.onShow();      
            }      
          })
  },

  func_recent:function(){
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  logout:function(){
    getApp().globalData.user.seatLoc = "";
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  func_score:function(){
    wx.navigateTo({
      url: '/pages/score/score',
      
    })
  },
  func_contact:function(){
    wx.navigateTo({
      url: '/pages/contact/contact',
      
    })
  },
  func_about:function(){
    wx.navigateTo({
      url: '/pages/about/about',
      
    })
  },
  //签到
  func_checkIn:function(){
    if(getApp().globalData.user.seatID == "0") {
      wx.showToast({
        title: '请先选座',
      })
      return;
    }
    if(getApp().globalData.user.state != "预约中") {
      wx.showToast({
        title: '不能重复签到',
      })
      return;
    }
    var _this = this;
    //加载
    wx.showLoading({
      title: '加载中',
    })
     //调用距离计算接口
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、‘straight’（直线），不填默认：'walking',可不填
      mode:'straight',
      //from参数不填默认当前地址
      //from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
      from:'30.824723,104.180192',//可签到位置
      to:[{
        //图书馆位置:30.825213252915006, 104.17973884286133
        latitude:30.825213,
        longitude:104.179738
      }],//终点坐标
      success: function(res) {//成功后的回调
        //console.log(res);
        var res = res.result;
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        _this.setData({ //设置并更新distance数据
          distance: dis
        });
        setTimeout(function(){
          //console.log(dis[0])
          //console.log(_this.data.sec)
          //300米内可以签到，并且签到倒计时未结束(>0)
          if(dis[0]<300&&_this.data.sec>0){
          wx.request({
            //url: app.globalData.consturl+'recommend',
            url: getApp().globalData.consturl+'libraryServer/BLL/stuSignIn.php',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              stuNum:getApp().globalData.user.num,
              seatID:getApp().globalData.user.seatID
            },
            success: (res) => {
              //console.log(res);
              //设置签到view的背景颜色
              _this.setData({
                color:"green"
              })
              getApp().globalData.user.state = "使用中"
              _this.onShow();
              // _this.data.min=res.data[0].min,
              // _this.data.sec=res.data[0].sec,
              //隐藏加载框
              wx.hideLoading()
              //消息提示
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1500
              })
            }
          })      
          }else if(dis[0]>300){
            //距离太远消息提示
            wx.showToast({
              title: '距离图书馆太远，不能签到',
              icon: 'none',
              duration: 1500
            })
          }else{
            //倒计时结束消息提示
            wx.showToast({
              title: '签到倒计时已经结束，不能签到',
              icon: 'none',
              duration: 1500
            })
          }
        },1000)
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },
  //续座
  func_continue:function(){
    if(getApp().globalData.user.seatID == "0") {
      wx.showToast({
        title: '请先选座',
      })
      return;
    }
    if(getApp().globalData.user.state != "使用中") {
      wx.showToast({
        title: '预约中无法续座',
      })
      return;
    }
    var _this = this;
    //加载
    wx.showLoading({
      title: '加载中',
    })
     //调用距离计算接口
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、‘straight’（直线），不填默认：'walking',可不填
      mode:'straight',
      //from参数不填默认当前地址
      //from: '', //若起点有数据则采用起点坐标，若为空默认当前地址
      from:'30.824723,104.180192',//可签到位置
      to:[{
        //图书馆位置:30.825213252915006, 104.17973884286133
        latitude:30.825213,
        longitude:104.179738
      }],//终点坐标
      success: function(res) {//成功后的回调
       // console.log(res);
        var res = res.result;
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
        }
        _this.setData({ //设置并更新distance数据
          distance: dis
        });
        setTimeout(function(){
          //console.log(dis[0])
          //50米内可以签到，并且签到倒计时未结束(>0)
          if(dis[0]<50&&_this.data.sec>0){
          wx.request({
            //url: app.globalData.consturl+'recommend',
            url: getApp().globalData.consturl+'libraryServer/BLL/stuExtendTime.php',
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data:{
              stuNum:getApp().globalData.user.num,
              seatID:getApp().globalData.user.seatID
            },
            success: (res) => {
              //console.log(res);
              //设置签到view的背景颜色
              _this.setData({
                color:"green"
              })
              // _this.data.min=res.data[0].min,
              // _this.data.sec=res.data[0].sec
              _this.onShow();
              //隐藏加载框
              wx.hideLoading()
              //消息提示
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1500
              })
            }
          })      
          }else if(dis[0]>50){
            //距离太远消息提示
            wx.showToast({
              title: '距离图书馆太远，不能续座',
              icon: 'none',
              duration: 1500
            })
          }else{
            //倒计时结束消息提示
            wx.showToast({
              title: '续座倒计时已经结束，不能签到',
              icon: 'none',
              duration: 1500
            })
          }
        },1000)
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.user.seatLoc)
    this.setData({
      seatLoc:app.globalData.user.seatLoc,
      name:app.globalData.user.name,
      id:app.globalData.user.num
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
    let that = this;
    clearInterval(that.data.timer);
    wx.request({
      url:  getApp().globalData.consturl+'libraryServer/BLL/stuGetTime.php',
      method: 'POST',
      dataType: 'json',
      data:{
         stuNum : getApp().globalData.user.num,
         seatID : getApp().globalData.user.seatID
      },
      success : (res) =>{
        //console.log(res);
        // that.setData({
        //   min:res.data[0].min,
        //   sec:res.data[0].sec
        // })
        
        //console.log(res.data[0].min);
        that.data.min=res.data[0].min;
        //console.log(that.data.min);
        that.data.sec=res.data[0].sec;
        //console.log(that.data.sec);
      }
    })

    setTimeout(function(){
      //clearInterval(that.data.timer);
      let countDownNum = that.data.countDownNum;//获取倒计时初始值
      let min = that.data.min;
      //console.log(that.data.min)
      let sec = that.data.sec;
      if(min == 0 && sec == 0){
        let text = min+":"+(sec >= 10?sec:"0"+sec);
        that.setData({
          text:text
        })
      }else{
          //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
          that.setData({
              timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
                //每隔一秒countDownNum就减一，实现同步
                countDownNum--;
                let text = min+":"+(sec >= 10?sec:"0"+sec);
                //console.log(min+" "+sec);
                //console.log(text);
                if(sec == 0){
                  sec = 59;
                  min = min - 1;
                }else{
                  sec -= 1;
                }
                //然后把countDownNum存进data，好让用户知道时间在倒计着
                that.setData({
                  countDownNum: countDownNum,
                  sec: sec,
                  min: min,
                  text:text
                })
                //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
                if (sec == 0 && min == 0) {
                  //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
                  //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
                  that.setData({
                    countDownNum: countDownNum,
                    sec: sec,
                    min: min,
                    text:text
                  })
                  clearInterval(that.data.timer);
                  //关闭定时器之后，可作其他处理codes go here
                }
              }, 1000)
          })
      }
    },1000)
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