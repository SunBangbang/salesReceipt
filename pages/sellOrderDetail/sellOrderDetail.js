var e = require("../../js/config.js").consts, i = require("../../js/request.js").$http, t = require("../../js/config.js").urls.order, s = require("../../utils/util.js").formatTimeTwo, a = require("../../js/config.js").urls.shipping;

Page({
    data: {
        isOverShare: !0,
        id: "",
        status: "",
        statusName: "",
        no: "",
        name: "",
        phone: "",
        address: "",
        list: [],
        couponMoney: "",
        total: 0,
        finalTotal: 0,
        remark: "",
        createTime: "",
        preTime: "",
        deliverTime: "",
        reviewTime: "",
        isPop: !1,
        isDelete: !1,
        isReady: !0,
        isClose: !1,
        isTip: !1,
        shipNo: "",
        shipList: [],
        isShip: !1
    },
    onLoad: function(e) {
        var a = this, r = e.id;
        i({
            url: t + r,
            method: "GET",
            success: function(e) {
                var i = [], t = !1;
                e.details.map(function(s) {
                    s.oldPrice = (parseFloat(s.price) * parseFloat(s.discounts[1].value)).toFixed(2), 
                    s.finalPrice = s.finalPrice ? parseFloat(s.finalPrice).toFixed(2) : "0.00", i.map(function(i) {
                        e.orderStatus < 104 ? s.isbn == i.isbn ? (t = !0, i.num += 1) : t = !1 : e.orderStatus >= 104 && (s.isbn == i.isbn && s.finalPrice == i.finalPrice ? (t = !0, 
                        i.num += 1) : t = !1);
                    }), t || i.push(s), t = !1;
                });
                var o = "", n = "";
                100 == e.orderStatus ? o = "待预审" : 101 == e.orderStatus ? (o = "已取消", n = e.remark) : 102 == e.orderStatus ? o = "待回收" : 103 == e.orderStatus ? o = "待审核" : 104 != e.orderStatus && 105 != e.orderStatus || (o = "已完成");
                var c = e.createdAt ? s(e.createdAt, "Y-M-D h:m:s") : "暂无", u = e.preReviewTime ? s(e.preReviewTime, "Y-M-D h:m:s") : "暂无", p = e.recoverTime ? s(e.recoverTime, "Y-M-D h:m:s") : "暂无", l = e.reviewTime ? s(e.reviewTime, "Y-M-D h:m:s") : "暂无";
                a.setData({
                    id: r,
                    status: e.orderStatus,
                    statusName: o,
                    no: e.orderNo,
                    name: e.userName,
                    phone: e.mobile,
                    address: e.province + e.city + e.district + e.address,
                    list: i,
                    couponMoney: e.couponPrice,
                    total: (parseFloat(e.couponPrice) + parseFloat(e.totalPrice)).toFixed(2),
                    finalTotal: e.finalPrice ? (parseFloat(e.couponPrice) + parseFloat(e.finalPrice)).toFixed(2) : "0.00",
                    remark: n,
                    createTime: c,
                    preTime: u,
                    deliverTime: p,
                    reviewTime: l,
                    shipNo: e.mailNo
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
            title: "快来卖书啦",
            path: "/pages/sellCart/sellCart?id=" + this.data.no,
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        };
    },
    copy: function(e) {
        var i = e.currentTarget.dataset.no;
        wx.setClipboardData({
            data: i
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
        var s = this, a = this.data.id;
        i({
            url: t + a,
            method: "DELETE",
            success: function(e) {
                wx.navigateBack({
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
                s.setData({
                    isPop: !1,
                    isReady: !0
                });
            }
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            isDelete: !1,
            isReady: !0,
            isClose: !1,
            isTip: !1,
            isShip: !1
        });
    },
    sellAgain: function() {
        wx.navigateTo({
            url: "/pages/sellCart/sellCart?id=" + this.data.no
        });
    },
    checkShip: function() {
        var e = this.data.shipNo;
        if (e) {
            var t = this;
            i({
                url: a + e,
                method: "GET",
                success: function(e) {
                    var i = [];
                    e.responseParam.jdResult ? e.responseParam.jdResult.map(function(e, t) {
                        e.time = e.opeTime, e.description = e.opeRemark, i.push(e);
                    }) : e.responseParam.trace_list.map(function(e, t) {
                        i.unshift(e);
                    }), t.setData({
                        shipList: i,
                        isShip: !0,
                        isPop: !0,
                        isClose: !0
                    });
                },
                bizError: function(e) {
                    t.setData({
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