// pages/movies/movie_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comingSoonLists:[],
    showLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.getComingSoonLists();
  },
  getComingSoonLists() {
    var _this = this;
    var start = _this.data.comingSoonLists.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        start:start,
        count: 12
      },
      success: function (data) {
        var arr = _this.data.comingSoonLists;
        for (var i = 0; i < data.data.subjects.length;i++){
          arr.push(data.data.subjects[i]);
        }
        _this.setData({
          'comingSoonLists': arr,
          'showLoading': false
        });
        wx.showToast({
          title: 'ok'
        })
      },
      fail: function (data) {
        wx.showToast({
          title: 'fail'
        })
      }
    });
  },
  onOpenMovieDetail(event) {
    var movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '/pages/movies/movie_detail?movieId=' + movieId
    });
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
    console.log(1)
    this.getComingSoonLists();
    this.setData({
      showLoading:true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})