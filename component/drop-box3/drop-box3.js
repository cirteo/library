const app = getApp();
Page({ 
  menu:function(e){
     var itemId = e.currentTarget.id
     var data = this.data.menus3
     var i =data[itemId].id
     //遍历data。menus3数组，如果不等于现在点击的数，则把下拉菜单收起来
     for(var j=0;j<data.length;j++){
       if(i !== j){
         data[j].hiddens = true
         this.setData({
           menus3: data
         })
       }
     }
    //  点击显示隐藏
     if (itemId == i){
       data[i].hiddens = !data[i].hiddens
        this.setData({
          menus3:data
        })
      }
   },
  //  点击更换列表值
   txt:function(e){
    app.globalData.floor.type = e.target.dataset.txt;
    console.log(app.globalData.floor.type);
     var data= this.data.menus3
    //  获取到点击的列表下标，因为是在下拉的父元素点击，所以获取到menus3下标
     var index= e.currentTarget.dataset.index
    //  获取到点击的值，赋值给默认值（e.target为e的属性值，在标签内赋值
     data[index].defaults = e.target.dataset.txt
     //，收起菜单
     data[index].hiddens = !data[index].hiddens
    //  刷新menus3的值
     this.setData({
       menus3: data
     })
   },
   
  data: {
    
   menus3:app.globalData.menus3
  },
 
})