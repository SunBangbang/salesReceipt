var t = require("../../js/config.js").consts, i = require("../../js/request.js").$http, a = require("../../js/config.js").urls.hotKey, s = require("../../js/config.js").urls.bookList;

Page({
    data: {
        isOverShare: !1,
        firstCateId: "",
        secondCateId: "",
        hotList: [],
        historyList: [],
        isInput: !1,
        key: "",
        order: "0",
        pageNum: 1,
        bookList: [],
        isSearch: !1,
        isTop: !1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(i) {
        if (i.key) {
            var a = JSON.parse(i.key);
            this.setData({
                firstCateId: a.firstCateId,
                secondCateId: a.secondCateId ? a.secondCateId : ""
            }), wx.setNavigationBarTitle({
                title: "搜索 - " + a.name
            });
        }
        this.getHot();
        var s = wx.getStorageSync(t.CN_HISTORY_KEY);
        s && (s = JSON.parse(s), this.setData({
            historyList: s
        }));
    },
    onPageScroll: function(t) {
        t.scrollTop > 300 ? this.setData({
            isTop: !0
        }) : this.setData({
            isTop: !1
        });
    },
    onReachBottom: function() {
        var t = this.data.bookList;
        if (this.data.isSearch && t.length % 10 == 0) {
            var i = parseInt(this.data.pageNum) + 1;
            this.setData({
                pageNum: i,
                showLoading: !0,
                isLoading: !0,
                loadingTip: "努力加载中"
            }), this.bookList();
        }
    },
    onShareAppMessage: function() {},
    getHot: function() {
        var t = this;
        i({
            url: a,
            method: "GET",
            bizParam: {
                pageNum: 1,
                pageSize: 10
            },
            success: function(i) {
                t.setData({
                    hotList: i
                });
            }
        });
    },
    emptyHistory: function() {
        this.setData({
            historyList: []
        }), wx.setStorageSync(t.CN_HISTORY_KEY, "");
    },
    getKey: function(t) {
        var i = t.detail.value.trim();
        i ? (this.setData({
            isInput: !0,
            key: i,
            order: "0",
            pageNum: 1,
            bookList: [],
            isSearch: !1,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.bookList()) : this.setData({
            isInput: !1,
            key: "",
            order: "0",
            pageNum: 1,
            bookList: [],
            isSearch: !1,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        });
    },
    emptyKey: function() {
        this.setData({
            isInput: !1,
            key: "",
            order: "0",
            pageNum: 1,
            bookList: [],
            isSearch: !1,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        });
    },
    chooseKey: function(i) {
        var a = i.currentTarget.dataset.key, s = this.data.historyList, e = !1;
        s.map(function(t) {
            t == a && (e = !0);
        }), e || (s.unshift(a), wx.setStorageSync(t.CN_HISTORY_KEY, JSON.stringify(s))), 
        this.setData({
            historyList: s,
            isInput: !0,
            key: a,
            order: "0",
            pageNum: 1,
            bookList: [],
            isSearch: !0,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.bookList();
    },
    doSearch: function() {
        var i = this.data.key.trim();
        if (i) {
            var a = this.data.historyList, s = !1;
            a.map(function(t) {
                t == i && (s = !0);
            }), s || (a.unshift(i), wx.setStorageSync(t.CN_HISTORY_KEY, JSON.stringify(a))), 
            this.setData({
                historyList: a,
                isInput: !0,
                key: i,
                order: "0",
                pageNum: 1,
                bookList: [],
                isSearch: !0,
                showLoading: !1,
                isLoading: !1,
                loadingTip: ""
            }), this.bookList();
        } else wx.showToast({
            title: "请输入搜索关键字",
            icon: "none"
        });
    },
    bookList: function(t) {
        var a = this;
        t = {
            pageNum: a.data.pageNum,
            pageSize: 10,
            keyword: a.data.key,
            orderBys: a.data.order
        };
        a.data.firstCateId && (t.firstCateId = a.data.firstCateId), a.data.secondCateId && (t.secondCateId = a.data.secondCateId), 
        i({
            url: s,
            method: "GET",
            bizParam: t,
            success: function(t) {
                if (!t) return !1;
                t.map(function(t) {
                    t.sellPrice = t.sellPrice.toFixed(2), t.discount = (t.sellPrice / t.price * 10).toFixed(1);
                });
                var i = a.data.bookList;
                i = i.concat(t), a.setData({
                    bookList: i
                }), a.data.isSearch && i.length > 0 && t.length < 10 ? a.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : a.data.isSearch && i.length > 0 && 10 == t.length && a.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    changeOrder: function(t) {
        this.setData({
            order: t.detail.order,
            pageNum: 1,
            bookList: [],
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.bookList();
    }
});