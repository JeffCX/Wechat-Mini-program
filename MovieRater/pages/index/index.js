// https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html

//https://blog.csdn.net/hicoldcat/article/details/54288245

var API_URL ="https://api.douban.com/v2/movie/top250"
var d = require("../../utils/util.js")

console.log(d.data.subjects)


Page({
  data: {
    title:"loading...",
    movies:{}
    
  },
  onLoad: function () {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 10000
    })

  //mimic an api call using setTimeOut
    setTimeout(()=>{
      wx.hideToast()
      that.setData({
        title:"豆瓣电影 Top 250",
        movies:d.data.subjects
      })


      },
      2000)
    }

  })
 
 
    /*
    wx.request({
      url: "https://api.douban.com/v2/movie/top250",
      data: {},
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  }*/

  
 
  

