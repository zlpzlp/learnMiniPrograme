//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReachBottom: function () {
    console.log("该加载数据了")
  },
  onShareAppMessage(){
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  onPageScroll(){
    console.log('scrolling...')
  }
})
