// pages/movies/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheatersLists: [],
    comingSoonLists: [],
    top250Lists: [],
    searchLists: [],
    showLoading: false,
    isSearching: false,
    isSearchingEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.getInTheaterLists();
    _this.getComingSoonLists();
    _this.getTop250Lists();
  },
  getInTheaterLists() {
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      data: {
        count: 5
      },
      success: function(data) {
        _this.setData({
          'inTheatersLists': data.data.subjects
        })
        wx.showToast({
          title: 'ok'
        })
      },
      fail: function(data) {
        wx.showToast({
          title: 'fail'
        })
      }
    });
  },
  getComingSoonLists() {
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        count: 3
      },
      success: function(data) {
        _this.setData({
          'comingSoonLists': data.data.subjects
        });
        wx.showToast({
          title: 'ok'
        })
      },
      fail: function(data) {
        wx.showToast({
          title: 'fail'
        })
      }
    });
  },
  getTop250Lists() {
    var _this = this;
    var start = _this.data.top250Lists.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      data: {
        count: 9,
        start: start
      },
      success: function(data) {
        var arr = _this.data.top250Lists;
        for (var i = 0; i < data.data.subjects.length; i++) {
          arr.push(data.data.subjects[i]);
        }
        _this.setData({
          'top250Lists': arr,
          'showLoading': false
        });
        wx.showToast({
          title: 'ok'
        })
      },
      fail: function(data) {
        wx.showToast({
          title: 'fail'
        })
      }
    });
  },
  getSearchLists(q) {
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/search',
      data: {
        q: q
      },
      success: function(data) {
        var isEmpty = false;
        if (!data.data.subjects.length) {
          isEmpty = true
        } else {
          isEmpty = false
        }
        _this.setData({
          searchLists: data.data.subjects,
          isSearchingEmpty: isEmpty
        })
        wx.showToast({
          title: 'ok'
        })
      },
      fail: function(data) {
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
  onOpenMore(e) {
    wx.navigateTo({
      url: '/pages/movies/movie_more'
    });
  },
  onSearch(e) {
    var searching = '';
    searching = e.detail.value;
    console.log(e.detail.value)
    if (searching) {
      this.setData({
        isSearching: true
      });
      this.getSearchLists(searching);
    } else {
      this.setData({
        isSearching: false
      });
    }

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getTop250Lists();
    this.setData({
      showLoading: true
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /*服务器图片错误处理*/
  onImageError(e) {
    var index = e.currentTarget.dataset.index;
    var top250Lists = this.data.top250Lists;
    var movieItem = top250Lists[index];
    movieItem.images.large = '../../imgs/movie/error_img.jpg';
    top250Lists[index] = movieItem;
    this.setData({
      top250Lists: top250Lists
    })
  }
})