var t = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../js/config.js").consts, a = require("../../js/request.js").$http, i = require("../../js/config.js").urls.shopOrderList, s = require("../../js/config.js").urls.editOrder, r = require("../../js/config.js").urls.balance;

require("../../js/config.js").urls.shipping;

Page({
    data: {
        isOverShare: !0,
        userId: "",
        status: 1,
        pageNum: 0,
        list: [],
        isPop: !1,
        isDelete: !1,
        cancelId: "",
        isReady: !0,
        isClose: !1,
        isTip: !1,
        shipNo: "",
        shipList: [],
        isShip: !1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: "",
        isPay: !1,
        orderCode: "",
        price: 0,
        orderMoney: 0,
        freightMoney: 0,
        couponMoney: 0,
        balance: 0
    },
    onLoad: function(t) {
        var a = t.status;
        this.setData({
            status: a
        });
        var i = wx.getStorageSync(e.CN_USER_INFO);
        i && this.setData({
            userId: JSON.parse(i).userId
        });
    },
    onShow: function() {
        this.setData({
            pageNum: 0,
            list: [],
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.orderList();
    },
    onReachBottom: function() {
        if (this.data.list.length % 10 != 0) return !1;
        var t = parseInt(this.data.pageNum) + 1;
        this.setData({
            pageNum: t,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.orderList();
    },
    onShareAppMessage: function(t) {
        return "menu" == t.from ? {
            title: "卖书赚零钱，分享赢收益",
            path: "/pages/store/store?proxyNo=" + wx.getStorageSync(e.CN_PROXY_CODE),
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        } : {
            title: "花最少的钱，买最好的书",
            path: "/pages/shopOrderShare/shopOrderShare?id=" + t.target.dataset.id,
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        };
    },
    share: function() {},
    orderList: function() {
        var t = this;
        a({
            url: i,
            method: "GET",
            bizParam: {
                status: t.data.status,
                pageNum: t.data.pageNum,
                pageSize: 10
            },
            success: function(e) {
                if (e.list.length > 0) {
                    e.list.map(function(t) {
                        t.orderSkus.map(function(t) {
                            t.skuPrice = t.skuPrice.toFixed(2);
                        }), t.isOpen = !1, t.realPrice = 2 == t.payType ? (.9 * t.originalPrice + t.freightPrice - t.couponPrice).toFixed(2) : t.price.toFixed(2), 
                        t.originalPrice = t.originalPrice.toFixed(2), t.freightPrice = t.freightPrice.toFixed(2), 
                        t.couponPrice = t.couponPrice.toFixed(2), t.price = t.price.toFixed(2), 1 == t.status ? t.statusName = "待付款" : 2 == t.status ? t.statusName = "待发货" : 3 == t.status ? t.statusName = "待收货" : 4 == t.status ? t.statusName = "已完成" : 5 == t.status && (t.statusName = "已取消");
                    });
                    var a = t.data.list;
                    a = a.concat(e.list), t.setData({
                        list: a
                    }), e.list.length < 10 ? t.setData({
                        showLoading: !0,
                        isLoading: !1,
                        loadingTip: "我也是有底线的"
                    }) : t.setData({
                        showLoading: !1,
                        isLoading: !1,
                        loadingTip: ""
                    });
                }
            }
        });
    },
    changeNav: function(t) {
        var e = t.currentTarget.dataset.status;
        if (e == this.data.status) return !1;
        this.setData({
            status: e,
            pageNum: 0,
            list: [],
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.orderList();
    },
    goDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shopOrderDetail/shopOrderDetail?id=" + e
        });
    },
    copy: function(t) {
        var e = t.currentTarget.dataset.no;
        wx.setClipboardData({
            data: e
        });
    },
    lookAll: function(e) {
        var a = e.currentTarget.dataset.idx, i = this.data.list[a].isOpen, s = "list[" + a + "].isOpen";
        this.setData(t({}, s, !i));
    },
    cancelOrder: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            isPop: !0,
            isDelete: !0,
            cancelId: e
        });
    },
    confirmCancel: function(t) {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var e = this, i = this.data.cancelId;
        a({
            url: s + i,
            method: "DELETE",
            success: function(t) {
                wx.showToast({
                    title: "已取消订单",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    pageNum: 0,
                    list: [],
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                }), e.orderList();
            },
            bizError: function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function(t) {
                e.setData({
                    isPop: !1,
                    isDelete: !1,
                    cancelId: "",
                    isReady: !0
                });
            }
        });
    },
    closePop: function(t) {
        var e = t.currentTarget.dataset.type;
        return !(e && !this.data.isPay) && (e && this.data.isPay ? (this.selectComponent("#pay").closePop(), 
        !1) : void this.setData({
            isPop: !1,
            isDelete: !1,
            cancelId: "",
            isReady: !0,
            isClose: !1,
            isTip: !1,
            isShip: !1,
            isPay: !1
        }));
    },
    payOrder: function(t) {
        var e = t.currentTarget.dataset.obj, i = e.orderCode, s = parseFloat(e.price).toFixed(2), o = parseFloat(e.originalPrice).toFixed(2), n = parseFloat(e.freightPrice).toFixed(2), c = parseFloat(e.couponPrice).toFixed(2), d = this;
        d.data.userId && a({
            url: r + d.data.userId,
            method: "GET",
            success: function(t) {
                var e = (parseFloat(t.balance) - parseFloat(t.freeze)).toFixed(2);
                d.setData({
                    orderCode: i,
                    price: s,
                    orderMoney: o,
                    freightMoney: n,
                    couponMoney: c,
                    balance: e,
                    isPop: !0,
                    isPay: !0
                });
            }
        });
    },
    completePay: function() {
        this.setData({
            pageNum: 0,
            list: [],
            showLoading: !1,
            isLoading: !1,
            loadingTip: "",
            isPop: !1
        }), this.orderList();
    },
    sellAgain: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shopOrderShare/shopOrderShare?id=" + e
        });
    },
    checkShip: function(t) {
        var e = t.currentTarget.dataset.id;
        e ? wx.navigateToMiniProgram({
            appId: "wx6885acbedba59c14",
            path: "pages/result/result?nu=" + e + "&querysource=third_xcx",
            success: function(t) {}
        }) : this.setData({
            isPop: !0,
            isTip: !0
        });
    },
    confirmReceipt: function(t) {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var e = t.currentTarget.dataset.id, i = this;
        a({
            url: s + e,
            method: "PUT",
            success: function(t) {
                wx.showToast({
                    title: "已确认收货",
                    icon: "success",
                    duration: 2e3
                }), i.setData({
                    pageNum: 0,
                    list: [],
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                }), i.orderList();
            },
            bizError: function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function(t) {
                i.setData({
                    isReady: !0
                });
            }
        });
    }
});