const app = getApp();
Page({ 
  menu:function(e){
     var itemId = e.currentTarget.id
     var data = this.data.menus2
     var i =data[itemId].id
     //遍历data。menus2数组，如果不等于现在点击的数，则把下拉菜单收起来
     for(var j=0;j<data.length;j++){
       if(i !== j){
         data[j].hiddens = true
         this.setData({
           menus2: data
         })
       }
     }
    //  点击显示隐藏
     if (itemId == i){
       data[i].hiddens = !data[i].hiddens
        this.setData({
          menus2:data
        })
      }
   },
  //  点击更换列表值
   txt:function(e){
    app.globalData.library.type = e.target.dataset.txt;
    console.log(app.globalData.library.type);
     var data= this.data.menus2
    //  获取到点击的列表下标，因为是在下拉的父元素点击，所以获取到menus2下标
     var index= e.currentTarget.dataset.index
    //  获取到点击的值，赋值给默认值（e.target为e的属性值，在标签内赋值
     data[index].defaults = e.target.dataset.txt
     //，收起菜单
     data[index].hiddens = !data[index].hiddens
    //  刷新menus2的值
     this.setData({
       menus2: data
     })
   },
   
  data: {
    
   menus2:app.globalData.menus2
  },
  
})