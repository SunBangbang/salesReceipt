var t = require("../../js/config.js").consts, s = require("../../js/request.js").$http, a = require("../../js/config.js").urls.orderList, e = require("../../js/config.js").urls.order, i = require("../../js/config.js").urls.shipping;

Page({
    data: {
        isOverShare: !0,
        userId: "",
        status: "",
        isEmpty: !1,
        list: [],
        isPop: !1,
        isDelete: !1,
        cancelId: "",
        isReady: !0,
        isClose: !1,
        isTip: !1,
        shipNo: "",
        shipList: [],
        isShip: !1
    },
    onLoad: function(s) {
        var a = s.status;
        this.setData({
            status: a
        });
        var e = wx.getStorageSync(t.CN_USER_INFO);
        e && this.setData({
            userId: JSON.parse(e).userId
        });
    },
    onShow: function() {
        this.orderList();
    },
    onShareAppMessage: function(s) {
        return "menu" == s.from ? {
            title: "卖书赚零钱，分享赢收益",
            path: "/pages/store/store?proxyNo=" + wx.getStorageSync(t.CN_PROXY_CODE),
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        } : {
            title: "快来卖书啦",
            path: "/pages/sellCart/sellCart?id=" + s.target.dataset.id,
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        };
    },
    share: function() {},
    orderList: function() {
        var t = this;
        s({
            url: a + t.data.userId,
            method: "GET",
            success: function(s) {
                s.length > 0 && (s.map(function(t) {
                    t.totalPrice = (parseFloat(t.couponPrice) + parseFloat(t.totalPrice)).toFixed(2), 
                    t.finalPrice = t.finalPrice ? (parseFloat(t.couponPrice) + parseFloat(t.finalPrice)).toFixed(2) : "0.00", 
                    t.statusName = "", 100 == t.orderStatus ? (t.statusName = "待预审", t.commonStatus = "100") : 101 == t.orderStatus ? (t.statusName = "已取消", 
                    t.commonStatus = "101105") : 102 == t.orderStatus ? (t.statusName = "待回收", t.commonStatus = "102") : 103 == t.orderStatus ? (t.statusName = "待审核", 
                    t.commonStatus = "103") : 104 != t.orderStatus && 105 != t.orderStatus || (t.statusName = "已完成", 
                    t.commonStatus = "101105");
                }), t.setData({
                    list: s
                })), t.calcEmpty();
            }
        });
    },
    calcEmpty: function() {
        var t = this.data.list, s = this.data.status, a = !1;
        t.length > 0 ? s ? (a = !0, t.map(function(t) {
            t.commonStatus == s && (a = !1);
        })) : a = !1 : a = !0, this.setData({
            isEmpty: a
        });
    },
    changeNav: function(t) {
        var s = t.currentTarget.dataset.status;
        s = s || "", this.setData({
            status: s,
            isEmpty: !1
        }), this.calcEmpty();
    },
    goDetail: function(t) {
        var s = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/sellOrderDetail/sellOrderDetail?id=" + s
        });
    },
    copy: function(t) {
        var s = t.currentTarget.dataset.no;
        wx.setClipboardData({
            data: s
        });
    },
    cancelOrder: function(t) {
        var s = t.currentTarget.dataset.id;
        this.setData({
            isPop: !0,
            isDelete: !0,
            cancelId: s
        });
    },
    confirmCancel: function(t) {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var a = this, i = this.data.cancelId;
        s({
            url: e + i,
            method: "DELETE",
            success: function(t) {
                a.orderList();
            },
            bizError: function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function(t) {
                a.setData({
                    isPop: !1,
                    isDelete: !1,
                    cancelId: "",
                    isReady: !0
                });
            }
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            isDelete: !1,
            cancelId: "",
            isReady: !0,
            isClose: !1,
            isTip: !1,
            isShip: !1
        });
    },
    sellAgain: function(t) {
        var s = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/sellCart/sellCart?id=" + s
        });
    },
    checkShip: function(t) {
        var a = t.currentTarget.dataset.no;
        if (a) {
            var e = this;
            s({
                url: i + a,
                method: "GET",
                success: function(t) {
                    var s = [];
                    t.responseParam.trace_list.map(function(t, a) {
                        s.unshift(t);
                    }), e.setData({
                        shipNo: a,
                        shipList: s,
                        isShip: !0,
                        isPop: !0,
                        isClose: !0
                    });
                },
                bizError: function(t) {
                    e.setData({
                        isPop: !0,
                        isTip: !0
                    });
                }
            });
        } else this.setData({
            isPop: !0,
            isTip: !0
        });
    }
});