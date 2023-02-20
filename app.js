var e = new (require("@babel/runtime/helpers/interopRequireDefault")(require("/js/user.js")).default)(), t = require("/js/login.js").slientLogin, s = require("/js/config.js").consts, n = require("/js/request.js").$http, o = require("/js/config.js").urls.shareTotal;

App({
    onLaunch: function() {},
    onShow: function(n) {
        this.autoUpdate(), e.restore();
        var o = e.getUser() ? e.getUser() : "", r = "", a = this;
        if (n.query.scene) {
            var i = decodeURIComponent(n.query.scene), u = i.lastIndexOf("=");
            r = i.substring(u + 1, i.length), wx.setStorage({
                key: s.CN_PROXY_NO,
                data: r,
                success: function(e) {
                    t(o, {
                        success: function(e) {
                            a.overShare();
                        }
                    });
                }
            });
        } else if (n.query.proxyNo) r = n.query.proxyNo, wx.setStorage({
            key: s.CN_PROXY_NO,
            data: r,
            success: function(e) {
                t(o, {
                    success: function(e) {
                        a.overShare();
                    }
                });
            }
        }); else if (e.isLogin()) {
            r = wx.getStorageSync(s.CN_PROXY_CODE);
            wx.onAppRoute(function(e) {
                var t, s = getCurrentPages(), n = s[s.length - 1];
                n && ((t = n.data).isOverShare || (t.isOverShare = !0, n.onShareAppMessage = function() {
                    return {
                        title: "卖书赚零钱，分享赢收益",
                        path: "/pages/store/store?proxyNo=" + r,
                        imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
                    };
                }));
            });
        } else t("", {
            success: function(e) {
                a.overShare();
            }
        });
    },
    globalData: {
        userInfo: null
    },
    getUser: function() {
        return e.getUser();
    },
    overShare: function() {
        n({
            url: o,
            method: "GET",
            success: function(e) {
                var t = e.proxyNo;
                wx.setStorageSync(s.CN_PROXY_CODE, t), wx.onAppRoute(function(e) {
                    var s, n = getCurrentPages(), o = n[n.length - 1];
                    o && ((s = o.data).isOverShare || (s.isOverShare = !0, o.onShareAppMessage = function() {
                        return {
                            title: "卖书赚零钱，分享赢收益",
                            path: "/pages/store/store?proxyNo=" + t,
                            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
                        };
                    }));
                });
            }
        });
    },
    autoUpdate: function() {
        var e = this;
        if (wx.canIUse("getUpdateManager")) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(s) {
                s.hasUpdate && (t.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(s) {
                            s.confirm ? t.applyUpdate() : s.cancel && wx.showModal({
                                title: "温馨提示",
                                content: "本次版本更新涉及到新的功能添加，旧版本无法正常访问",
                                success: function(t) {
                                    e.autoUpdate();
                                }
                            });
                        }
                    });
                }), t.onUpdateFailed(function() {
                    wx.showModal({
                        title: "新版本上线啦~",
                        content: "请您删除当前小程序，重新搜索打开"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用新功能，请升级到最新微信版本后重试。"
        });
    }
});