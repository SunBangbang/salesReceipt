var e = require("../../@babel/runtime/helpers/defineProperty"), t = require("../../js/request.js").$http, r = require("../../js/config.js").urls.shopOrderShare, s = require("../../js/config.js").urls.addShopCart;

Page({
    data: {
        isOverShare: !1,
        shopList: []
    },
    onLoad: function(e) {
        var t = e.id;
        this.getShareOrder(t);
    },
    onShareAppMessage: function() {},
    getShareOrder: function(e) {
        var s = this;
        t({
            url: r + e,
            method: "GET",
            success: function(e) {
                e.map(function(e) {
                    e.isCheck = !1, e.price = e.price.toFixed(2);
                }), s.setData({
                    shopList: e
                });
            }
        });
    },
    goBookDetail: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/bookDetail/bookDetail?id=" + t
        });
    },
    addCart: function(r) {
        var a = "shopList[" + r.currentTarget.dataset.idx + "].isCheck", i = r.currentTarget.dataset.obj;
        if (i.stock <= 0 || i.isCheck) return !1;
        var o = this;
        t({
            url: s,
            method: "POST",
            bizParam: {
                num: 1,
                skuId: i.id
            },
            success: function(t) {
                wx.showToast({
                    title: "添加成功",
                    icon: "success"
                }), o.setData(e({}, a, !0));
            },
            bizError: function(e) {
                wx.showToast({
                    title: e.msg,
                    icon: "none"
                });
            }
        });
    },
    goCart: function() {
        wx.reLaunch({
            url: "/pages/shopCart/shopCart"
        });
    }
});