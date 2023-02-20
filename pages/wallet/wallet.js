var t = require("../../js/config.js").consts, a = require("../../js/request.js").$http, s = require("../../js/config.js").urls.balance, i = require("../../js/config.js").urls.balanceLog, e = require("../../js/config.js").urls.cash, o = require("../../js/login.js").slientLogin;

Page({
    data: {
        isOverShare: !1,
        balance: 0,
        totalIncome: 0,
        totalPay: 0,
        isPop: !1,
        isApply: !1,
        applyMoney: "",
        isSubmit: !1,
        submitImg: "",
        submitTitle: "",
        submitTip: "",
        isTip: !1,
        isReady: !0,
        isAd: !1
    },
    onLoad: function(i) {
        var e = this, o = wx.getStorageSync(t.CN_USER_INFO);
        if (o) {
            var p = JSON.parse(o).userId;
            a({
                url: s + p,
                method: "GET",
                success: function(t) {
                    var a = (parseFloat(t.balance) - parseFloat(t.freeze)).toFixed(2);
                    e.setData({
                        balance: a
                    });
                }
            }), e.getTotal();
        }
    },
    onShareAppMessage: function() {},
    getTotal: function() {
        var t = this;
        a({
            url: i,
            method: "GET",
            success: function(a) {
                t.setData({
                    totalIncome: a[2].toFixed(2),
                    totalPay: a[1].toFixed(2)
                });
            }
        });
    },
    apply: function() {
        JSON.parse(wx.getStorageSync(t.CN_USER_INFO)).userInfo ? this.data.balance < 1 ? this.setData({
            isPop: !0,
            isTip: !0
        }) : this.setData({
            isPop: !0,
            isApply: !0
        }) : wx.getUserProfile({
            desc: "用于完善用户资料和业务运转",
            success: function(t) {
                o(t);
            }
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            isApply: !1,
            applyMoney: "",
            isSubmit: !1,
            submitImg: "",
            submitTitle: "",
            submitTip: "",
            isTip: !1,
            isReady: !0
        });
    },
    applyMoney: function(t) {
        var a = parseFloat(t.detail.value);
        this.setData({
            applyMoney: a
        });
    },
    applyAll: function() {
        this.setData({
            applyMoney: this.data.balance
        });
    },
    applyConfirm: function() {
        var t = this;
        if (!this.data.isReady) return !1;
        if (parseFloat(this.data.applyMoney) < 1 || parseFloat(this.data.applyMoney) > 1e3) this.setData({
            isApply: !1,
            isTip: !0,
            isReady: !0
        }); else if (parseFloat(this.data.applyMoney) > parseFloat(this.data.balance)) this.setData({
            isApply: !1,
            isSubmit: !0,
            submitImg: "/images/tip-warn.png",
            submitTitle: "账户余额不足",
            submitTip: "不能贪心哦~快来卖书赚钱吧",
            isReady: !0
        }); else {
            var s = this;
            a({
                url: e,
                method: "POST",
                bizParam: {
                    withdraw: parseFloat(this.data.applyMoney)
                },
                success: function(a) {
                    var i = (parseFloat(t.data.balance) - parseFloat(t.data.applyMoney)).toFixed(2);
                    s.setData({
                        balance: i,
                        submitImg: "/images/tip-success.png",
                        submitTitle: "申请提交成功",
                        submitTip: "票票正在火速赶来~"
                    }), s.getTotal();
                },
                bizError: function(t) {
                    s.setData({
                        submitImg: "/images/tip-warn.png",
                        submitTitle: "哎呀呀，出大事了",
                        submitTip: t.msg
                    });
                },
                complete: function(t) {
                    s.setData({
                        isApply: !1,
                        isSubmit: !0,
                        isReady: !0
                    });
                }
            });
        }
    },
    goLog: function() {
        wx.navigateTo({
            url: "/pages/walletLog/walletLog"
        });
    },
    showRule: function() {
        this.setData({
            isPop: !0,
            isTip: !0
        });
    },
    showAd: function() {
        this.setData({
            isPop: !0,
            isAd: !0
        });
    },
    closeAd: function() {
        this.setData({
            isPop: !1,
            isAd: !1
        }), this.apply();
    }
});