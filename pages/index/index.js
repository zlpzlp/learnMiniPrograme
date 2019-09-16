//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    latitude:"",
    longitude:""
  },
  onShow(){
   this.getLocation();
  },
  getLocation(){
    wx.getLocation({
      type: 'gcj02',
      success:this.handleGetLocationSucc.bind(this)
      // success(res) {
      //   const latitude = res.latitude
      //   const longitude = res.longitude
      //   const speed = res.speed
      //   const accuracy = res.accuracy
      // }
    });
  },
  handleGetLocationSucc(res){
    this.setData({
      latitude: res.latitude,
      longitude: res.longitude
    })
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '萌宠交易平台',
      path: '/page/index/index'
    }
  }
})
