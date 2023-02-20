var e = require("../../js/config.js").consts, o = require("../../js/request.js").$http, t = require("../../js/config.js").urls.addressList, a = require("../../js/config.js").urls.shopOrderMoney, s = require("../../js/config.js").urls.balance, r = require("../../js/config.js").urls.shopOrder;

Page({
    data: {
        isOverShare: !1,
        addressInfo: "",
        list: [],
        cartIds: [],
        freightMoney: 0,
        couponCode: "",
        couponName: "",
        couponMoney: 0,
        couponList: [],
        totalNum: 0,
        totalMoney: 0,
        orderMoney: 0,
        balance: "",
        isPop: !1,
        showAddress: !1,
        showDeliver: !1,
        showCoupon: !1,
        showPay: !1,
        orderCode: "",
        remark: "",
        proxy: ""
    },
    onLoad: function(r) {
        var n = this, i = JSON.parse(wx.getStorageSync(e.CN_SELECTED_CART)), c = [];
        if (i.map(function(e) {
            c.push(e.cartId);
        }), n.setData({
            list: i,
            cartIds: c
        }), o({
            url: t,
            method: "GET",
            success: function(e) {
                if (e.length > 0) {
                    var t = e[0];
                    n.setData({
                        addressInfo: t
                    }), o({
                        url: a,
                        method: "POST",
                        bizParam: {
                            addressId: t.id,
                            cartIds: n.data.cartIds
                        },
                        success: function(e) {
                            var o = e.storeSettlement.canUseCouponInfo, t = "", a = "", s = 0;
                            o.map(function(e, o) {
                                e.price = e.price.toFixed(2), e.price > s && (t = e.code, a = e.name, s = e.price);
                            }), o.push({
                                code: "",
                                name: "不使用优惠券",
                                price: 0
                            }), n.setData({
                                couponCode: t,
                                couponName: a,
                                couponMoney: s,
                                couponList: o,
                                freightMoney: e.orderTotalFright.toFixed(2)
                            }), n.calcTotal();
                        }
                    });
                } else n.setData({
                    isPop: !0,
                    showAddress: !0
                });
            }
        }), wx.getStorageSync(e.CN_PROXY_NO)) {
            var d = wx.getStorageSync(e.CN_PROXY_NO);
            n.setData({
                proxy: d
            });
        }
        var u = wx.getStorageSync(e.CN_USER_INFO);
        if (u) {
            var p = JSON.parse(u).userId;
            o({
                url: s + p,
                method: "GET",
                success: function(e) {
                    var o = (parseFloat(e.balance) - parseFloat(e.freeze)).toFixed(2);
                    n.setData({
                        balance: o
                    });
                }
            });
        }
    },
    onShow: function() {
        this.getFreightMoney();
    },
    onShareAppMessage: function() {},
    getFreightMoney: function() {
        var e = this;
        o({
            url: a,
            method: "POST",
            bizParam: {
                addressId: e.data.addressInfo.id,
                cartIds: e.data.cartIds
            },
            success: function(o) {
                e.setData({
                    freightMoney: o.orderTotalFright.toFixed(2)
                }), e.calcTotal();
            }
        });
    },
    goAddress: function() {
        wx.navigateTo({
            url: "/pages/addressList/addressList?source=1"
        });
    },
    showDeliver: function() {
        this.setData({
            isPop: !0,
            showDeliver: !0
        });
    },
    showCoupon: function() {
        this.setData({
            isPop: !0,
            showCoupon: !0
        });
    },
    chooseCoupon: function(e) {
        var o = e.currentTarget.dataset.item;
        this.setData({
            couponCode: o.code,
            couponName: o.name,
            couponMoney: o.price
        }), this.calcTotal();
    },
    getInfo: function(e) {
        var o = e.detail.value;
        this.setData({
            remark: o
        });
    },
    submitOrder: function() {
        var t = this, a = {
            addressId: t.data.addressInfo.id,
            cartIds: t.data.cartIds,
            couponCode: t.data.couponCode,
            remark: t.data.remark
        };
        t.data.proxy && (a.proxyNo = t.data.proxy), o({
            url: r,
            method: "POST",
            bizParam: a,
            success: function(o) {
                t.setData({
                    orderCode: o.orderCode,
                    isPop: !0,
                    showPay: !0
                }), wx.setStorageSync(e.CN_PROXY_NO, "");
            },
            bizError: function(e) {
                wx.showToast({
                    title: e.msg,
                    icon: "none"
                });
            }
        });
    },
    completePay: function() {
        this.setData({
            isPop: !1
        }), wx.reLaunch({
            url: "/pages/personal/personal"
        });
    },
    closePop: function(e) {
        var o = e.currentTarget.dataset.type;
        return (!o || !this.data.showAddress) && (o && this.data.showPay ? (this.selectComponent("#pay").closePop(), 
        !1) : void this.setData({
            isPop: !1,
            showAddress: !1,
            showDeliver: !1,
            showCoupon: !1,
            showPay: !1
        }));
    },
    calcTotal: function() {
        var e, o = this.data.list, t = 0, a = 0;
        o.map(function(e, o) {
            t += parseInt(e.num), a = parseFloat(a) + parseInt(e.num) * parseFloat(e.price);
        }), e = a, a = (parseFloat(a) + parseFloat(this.data.freightMoney) - parseFloat(this.data.couponMoney)).toFixed(2), 
        this.setData({
            totalNum: t,
            totalMoney: a,
            orderMoney: e
        });
    }
});