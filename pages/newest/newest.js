var i = require("../../js/request.js").$http, t = require("../../js/config.js").urls.bookList;

Page({
    data: {
        isOverShare: !1,
        pageNum: 1,
        list: [],
        isTop: !1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(i) {
        this.bookList();
    },
    onPageScroll: function(i) {
        i.scrollTop > 300 ? this.setData({
            isTop: !0
        }) : this.setData({
            isTop: !1
        });
    },
    onReachBottom: function() {
        if (this.data.list.length % 10 != 0) return !1;
        var i = parseInt(this.data.pageNum) + 1;
        this.setData({
            pageNum: i,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.bookList();
    },
    onShareAppMessage: function() {},
    bookList: function() {
        var a = this, o = {
            pageNum: a.data.pageNum,
            pageSize: 10,
            orderBys: 1
        };
        i({
            url: t,
            method: "GET",
            bizParam: o,
            success: function(i) {
                i.map(function(i) {
                    i.sellPrice = i.sellPrice.toFixed(2), i.discount = (i.sellPrice / i.price * 10).toFixed(1);
                });
                var t = a.data.list;
                t = t.concat(i), a.setData({
                    list: t
                }), t.length > 0 && i.length < 10 ? a.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : t.length > 0 && 10 == i.length && a.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    goBookDetail: function(i) {
        var t = i.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/bookDetail/bookDetail?id=" + t
        });
    }
});