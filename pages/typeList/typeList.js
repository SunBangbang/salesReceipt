var a = require("../../js/request.js").$http, t = require("../../js/config.js").urls.bookList;

Page({
    data: {
        isOverShare: !1,
        key: "",
        banner: "",
        name: "",
        firstCateId: "",
        secondCateId: "",
        pageNum: 1,
        order: "0",
        list: [],
        isTop: !1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(a) {
        var t = JSON.parse(a.param), e = {
            name: t.name,
            firstCateId: t.firstCateId,
            secondCateId: t.secondCateId ? t.secondCateId : ""
        };
        e = JSON.stringify(e), this.setData({
            key: e,
            banner: t.banner,
            name: t.name,
            firstCateId: t.firstCateId,
            secondCateId: t.secondCateId ? t.secondCateId : ""
        }), wx.setNavigationBarTitle({
            title: t.name
        }), this.bookList();
    },
    onPageScroll: function(a) {
        a.scrollTop > 300 ? this.setData({
            isTop: !0
        }) : this.setData({
            isTop: !1
        });
    },
    onReachBottom: function() {
        if (this.data.list.length % 10 != 0) return !1;
        var a = parseInt(this.data.pageNum) + 1;
        this.setData({
            pageNum: a,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.bookList();
    },
    onShareAppMessage: function() {},
    bookList: function() {
        var e = this, i = {
            pageNum: e.data.pageNum,
            pageSize: 10,
            orderBys: e.data.order,
            firstCateId: e.data.firstCateId
        };
        e.data.secondCateId && (i.secondCateId = e.data.secondCateId), a({
            url: t,
            method: "GET",
            bizParam: i,
            success: function(a) {
                a.map(function(a) {
                    a.sellPrice = a.sellPrice.toFixed(2), a.discount = (a.sellPrice / a.price * 10).toFixed(1);
                });
                var t = e.data.list;
                t = t.concat(a), e.setData({
                    list: t
                }), t.length > 0 && a.length < 10 ? e.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : t.length > 0 && 10 == a.length && e.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    changeOrder: function(a) {
        this.setData({
            order: a.detail.order,
            pageNum: 1,
            list: [],
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.bookList();
    }
});