var t = require("../../js/request.js").$http, i = require("../../js/config.js").urls.couponList, o = require("../../js/config.js").urls.myCoupon, a = require("../../js/config.js").urls.getCoupon;

Page({
    data: {
        isOverShare: !1,
        idx: 1,
        couponList: [],
        pageNum: 1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(t) {
        this.getMyCoupon();
    },
    onReachBottom: function() {
        var t = this.data.idx, i = this.data.couponList;
        if (0 == t || i.length % 10 != 0) return !1;
        var o = parseInt(this.data.pageNum) + 1;
        this.setData({
            pageNum: o,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.getMyCoupon();
    },
    onShareAppMessage: function() {},
    changeNav: function(t) {
        var i = t.currentTarget.dataset.idx;
        this.setData({
            idx: i,
            couponList: [],
            pageNum: 1,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), 0 == i ? this.getCouponList() : this.getMyCoupon();
    },
    getMyCoupon: function() {
        var i = this;
        t({
            url: o,
            method: "GET",
            bizParam: {
                pageNum: i.data.pageNum,
                pageSize: 10,
                status: i.data.idx
            },
            success: function(t) {
                t.map(function(t) {
                    t.startTime = t.startTime.slice(0, 10).replace(/-/g, "."), t.endTime = t.endTime.slice(0, 10).replace(/-/g, ".");
                });
                var o = i.data.couponList;
                o = o.concat(t), i.setData({
                    couponList: o
                }), o.length > 0 && t.length < 10 ? i.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : o.length > 0 && 10 == t.length && i.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    getCouponList: function() {
        var o = this;
        t({
            url: i,
            method: "GET",
            success: function(t) {
                var i = [];
                t.map(function(t) {
                    t.startTime = t.startTime.slice(0, 10).replace(/-/g, "."), t.endTime = t.endTime.slice(0, 10).replace(/-/g, "."), 
                    0 == t.userStatus && i.push(t);
                }), i.length > 0 && o.setData({
                    couponList: i,
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                });
            }
        });
    },
    getCoupon: function(i) {
        var o = this, e = i.currentTarget.dataset.id;
        t({
            url: a,
            method: "GET",
            bizParam: {
                couponId: e
            },
            success: function(t) {
                wx.showToast({
                    title: "领取成功",
                    icon: "none",
                    duration: 2e3
                }), o.getCouponList();
            },
            bizError: function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    }
});