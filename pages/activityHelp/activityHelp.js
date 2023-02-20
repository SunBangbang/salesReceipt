var t = require("../../js/config.js").consts, e = require("../../js/request.js").$http, i = require("../../js/config.js").urls.getActivityHelp, s = require("../../js/config.js").urls.activityHelpDetail, a = require("../../js/config.js").urls.joinActivityHelp;

Page({
    data: {
        isOverShare: !0,
        userId: "",
        userName: "",
        activityCode: "",
        isJoin: 0,
        doNum: 0,
        undoNum: 0,
        needList: [],
        helpList: [],
        helpId: "",
        helpName: "",
        isHelp: !1,
        width: "0rpx",
        isTip: !1
    },
    onLoad: function(s) {
        var a = this;
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = setInterval(function() {
            var s = wx.getStorageSync(t.CN_USER_INFO);
            s && (a.setData({
                userId: JSON.parse(s).userId
            }), (s = JSON.parse(s).userInfo) && s.nickName && a.setData({
                userName: s.nickName
            }), e({
                url: i,
                method: "GET",
                success: function(t) {
                    if (t) {
                        var e = 1, i = new Array(t.rule.totalNum).fill(e++);
                        a.setData({
                            activityCode: t.code,
                            undoNum: t.rule.totalNum,
                            needList: i
                        }), a.getActivityDetail();
                    }
                }
            }), wx.hideLoading(), clearInterval(o));
        }, 1e3);
        s.id && (a.setData({
            helpId: s.id
        }), s.name && a.setData({
            helpName: s.name
        }));
    },
    onShareAppMessage: function() {
        return {
            title: "快快助我一臂之力！！",
            path: "/pages/activityHelp/activityHelp?id=" + this.data.userId + "&name=" + this.data.userName,
            imageUrl: "/images/share-img2.png"
        };
    },
    showRule: function() {
        this.setData({
            isTip: !0
        });
    },
    closePop: function() {
        this.setData({
            isTip: !1
        });
    },
    getActivityDetail: function() {
        var t = this;
        e({
            url: s + t.data.activityCode + "/" + t.data.userId,
            method: "GET",
            success: function(e) {
                if (e.helpLogs.length < e.rule.totalNum) {
                    var i = e.rule.totalNum - e.helpLogs.length, s = 1, a = new Array(i).fill(s++), o = e.helpLogs.length / e.rule.totalNum * 600 + "rpx";
                    t.setData({
                        isJoin: 1,
                        doNum: e.helpLogs.length,
                        undoNum: i,
                        needList: a,
                        helpList: e.helpLogs,
                        width: o
                    });
                } else t.setData({
                    isJoin: 2,
                    doNum: e.helpLogs.length,
                    undoNum: 0,
                    needList: [],
                    helpList: e.helpLogs,
                    width: "600rpx"
                });
            },
            bizError: function(e) {
                500 == e.code && t.setData({
                    isJoin: 0
                });
            }
        });
    },
    joinActivity: function() {
        var t = this;
        e({
            url: a + t.data.activityCode,
            method: "GET",
            success: function(e) {
                t.setData({
                    isJoin: 1
                }), wx.showToast({
                    title: "报名成功"
                });
            },
            bizError: function(t) {
                500 == t.code ? wx.showToast({
                    icon: "none",
                    title: "报名次数已用完"
                }) : wx.showToast({
                    icon: "none",
                    title: t.msg
                });
            }
        });
    },
    helpActivity: function() {
        var t = this;
        if (!t.data.helpId) return wx.showToast({
            icon: "none",
            title: "当前没有助力对象"
        }), !1;
        e({
            url: s + t.data.activityCode + "/" + t.data.helpId,
            method: "POST",
            success: function(e) {
                wx.showToast({
                    title: "助力成功"
                }), t.setData({
                    isHelp: !0
                });
            },
            bizError: function(t) {
                wx.showToast({
                    icon: "none",
                    title: t.msg
                });
            }
        });
    }
});