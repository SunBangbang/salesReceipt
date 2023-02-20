var t = require("../../js/request.js").$http, a = require("../../js/config.js").consts, i = require("../../js/config.js").urls.balanceLog, e = require("../../utils/util.js").formatTimeTwo;

Page({
    data: {
        isOverShare: !1,
        userId: "",
        navIdx: 1,
        list: [],
        current: 1,
        showLoading: !1,
        isLoading: !1,
        loadingTip: ""
    },
    onLoad: function(t) {
        var i = wx.getStorageSync(a.CN_USER_INFO);
        i && (this.setData({
            userId: JSON.parse(i).userId
        }), this.getList());
    },
    onShareAppMessage: function() {},
    onReachBottom: function() {
        if (this.data.list.length % 20 != 0) return !1;
        var t = parseInt(this.data.current) + 1;
        this.setData({
            current: t,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.getList();
    },
    getList: function() {
        var a = this, s = a.data.navIdx, n = i + a.data.userId;
        t({
            url: n += 1 == s ? "/10" : 2 == s ? "/2" : 3 == s ? "/9" : 4 == s ? "/7" : 5 == s ? "/1" : "/11",
            method: "GET",
            bizParam: {
                pageSize: 20,
                pageNum: a.data.current
            },
            success: function(t) {
                if (t.length > 0) {
                    t.map(function(t) {
                        t.amount = parseFloat(t.amount).toFixed(2), t.note = 1 == s ? t.note.split(",")[0].split(":")[1] : 2 == s || 3 == s || 4 == s ? t.note.split("(")[0].split(":")[1] : 5 == s ? t.note.substring(0, 6) : t.note.split(",")[0].split(":")[1], 
                        t.createdAt = e(t.createdAt, "Y-M-D h:m:s");
                    });
                    var i = a.data.list;
                    i = i.concat(t), a.setData({
                        list: i
                    }), i.length > 0 && t.length < 20 ? a.setData({
                        showLoading: !0,
                        isLoading: !1,
                        loadingTip: "我也是有底线的"
                    }) : i.length > 0 && 20 == t.length && a.setData({
                        showLoading: !1,
                        isLoading: !1,
                        loadingTip: ""
                    });
                }
            }
        });
    },
    changeNav: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            navIdx: a,
            list: [],
            current: 1,
            showLoading: !1,
            isLoading: !1,
            loadingTip: ""
        }), this.getList();
    }
});