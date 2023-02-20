var a = require("../../js/config.js").consts, t = require("../../js/request.js").$http, s = require("../../js/config.js").urls.shareTotal, e = require("../../js/config.js").urls.shareCode, o = require("../../js/config.js").urls.shareList;

Page({
    data: {
        isOverShare: !1,
        avatar: "/images/default-user.png",
        total: "0.00",
        proxyNo: "",
        shareCode: "",
        isPop: !1,
        list: [],
        pageNum: 1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(o) {
        var i = this, n = wx.getStorageSync(a.CN_USER_INFO);
        n && (n = JSON.parse(n).userInfo) && n.avatarUrl && i.setData({
            avatar: n.avatarUrl
        }), t({
            url: s,
            method: "GET",
            success: function(a) {
                var s = parseFloat(a.promote).toFixed(2), o = a.proxyNo;
                i.setData({
                    proxyNo: o,
                    total: s
                }), t({
                    url: e,
                    method: "POST",
                    bizParam: {
                        scene: "proxyNo=" + o
                    },
                    success: function(a) {
                        i.setData({
                            shareCode: a.msg
                        });
                    }
                });
            }
        }), i.getList();
    },
    onReachBottom: function() {
        if (this.data.list.length % 10 != 0) return !1;
        var a = parseInt(this.data.pageNum) + 1;
        this.setData({
            pageNum: a,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.getList();
    },
    onShareAppMessage: function() {},
    getList: function() {
        var a = this;
        t({
            url: o,
            method: "GET",
            bizParam: {
                pageSize: 10,
                pageNum: a.data.pageNum
            },
            success: function(t) {
                t.map(function(a) {
                    a.statusName = 0 == a.status ? "待审核" : 1 == a.status ? "待支付" : 2 == a.status ? "已取消" : 3 == a.status ? "支付成功" : "支付失败", 
                    a.proxyPrice = parseFloat(a.proxyPrice).toFixed(2);
                });
                var s = a.data.list;
                s = s.concat(t), a.setData({
                    list: s
                }), s.length > 0 && t.length < 10 ? a.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : s.length > 0 && 10 == t.length && a.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    goRule: function() {
        wx.navigateTo({
            url: "/pages/shareRule/shareRule"
        });
    },
    showCode: function() {
        this.setData({
            isPop: !0
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1
        });
    },
    save: function() {
        var a = this.data.shareCode, t = wx.getFileSystemManager(), s = Math.random();
        t.writeFile({
            filePath: wx.env.USER_DATA_PATH + "/pic" + s + ".png",
            data: a,
            encoding: "base64",
            success: function(a) {
                wx.saveImageToPhotosAlbum({
                    filePath: wx.env.USER_DATA_PATH + "/pic" + s + ".png",
                    success: function(a) {
                        wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "保存失败"
                        });
                    }
                });
            },
            fail: function(a) {
                wx.showToast({
                    title: "图片读取失败"
                });
            }
        });
    }
});