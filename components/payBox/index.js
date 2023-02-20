var e = require("../../js/request.js").$http, a = require("../../js/config.js").urls.payOrder;

Component({
    properties: {
        showPay: {
            type: Boolean,
            value: !1
        },
        orderCode: {
            type: String,
            value: ""
        },
        price: {
            type: Number,
            value: 0
        },
        orderMoney: {
            type: Number,
            value: 0
        },
        freightMoney: {
            type: Number,
            value: 0
        },
        couponMoney: {
            type: Number,
            value: 0
        },
        balance: {
            type: Number,
            value: 0
        }
    },
    data: {
        payType: "",
        payName: "请选择支付方式",
        showSuccessTip: !1,
        showPayTip: !1
    },
    methods: {
        choosePay: function(e) {
            var a = e.currentTarget.dataset.type;
            if (1 == a) this.setData({
                payType: 1,
                payName: "微信支付 ￥" + this.data.price.toFixed(2)
            }); else if (2 == a) {
                var t = (.9 * this.data.orderMoney + this.data.freightMoney - this.data.couponMoney).toFixed(2);
                t = t > 0 ? t : "0.00", this.setData({
                    payType: 2,
                    payName: "余额支付 ￥" + t
                });
            } else this.setData({
                payType: 3,
                payName: "余额支付 ￥" + this.data.balance.toFixed(2) + "，微信支付 ￥" + (this.data.price - this.data.balance).toFixed(2)
            });
        },
        confirmPay: function() {
            if (this.data.payType) {
                var t = this;
                1 == t.data.payType ? e({
                    url: a + t.data.orderCode,
                    method: "GET",
                    bizParam: {
                        type: 1
                    },
                    success: function(e) {
                        e = e.data;
                        wx.requestPayment({
                            timeStamp: e.time_stamp,
                            nonceStr: e.nonce_str,
                            package: e.package_,
                            signType: "MD5",
                            paySign: e.pay_sign,
                            success: function(e) {
                                t.setData({
                                    showSuccessTip: !0,
                                    showPay: !1
                                });
                            },
                            fail: function(e) {
                                t.setData({
                                    showPayTip: !0,
                                    showPay: !1
                                });
                            }
                        });
                    },
                    bizError: function(e) {
                        wx.showToast({
                            title: e.msg,
                            icon: "none"
                        }), t.setData({
                            showPay: !1
                        });
                    }
                }) : 2 == t.data.payType ? e({
                    url: a + t.data.orderCode,
                    method: "GET",
                    bizParam: {
                        type: 2
                    },
                    success: function(e) {
                        t.setData({
                            showSuccessTip: !0,
                            showPay: !1
                        });
                    },
                    bizError: function(e) {
                        wx.showToast({
                            title: e.msg,
                            icon: "none"
                        }), t.setData({
                            showPay: !1
                        });
                    }
                }) : wx.showToast({
                    title: "系统升级中，敬请期待",
                    icon: "none",
                    duration: 2e3
                });
            } else wx.showToast({
                title: "请选择支付方式",
                icon: "none"
            });
        },
        closePay: function() {
            this.setData({
                payType: "",
                payName: "请选择支付方式",
                showSuccessTip: !1,
                showPayTip: !1
            }), this.triggerEvent("closePay");
        },
        showPay: function() {
            this.setData({
                showPayTip: !1,
                showPay: !0
            });
        },
        completePay: function() {
            this.setData({
                payType: "",
                payName: "请选择支付方式",
                showSuccessTip: !1,
                showPayTip: !1
            }), this.triggerEvent("completePay");
        },
        closePop: function() {
            this.setData({
                payType: "",
                payName: "请选择支付方式",
                showPay: !1,
                showSuccessTip: !1,
                showPayTip: !0
            });
        }
    }
});