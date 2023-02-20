var e = require("../../@babel/runtime/helpers/defineProperty"), t = require("../../js/config.js").consts, s = require("../../js/request.js").$http, r = require("../../js/config.js").urls.bannerList, i = require("../../js/config.js").urls.noticeList, n = require("../../js/config.js").urls.storeType, o = require("../../js/config.js").urls.bookList, a = require("../../js/config.js").urls.shareTotal;

Page({
    data: {
        isOverShare: !1,
        isLoading: !0,
        bannerList: [],
        notice: "",
        typeList1: [],
        typeList2: [],
        hotList: [],
        newList: [],
        freeList: [],
        cheapList: [],
        scrollTop: ""
    },
    onLoad: function(e) {
        // e={scene: "flag=true"}
        console.log(e,111111)
        var o = "";
        if (e.proxyNo) o = e.proxyNo, wx.setStorageSync(t.CN_PROXY_NO, o); else if (e.scene) {
            var c = decodeURIComponent(e.scene), u = c.lastIndexOf("=");
            o = c.substring(u + 1, c.length), wx.setStorageSync(t.CN_PROXY_NO, o);
        }
        var l = this;
        s({
            url: a,
            method: "GET",
            success: function(e) {
                var s = e.proxyNo;
                wx.setStorageSync(t.CN_PROXY_CODE, s);
            }
        }), s({
            url: r,
            method: "GET",
            bizParam: {
                orderCount: "1",
                type: "1"
            },
            success: function(e) {
                l.setData({
                    bannerList: e
                });
            }
        }),
        s({
            url: i,
            method: "GET",
            bizParam: {
                pageNum: 1,
                pageSize: 1
            },
            success: function(e) {
                e.length > 0 && l.setData({
                    notice: e[0].noticeTitle
                }, function() {
                    l.selectComponent("#notice-bar").linFlush();
                });
            }
        });
        var p = [], f = [];
        s({
            url: n,
            method: "GET",
            success: function(e) {
                e.map(function(e, t) {
                    t < 5 ? p.push(e) : f.push(e);
                }), l.setData({
                    typeList1: p,
                    typeList2: f
                });
            }
        });
        var g = setInterval(function() {
            if (wx.getStorageSync(t.CN_USER_INFO)) {
                l.bookList({
                    orderBys: 4
                }, "hotList");
                l.bookList({
                    orderBys: 1
                }, "newList");
                l.bookList({
                    tags: 65
                }, "freeList");
                l.bookList({
                    orderBys: 3
                }, "cheapList"), l.setData({
                    isLoading: !1
                }), clearInterval(g);
            }
        }, 1e3);
    },
    onPageScroll: function(e) {
        this.setData({
            scrollTop: e.scrollTop
        }), wx.lin.setScrollTop(e.scrollTop);
    },
    onShareAppMessage: function() {},
    bookList: function(t, r) {
        var i = this;
        t.pageNum = 1, t.pageSize = 5, s({
            url: o,
            method: "GET",
            bizParam: t,
            success: function(t) {
                t.map(function(e) {
                    e.sellPrice = e.sellPrice.toFixed(2), e.discount = (e.sellPrice / e.price * 10).toFixed(1);
                }), i.setData(e({}, r, t)), wx.lin.flushSticky();
            }
        });
    },
    jumpLink: function(e) {
        var t = e.currentTarget.dataset.url, s = e.currentTarget.dataset.name, r = e.currentTarget.dataset.banner, i = e.currentTarget.dataset.id;
        if (!i && t) wx.navigateTo({
            url: t
        }); else if (i && t) {
            var n = {
                firstCateId: i
            };
            s && (n.name = s), r && (n.banner = r), n = JSON.stringify(n), wx.navigateTo({
                url: t + "?param=" + n
            });
        }
    }
});