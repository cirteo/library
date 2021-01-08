/*
 *@zenghao 2018-06-12
 */
var jsonData = require('../../data/json.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seat:"",
    libraryName: undefined,
    seatList: [],
    selectedSeat: [],
    hallName: undefined,
    scaleValue: 1,
    hidden: "hidden",
    maxSelect: 1,
    loadComplete: false,
    timer: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      seat:options.seat,
      seatArea: getApp().globalData.screenHeight - getApp().globalData.statusBarHeight - (500 * getApp().globalData.screenWidth / 750),
      rpxToPx: getApp().globalData.screenWidth / 750
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    //---这此替换成自己的接口请求成功后--start--
    let result = jsonData.dataList;
    wx.request({
      //url: app.globalData.consturl+'recommend',
      url: getApp().globalData.consturl+'libraryServer/BLL/seatList.php',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        seatID : that.data.seat
      },
      success: (res) => {
        // that.setData({
        //   'result.seatList':res.data
        // })
        result.seatList=res.data
        console.log(res.data)
      }
    })
    setTimeout(function (){
    wx.hideLoading();
    if (result.errorCode == 0) {
      let seatList = that.prosessSeatList(result);
      that.setData({
        libraryName: result.libraryName,
        hallName: result.name,
        seatList: seatList,
        seatTypeList: result.seatTypeList,
        selectedSeat: [],
        hidden: "hidden",
        seatArea: that.data.seatArea
      });
      setTimeout(function() {
        wx.hideLoading()
      }, 3000)
      //计算X和Y坐标最大值
      that.prosessMaxSeat(seatList);
      //计算左侧座位栏的数组
      that.seatToolArr()
      //按每排生成座位数组对象
      that.creatSeatMap()
      //确认最佳坐标座位
      that.creatBestSeat()
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '获取座位图失败',
        icon: 'none',
        duration: 2000
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      }, 1000)
    }
    //---这此替换成自己的接口请求成功后--end--
  },1000)
},
  //解决官方bug
  handleScale: function(e) {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    let timer = setTimeout(() => {
      this.setData({
        seatArea: this.data.seatArea
      });
    }, 200)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  /**
   * 顶级顶部返回按钮时候
   */
  prosessSeatList: function(response) {
    let resSeatList = response.seatList
    resSeatList.forEach(element => {
      // 获取座位的类型的首字母
      let firstNumber = element.type.substr(0, 1)
     
      // 加载座位的图标
      let seatType = response.seatTypeList;
      for (const key in seatType) {
        // 加载每个座位的初始图标defautIcon 和 当前图标 nowIcon
        if (element.type === seatType[key].type) {
          element.nowIcon = seatType[key].icon
          element.defautIcon = seatType[key].icon
        }
        // 根据首字母找到对应的被选中图标
        if (firstNumber + '-1' === seatType[key].type) {
          element.selectedIcon = seatType[key].icon
        }
        // 根据首字母找到对应的被选中图标
        if (firstNumber + '-2' === seatType[key].type) {
          element.soldedIcon = seatType[key].icon
        }
        // 根据首字母找到对应的被选中图标
        if (firstNumber + '-3' === seatType[key].type) {
          element.fixIcon = seatType[key].icon
        }
      }
      // 如果座位是已经售出 和 维修座位 加入属性canClick 判断座位是否可以点击
      if (element.defautIcon === element.soldedIcon || element.defautIcon === element.fixIcon) {
        element.canClick = false
      } else {
        element.canClick = true
      }
    })
    return resSeatList
  },
  //计算最大座位数,生成影厅图大小
  prosessMaxSeat: function(value) {
    let seatList = value
    let maxY = 0;
    for (let i = 0; i < seatList.length; i++) {
      let tempY = seatList[i].gRow;
      if (parseInt(tempY) > parseInt(maxY)) {
        maxY = tempY;
      }
    }
    let maxX = 0;
    for (var i = 0; i < seatList.length; i++) {
      var tempX = seatList[i].gCol;
      if (parseInt(tempX) > parseInt(maxX)) {
        maxX = tempX;
      }
    }
    let seatRealWidth = parseInt(maxX) * 70 * this.data.rpxToPx
    let seatRealheight = parseInt(maxY) * 70 * this.data.rpxToPx
    let seatScale = 1;
    let seatScaleX = 1;
    let seatScaleY = 1;
    let seatAreaWidth = 630 * this.data.rpxToPx
    let seatAreaHeight = this.data.seatArea - 200 * this.data.rpxToPx
    if (seatRealWidth > seatAreaWidth) {
      seatScaleX = seatAreaWidth / seatRealWidth
    }
    if (seatRealheight > seatAreaHeight) {
      seatScaleY = seatAreaHeight / seatRealheight
    }
    if (seatScaleX < 1 || seatScaleY < 1) {
      seatScale = seatScaleX < seatScaleY ? seatScaleX : seatScaleY
    }
    this.setData({
      maxY: parseInt(maxY),
      maxX: parseInt(maxX),
      seatScale: seatScale,
      seatScaleHeight: seatScale * 70 * this.data.rpxToPx
    });
  },
  // 座位左边栏的数组
  seatToolArr: function() {
    let seatToolArr = []
    let yMax = this.data.maxY
    let seatList = this.data.seatList
    for (let i = 1; i <= yMax; i++) {
      let el = ''
      for (let j = 0; j < seatList.length; j++) {
        if (parseInt(seatList[j].gRow) === i) {
          el = seatList[j].row
        }
      }
      seatToolArr.push(el)
    }
    this.setData({
      seatToolArr: seatToolArr
    })
  },
  // 点击每个座位触发的函数
  clickSeat: function(event) {
    let index = event.currentTarget.dataset.index;
    if (this.data.seatList[index].canClick) {
      if (this.data.seatList[index].nowIcon === this.data.seatList[index].selectedIcon) {
        this.processSelected(index)
      } else {
        this.processUnSelected(index)
      }
    }
    if (this.data.selectedSeat.length == 0) {
      this.setData({
        hidden: "hidden"
      });
    }

    
  },
  // 处理已选的座位
  processSelected: function(index) {
    let _selectedSeatList = this.data.selectedSeat
    let seatList = this.data.seatList

      // 改变这些座位的图标为初始图标 并 移除id一样的座位
      seatList[index].nowIcon = seatList[index].defautIcon
      for (const key in _selectedSeatList) {
        if (_selectedSeatList[key].id === seatList[index].id) {
          _selectedSeatList.splice(key, 1)
        }
      }
    
    this.setData({
      selectedSeat: _selectedSeatList,
      seatList: seatList
    })
  },
  // 处理未选择的座位
  processUnSelected: function(index) {
    let _selectedSeatList = this.data.selectedSeat
    let seatList = this.data.seatList
   
      // 如果选中的是非情侣座位 判断选择个数不大于 maxSelect
      if (_selectedSeatList.length >= this.data.maxSelect) {
        wx.showToast({
          title: '最多只能选择' + this.data.maxSelect + '个座位哦~',
          icon: 'none',
          duration: 2000
        })
        return
      }
      // 改变这些座位的图标为已选择图标
      seatList[index].nowIcon = seatList[index].selectedIcon
      // 记录 orgIndex属性 是原seatList数组中的下标值
      seatList[index].orgIndex = index
      // 把选择的座位放入到已选座位数组中
      let temp = { ...seatList[index]
      }
      _selectedSeatList.push(temp)
    
    this.setData({
      selectedSeat: _selectedSeatList,
      seatList: seatList,
      hidden: ""
    })
  },
  //确认选座
  confirmHandle: function() {
    let that = this
    let _this = this.data
    if (_this.selectedSeat.length === 0) {
      wx.showToast({
        title: '请至少选择一个座位~',
        icon: 'none',
        duration: 2000
      })
      return
    }else{

      var confirmSeat = that.data.seat+_this.selectedSeat[0].row+_this.selectedSeat[0].col;
      console.log("选座为:"+confirmSeat);
      wx.request({
              //url: app.globalData.consturl+'recommend',
              url: getApp().globalData.consturl+'libraryServer/BLL/adminEditSeat.php',
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/json' // 默认值
              },
              data:{
                seatID:confirmSeat,
                seatState:"停用"
              },
              success: (res) => {
                console.log(res);
                wx.showToast({
                  title: '修改成功',
                })
              }
            })
    }

  },
  //显示座位示例图
  creatBestSeat: function() {
    this.setData({
      loadComplete: true ////显示座位示例图
    })
  },
  // 根据seatList 生成一个类map的对象 key值为gRow坐标 value值为gRow为key值的数组
  creatSeatMap: function() {
    let seatList = this.data.seatList
    var obj = {}
    for (let index in seatList) {
      let seatRowList = seatList[index].gRow
      if (seatRowList in obj) {
        // 原本数组下标
        seatList[index].orgIndex = index
        obj[seatRowList].push(seatList[index])
      } else {
        let seatArr = []
        // 原本数组下标
        seatList[index].orgIndex = index
        seatArr.push(seatList[index])
        obj[seatRowList] = seatArr
      }
    }
    this.setData({
      seatMap: obj
    })
  },
})