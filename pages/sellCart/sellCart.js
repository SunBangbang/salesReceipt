var t = require("../../@babel/runtime/helpers/defineProperty"), s = require("../../js/config.js").consts, a = require("../../js/request.js").$http, i = require("../../js/config.js").urls.bookInfo, e = require("../../js/config.js").urls.bookLimit, o = require("../../js/config.js").urls.orderShare;

Page({
    data: {
        isOverShare: !1,
        isShare: !1,
        limitNum: 0,
        limitMoney: 0,
        list: [],
        totalNum: 0,
        totalMoney: 0,
        isPop: !1,
        isClose: !1,
        isScan: !1,
        scanTip: "",
        isInput: !1,
        inputTip: "",
        code: "",
        isReady: !0,
        isNext: !1,
        isWarn: !1
    },
    onLoad: function(t) {
        var i = this;
        if (wx.getStorageSync(s.CN_IS_TIP) || i.setData({
            isPop: !0,
            isWarn: !0
        }), t.id) a({
            url: o + t.id,
            method: "GET",
            success: function(t) {
                var a = [];
                t.map(function(t, s) {
                    1 == t.status && (t.name = t.bookName, t.newPrice = (parseFloat(t.price) * parseFloat(t.discounts[0].value)).toFixed(2), 
                    t.oldPrice = (parseFloat(t.price) * parseFloat(t.discounts[1].value)).toFixed(2), 
                    t.num = 1, a.push(t));
                }), a.length > 0 ? (i.setData({
                    list: a
                }), i.getLimit(), wx.setStorageSync(s.CN_SELLING_CART, JSON.stringify(a))) : wx.redirectTo({
                    url: "/pages/sell/sell"
                });
            }
        }); else {
            var e = JSON.parse(wx.getStorageSync(s.CN_SELLING_CART));
            e ? (i.setData({
                list: e
            }), i.getLimit()) : wx.redirectTo({
                url: "/pages/sell/sell"
            });
        }
    },
    onShareAppMessage: function() {},
    goRule: function() {
        wx.navigateTo({
            url: "/pages/rule/rule"
        });
    },
    startSell: function(t) {
        wx.setStorageSync(s.CN_IS_TIP, !0), this.setData({
            isPop: !1,
            isWarn: !1
        });
    },
    getLimit: function() {
        var t = this;
        a({
            url: e,
            method: "GET",
            success: function(s) {
                t.setData({
                    limitNum: s.minTotalNum,
                    limitMoney: s.minTotalPrice
                }), t.calTotal();
            }
        });
    },
    deleteBook: function(t) {
        var a = parseInt(t.currentTarget.dataset.index), i = [];
        this.data.list.map(function(t, s) {
            s != a && i.push(t);
        }), this.setData({
            list: i
        }), wx.setStorageSync(s.CN_SELLING_CART, JSON.stringify(i)), this.calTotal(), 0 == i.length && (wx.setStorageSync(s.CN_SELLING_CART, ""), 
        wx.redirectTo({
            url: "/pages/sell/sell"
        }));
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            isClose: !1,
            isScan: !1,
            scanTip: "",
            isInput: !1,
            inputTip: "",
            code: "",
            isReady: !0
        });
    },
    scanCode: function() {
        var t = this.data.isReady;
        if (this.data.totalNum >= 50) wx.showToast({
            title: "当前订单的书籍总数已达上限，请分批下单！",
            icon: "none"
        }); else {
            if (!t) return !1;
            this.setData({
                isPop: !1,
                isClose: !1,
                isScan: !1,
                scanTip: "",
                isReady: !1
            });
            var s = this;
            wx.scanCode({
                success: function(t) {
                    var a = t.result;
                    /^978\d{10}$/.test(a) ? s.bookInfo(a, "scan") : s.setData({
                        isPop: !0,
                        isClose: !0,
                        isScan: !0,
                        scanTip: "格式错误，请重新扫描",
                        isReady: !0
                    });
                },
                fail: function(t) {
                    s.setData({
                        isReady: !0
                    });
                }
            });
        }
    },
    inputCode: function() {
        this.data.totalNum >= 50 ? wx.showToast({
            title: "当前订单的书籍总数已达上限，请分批下单！",
            icon: "none"
        }) : this.setData({
            isPop: !0,
            isClose: !0,
            isInput: !0,
            inputTip: "",
            code: ""
        });
    },
    getInfo: function(t) {
        var s = t.detail.value;
        this.setData({
            code: s
        });
    },
    confirmCode: function() {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var t = this.data.code;
        13 != t.length || "978" != t.substring(0, 3) ? this.setData({
            inputTip: "格式错误，请重新输入",
            isReady: !0
        }) : this.bookInfo(t, "input");
    },
    bookInfo: function(t, e) {
        var o = this, n = o.data.list, r = !1, l = !1;
        n.map(function(s) {
            s.isbn == t && (r = !0, "library_preferred" != s.libaryCode ? (o.setData({
                isPop: !0,
                isClose: !0,
                isReady: !0
            }), "scan" == e ? o.setData({
                isScan: !0,
                scanTip: "该本书籍在一个订单中最多回收1本"
            }) : o.setData({
                isInput: !0,
                inputTip: "该本书籍在一个订单中最多回收1本"
            })) : s.num < 6 ? (s.num += 1, l = !0) : (o.setData({
                isPop: !0,
                isClose: !0,
                isReady: !0
            }), "scan" == e ? o.setData({
                isScan: !0,
                scanTip: "该本书籍在一个订单中最多回收6本"
            }) : o.setData({
                isInput: !0,
                inputTip: "该本书籍在一个订单中最多回收6本"
            })));
        }), l && (wx.setStorageSync(s.CN_SELLING_CART, JSON.stringify(n)), o.setData({
            list: n
        }), o.calTotal(), o.closePop()), r || a({
            url: i + t,
            method: "GET",
            success: function(t) {
                if ("1" != t.status) o.setData({
                    isPop: !0,
                    isClose: !0
                }), "scan" == e ? o.setData({
                    isScan: !0,
                    scanTip: "暂不回收该本书籍"
                }) : o.setData({
                    isInput: !0,
                    inputTip: "暂不回收该本书籍1"
                }); else {
                    var a = {
                        bookId: t.bookId,
                        isbn: t.isbn,
                        faceUrl: t.faceUrl ? t.faceUrl : "/images/default-book.png",
                        name: t.bookName,
                        author: t.author,
                        press: t.press,
                        price: t.price,
                        discounts: t.discounts,
                        libaryCode: t.libaryCode,
                        newPrice: (parseFloat(t.price) * parseFloat(t.discounts[0].value)).toFixed(2),
                        oldPrice: (parseFloat(t.price) * parseFloat(t.discounts[1].value)).toFixed(2),
                        num: 1,
                        maxNum: t.maxNum
                    };
                    n.unshift(a), wx.setStorageSync(s.CN_SELLING_CART, JSON.stringify(n)), o.setData({
                        list: n
                    }), o.calTotal(), o.closePop();
                }
            },
            bizError: function(t) {
                666 == t.code && (o.setData({
                    isPop: !0,
                    isClose: !0
                }), "scan" == e ? o.setData({
                    isScan: !0,
                    scanTip: "该本书籍暂未录入，过两天再来看看吧"
                }) : o.setData({
                    isInput: !0,
                    inputTip: "该本书籍暂未录入，过两天再来看看吧"
                }));
            },
            complete: function(t) {
                o.setData({
                    isReady: !0
                });
            }
        });
    },
    changeNum: function(a) {
        var i = a.currentTarget.dataset.idx, e = a.detail.num, o = "list[" + i + "].num";
        this.setData(t({}, o, e)), wx.setStorageSync(s.CN_SELLING_CART, JSON.stringify(this.data.list)), 
        this.calTotal();
    },
    calTotal: function() {
        var t = 0, s = 0, a = !1;
        this.data.list.map(function(a) {
            t += parseInt(a.num), s = parseFloat(s) + parseInt(a.num) * parseFloat(a.oldPrice);
        }), s = s.toFixed(2), a = t >= this.data.limitNum && this.data.list.length >= 5, 
        this.setData({
            totalNum: t,
            totalMoney: s,
            isNext: a
        });
    },
    doNext: function() {
        if (this.data.isNext) wx.navigateTo({
            url: "/pages/sellCreate/sellCreate"
        }); else {
            var t = "旧书满5种且总数满" + this.data.limitNum + "本起收";
            this.setData({
                isPop: !0,
                isClose: !0,
                isScan: !0,
                scanTip: t
            });
        }
    }
});