var i = require("../../js/request.js").$http, a = require("../../js/config.js").urls.bookList;

Page({
    data: {
        isOverShare: !1,
        idx: 1,
        list: [],
        pageNum: 1,
        isTop: !1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(i) {
        i.idx && this.setData({
            idx: i.idx
        }), this.bookList();
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
        var t = this, o = {
            pageNum: t.data.pageNum,
            pageSize: 10,
            orderBys: 4
        };
        t.data.idx > 1 && (o.firstCateId = 2 == t.data.idx ? "21" : "45"), i({
            url: a,
            method: "GET",
            bizParam: o,
            success: function(i) {
                i.map(function(i) {
                    i.sellPrice = i.sellPrice.toFixed(2);
                });
                var a = t.data.list;
                a = a.concat(i), t.setData({
                    list: a
                }), a.length > 0 && i.length < 10 ? t.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : a.length > 0 && 10 == i.length && t.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    changeNav: function(i) {
        this.setData({
            idx: i.currentTarget.dataset.idx,
            list: [],
            pageNum: 1,
            isTop: !1,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.bookList();
    },
    goBookDetail: function(i) {
        var a = i.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/bookDetail/bookDetail?id=" + a
        });
    }
});