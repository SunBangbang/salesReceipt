var e = require("../../js/config.js").consts, i = require("../../js/request.js").$http, t = require("../../js/config.js").urls.editOrder, a = require("../../js/config.js").urls.balance;

require("../../js/config.js").urls.shipping;

Page({
    data: {
        isOverShare: !0,
        userId: "",
        id: "",
        status: "",
        statusName: "",
        no: "",
        name: "",
        phone: "",
        address: "",
        list: [],
        originalPrice: "",
        freightPrice: "",
        couponPrice: "",
        price: "",
        realPrice: "",
        balance: "",
        remark: "",
        createTime: "",
        payTime: "",
        deliveryTime: "",
        receivingTime: "",
        isPop: !1,
        isDelete: !1,
        isReady: !0,
        isClose: !1,
        isTip: !1,
        shipNo: "",
        shipList: [],
        isShip: !1,
        isPay: !1
    },
    onLoad: function(a) {
        var r = this, s = wx.getStorageSync(e.CN_USER_INFO);
        s && r.setData({
            userId: JSON.parse(s).userId
        });
        var o = a.id;
        i({
            url: t + o,
            method: "GET",
            success: function(e) {
                var i = "";
                1 == e.status ? i = "待付款" : 2 == e.status ? i = "待发货" : 3 == e.status ? i = "待收货" : 4 == e.status ? i = "已完成" : 5 == e.status && (i = "已取消"), 
                e.orderSkus.map(function(e) {
                    e.skuPrice = e.skuPrice.toFixed(2);
                }), r.setData({
                    id: o,
                    status: e.status,
                    statusName: i,
                    no: e.orderCode,
                    name: e.orderAttr.receiptName,
                    phone: e.orderAttr.receiptMobile,
                    address: e.orderAttr.receiptProvince + e.orderAttr.receiptCity + (e.orderAttr.receiptDistrict ? e.orderAttr.receiptDistrict : "") + e.orderAttr.receiptDetailAddress,
                    list: e.orderSkus,
                    originalPrice: e.originalPrice.toFixed(2),
                    freightPrice: e.freightPrice.toFixed(2),
                    couponPrice: e.couponPrice.toFixed(2),
                    price: e.price.toFixed(2),
                    realPrice: 2 == e.payType ? (.9 * e.originalPrice + e.freightPrice - e.couponPrice).toFixed(2) : e.price.toFixed(2),
                    remark: e.remark,
                    createTime: e.createTime ? e.createTime : "暂无",
                    payTime: e.payTime ? e.payTime : "暂无",
                    deliveryTime: e.deliveryTime ? e.deliveryTime : "暂无",
                    receivingTime: e.receivingTime ? e.receivingTime : "暂无",
                    shipNo: e.waybillCode
                });
            }
        });
    },
    onShareAppMessage: function(i) {
        return "menu" == i.from ? {
            title: "卖书赚零钱，分享赢收益",
            path: "/pages/store/store?proxyNo=" + wx.getStorageSync(e.CN_PROXY_CODE),
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        } : {
            title: "花最少的钱，买最好的书",
            path: "/pages/shopOrderShare/shopOrderShare?id=" + this.data.no,
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        };
    },
    copy: function(e) {
        var i = e.currentTarget.dataset.no;
        wx.setClipboardData({
            data: i
        });
    },
    goDetail: function(e) {
        var i = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/bookDetail/bookDetail?id=" + i
        });
    },
    cancelOrder: function() {
        this.setData({
            isPop: !0,
            isDelete: !0
        });
    },
    confirmCancel: function(e) {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var a = this, r = this.data.id;
        i({
            url: t + r,
            method: "DELETE",
            success: function(e) {
                wx.showToast({
                    title: "已取消订单",
                    icon: "success",
                    duration: 2e3
                }), wx.navigateBack({
                    delta: 1
                });
            },
            bizError: function(e) {
                wx.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function(e) {
                a.setData({
                    isPop: !1,
                    isReady: !0
                });
            }
        });
    },
    closePop: function(e) {
        var i = e.currentTarget.dataset.type;
        return !(i && !this.data.isPay) && (i && this.data.isPay ? (this.selectComponent("#pay").closePop(), 
        !1) : void this.setData({
            isPop: !1,
            isDelete: !1,
            isReady: !0,
            isClose: !1,
            isTip: !1,
            isShip: !1,
            isPay: !1
        }));
    },
    payOrder: function(e) {
        var t = this;
        t.data.userId && i({
            url: a + t.data.userId,
            method: "GET",
            success: function(e) {
                var i = (parseFloat(e.balance) - parseFloat(e.freeze)).toFixed(2);
                t.setData({
                    balance: i,
                    isPop: !0,
                    isPay: !0
                });
            }
        });
    },
    completePay: function() {
        this.setData({
            isPop: !1
        }), wx.navigateBack({
            delta: 1
        });
    },
    checkShip: function() {
        var e = this.data.shipNo;
        e ? wx.navigateToMiniProgram({
            appId: "wx6885acbedba59c14",
            path: "pages/result/result?nu=" + e + "&querysource=third_xcx",
            success: function(e) {}
        }) : this.setData({
            isPop: !0,
            isTip: !0
        });
    },
    confirmReceipt: function(e) {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var a = this;
        i({
            url: t + a.data.id,
            method: "PUT",
            success: function(e) {
                wx.showToast({
                    title: "已确认收货",
                    icon: "success",
                    duration: 2e3
                }), wx.navigateBack({
                    delta: 1
                });
            },
            bizError: function(e) {
                wx.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function(e) {
                a.setData({
                    isReady: !0
                });
            }
        });
    },
    sellAgain: function() {
        wx.navigateTo({
            url: "/pages/shopOrderShare/shopOrderShare?id=" + this.data.no
        });
    }
});