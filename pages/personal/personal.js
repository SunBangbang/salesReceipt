var e = require("../../js/config.js").consts, t = require("../../js/request.js").$http, r = require("../../js/config.js").urls.balance, a = require("../../js/config.js").urls.shopOrderNum, s = require("../../js/config.js").urls.orderNum, u = require("../../js/login.js").slientLogin;

Page({
    data: {
        isOverShare: !1,
        userId: "1",
        faceUrl: "/images/default-user.png",
        balance: 0,
        idx: 1,
        payNum: 0,
        deliverNum: 0,
        receiptNum: 0,
        preCheckNum: 0,
        waitNum: 0,
        checkNum: 0,
        storage: "",
        isPop: !1
    },
    onLoad: function(t) {
      //  wx.setStorageSync(t.CN_USER_INFO, "{\"userId\":1,\"userInfo\":null");
        var r = this, a = wx.getStorageSync("cn_user_info");
        a && (r.setData({
            userId: JSON.parse(a).userId
        }), (a = JSON.parse(a).userInfo) && a.avatarUrl && r.setData({
            faceUrl: a.avatarUrl
        })), wx.getStorageInfo({
            success: function(e) {
                var t = e.currentSize >= 1024 ? (e.currentSize / 1024).toFixed(1) + "M" : e.currentSize + "KB";
                r.setData({
                    storage: t
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        t({
            url: r + e.data.userId,
            method: "GET",
            success: function(t) {
                var r = (parseFloat(t.balance) - parseFloat(t.freeze)).toFixed(2);
                e.setData({
                    balance: r
                });
            }
        }), t({
            url: a,
            method: "GET",
            success: function(t) {
                e.setData({
                    payNum: t.toPayCount,
                    deliverNum: t.toDeliverCount,
                    receiptNum: t.toReceiptCount
                });
            }
        }), t({
            url: s + "100,102,103",
            method: "GET",
            success: function(t) {
                e.setData({
                    preCheckNum: t[100] ? t[100] : 0,
                    waitNum: t[102] ? t[102] : 0,
                    checkNum: t[103] ? t[103] : 0
                });
            }
        });
    },
    onShareAppMessage: function() {},
    // getUserInfo: function(t) {
    //     var r = this;
    //     JSON.parse(wx.getStorageSync(e.CN_USER_INFO)).userInfo || wx.getUserProfile({
    //         desc: "用于完善用户资料和业务运转",
    //         success: function(e) {
    //             u(e, {
    //                 success: function(t) {
    //                     r.setData({
    //                         faceUrl: e.userInfo.avatarUrl
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // },
    showOrder: function(e) {
        var t = e.currentTarget.dataset.type;
        this.setData({
            idx: t
        });
    },
    goShopOrderList: function(e) {
        var t = e.currentTarget.dataset.status;
        wx.navigateTo({
            url: "/pages/shopOrderList/shopOrderList?status=" + t
        });
    },
    goOrderList: function(e) {
        var t = e.currentTarget.dataset.status;
        wx.navigateTo({
            url: "/pages/sellOrderList/sellOrderList?status=" + t
        });
    },
    goNav: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    clear: function() {
        this.setData({
            isPop: !0
        });
    },
    clearCancel: function() {
        this.setData({
            isPop: !1
        });
    },
    clearConfirm: function() {
        var e = this;
        wx.clearStorage({
            success: function(t) {
                e.setData({
                    isPop: !1,
                    storage: "0KB"
                }), u();
            }
        });
    }
});