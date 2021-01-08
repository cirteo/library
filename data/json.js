// 本地模拟json数据
var json;
json = {
  "errorCode": 0,
  "errorMsg": "",
  "name": "一楼",
  "libraryName": "一期图书馆",
  // "seatList": [
  //   {
  //     "id": "1",
  //     //界面看见的位置
  //     "row": "1",
  //     "col": "1",
  //     //真实位置
  //     "gRow": 1,
  //     "gCol": 1,
  //     "type": "0",
  //     "flag": "0"
  //   },
  //   {
  //     "id": "2",
  //     "row": "1",
  //     "col": "2",
  //     "gRow": 1,
  //     "gCol": 2,
  //     "type": "0",
  //     "flag": "0"
  //   },
  //   {
  //     "id": "3",
  //     "row": "1",
  //     "col": "3",
  //     "gRow": 1,
  //     "gCol": 3,
  //     "type": "0",
  //     "flag": "0"
  //   },
  // ],
  "seatList":[],
  "seatTypeList": [
    {
      "name": "可选",
      "type": "0",
      "seats": 1,
      "icon": "https://i.postimg.cc/BbbWyY5D/image.png",
      "isShow": "1",
      "position": "up"
    },
    {
      "name": "已选",
      "type": "0-1",
      "seats": 1,
      "icon": "https://i.postimg.cc/1X2dd93h/image.png",
      "isShow": "1",
      "position": "up"
    },
    {
      "name": "已售",
      "type": "0-2",
      "seats": 1,
      "icon": "https://i.postimg.cc/LXywzkds/image.png",
      "isShow": "1",
      "position": "up"
    },
    {
      "name": "维修",
      "type": "0-3",
      "seats": 1,
      "icon": "https://i.postimg.cc/BZVRbCcY/image.png",
      "isShow": "1",
      "position": "up"
    },
  ]
}

// 定义数据出口
module.exports = {
  dataList: json
}
