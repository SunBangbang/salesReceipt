var s = require("../../js/config.js").consts, a = require("../../js/request.js").$http, t = require("../../js/config.js").urls.bookInfo;

Page({
    data: {
        isOverShare: !1,
        answer1: !1,
        answer2: !1,
        answer3: !1,
        isPop: !1,
        isClose: !1,
        isWarn: !1,
        isScan: !1,
        scanTip: "",
        isInput: !1,
        inputTip: "",
        code: "",
        isReady: !0
    },
    onLoad: function(a) {
        wx.getStorageSync(s.CN_SELLING_CART) ? wx.redirectTo({
            url: "/pages/sellCart/sellCart"
        }) : wx.getStorageSync(s.CN_IS_TIP) || this.setData({
            isPop: !0,
            isWarn: !0
        });
    },
    onShareAppMessage: function() {},
    closePop: function() {
        this.setData({
            isPop: !1,
            isClose: !1,
            isWarn: !1,
            isScan: !1,
            scanTip: "",
            isInput: !1,
            inputTip: "",
            code: "",
            isReady: !0
        });
    },
    goRule: function() {
        wx.navigateTo({
            url: "/pages/rule/rule"
        });
    },
    startSell: function(a) {
        wx.setStorageSync(s.CN_IS_TIP, !0), this.setData({
            isPop: !1,
            isWarn: !1
        });
    },
    showAnswer: function(s) {
        var a = s.currentTarget.dataset.answer;
        1 == a ? this.setData({
            answer1: !this.data.answer1,
            answer2: !1,
            answer3: !1
        }) : 2 == a ? this.setData({
            answer2: !this.data.answer2,
            answer1: !1,
            answer3: !1
        }) : this.setData({
            answer3: !this.data.answer3,
            answer1: !1,
            answer2: !1
        });
    },
    scanCode: function() {
        if (!this.data.isReady) return !1;
        this.setData({
            isPop: !1,
            isClose: !1,
            isScan: !1,
            scanTip: "",
            isReady: !1
        });
        var s = this;
        wx.scanCode({
            success: function(a) {
                var t = a.result;
                /^978\d{10}$/.test(t) ? s.bookInfo(t, "scan") : s.setData({
                    isPop: !0,
                    isClose: !0,
                    isScan: !0,
                    scanTip: "格式错误，请重新扫描",
                    isReady: !0
                });
            },
            fail: function(a) {
                s.setData({
                    isReady: !0
                });
            }
        });
    },
    inputCode: function() {
        this.setData({
            isPop: !0,
            isClose: !0,
            isInput: !0,
            inputTip: "",
            code: ""
        });
    },
    getInfo: function(s) {
        var a = s.detail.value;
        this.setData({
            code: a
        });
    },
    confirmCode: function() {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var s = this.data.code;
        s ? 13 != s.length || "978" != s.substring(0, 3) ? this.setData({
            inputTip: "格式错误，请重新输入",
            isReady: !0
        }) : this.bookInfo(s, "input") : this.setData({
            inputTip: "编码不能为空",
            isReady: !0
        });
    },
    bookInfo: function(e, i) {
        var n = this;
        a({
            url: t + e,
            method: "GET",
            success: function(a) {
                if ("1" != a.status) n.setData({
                    isPop: !0,
                    isClose: !0
                }), "scan" == i ? n.setData({
                    isScan: !0,
                    scanTip: "暂不回收该本书籍"
                }) : n.setData({
                    isInput: !0,
                    inputTip: "暂不回收该本书籍1"
                }); else {
                    var t = [ {
                        bookId: a.bookId,
                        isbn: a.isbn,
                        faceUrl: a.faceUrl ? a.faceUrl : "/images/default-book.png",
                        name: a.bookName,
                        author: a.author,
                        press: a.press,
                        price: a.price,
                        discounts: a.discounts,
                        libaryCode: a.libaryCode,
                        newPrice: (parseFloat(a.price) * parseFloat(a.discounts[0].value)).toFixed(2),
                        oldPrice: (parseFloat(a.price) * parseFloat(a.discounts[1].value)).toFixed(2),
                        num: 1,
                        maxNum: a.maxNum
                    } ];
                    wx.setStorageSync(s.CN_SELLING_CART, JSON.stringify(t)), wx.redirectTo({
                        url: "/pages/sellCart/sellCart"
                    });
                }
            },
            bizError: function(s) {
                666 == s.code && (n.setData({
                    isPop: !0,
                    isClose: !0
                }), "scan" == i ? n.setData({
                    isScan: !0,
                    scanTip: "该本书籍暂未录入，过两天再来看看吧"
                }) : n.setData({
                    isInput: !0,
                    inputTip: "该本书籍暂未录入，过两天再来看看吧"
                }));
            },
            complete: function(s) {
                n.setData({
                    isReady: !0
                });
            }
        });
    }
});