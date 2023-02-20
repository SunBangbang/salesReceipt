var e = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../js/config.js").consts, t = require("../../js/request.js").$http, s = require("../../js/config.js").urls.address, o = require("../../js/config.js").urls.addressEdit, r = require("../../js/config.js").urls.order, i = require("../../js/config.js").urls.msgTemp, n = require("../../dist/base/index").$Message, d = require("../../js/config.js").urls.myCoupon;

Page({
    data: {
        isOverShare: !1,
        name: "",
        phone: "",
        addressId: "",
        address: [],
        isEmpty: !0,
        isNew: !0,
        detail: "",
        isChange: !1,
        list: [],
        order: [],
        totalNum: 0,
        totalLow: 0,
        totalPrice: 0,
        isAgree: !1,
        isReady: !0,
        msgIds: [],
        isPop: !1,
        isTip: !1,
        proxy: "",
        couponList: [],
        couponCode: "",
        couponName: "",
        couponMoney: "",
        showCoupon: !1,
        totalMoney: ""
    },
    onLoad: function(e) {
        var o = this, r = "", n = wx.getStorageSync(a.CN_USER_INFO);
        if (n && (r = (n = JSON.parse(n)).userId, t({
            url: s + r,
            method: "GET",
            success: function(e) {
                e.length > 0 && o.setData({
                    isNew: !1,
                    isEmpty: !1,
                    addressId: e[0].id,
                    name: e[0].userName,
                    phone: e[0].telNumber,
                    address: [ e[0].provinceName, e[0].cityName, e[0].countyName ],
                    detail: e[0].detailInfo
                });
            }
        })), wx.getStorageSync(a.CN_PROXY_NO)) {
            var c = wx.getStorageSync(a.CN_PROXY_NO);
            o.setData({
                proxy: c
            });
        }
        var u = JSON.parse(wx.getStorageSync(a.CN_SELLING_CART)), p = [], l = 0, m = 0, g = 0;
        u.map(function(e) {
            var a = {
                bookId: e.bookId,
                isbn: e.isbn,
                faceUrl: "/images/default-book.png" == e.faceUrl ? "" : e.faceUrl,
                name: e.name,
                author: e.author,
                press: e.press,
                price: e.price,
                discounts: e.discounts,
                num: e.num
            };
            p.push(a), l = parseInt(l) + parseInt(e.num), m = parseFloat(m) + parseFloat(e.oldPrice) * parseInt(e.num), 
            g = parseFloat(g) + parseFloat(e.newPrice) * parseInt(e.num);
        }), m = m.toFixed(2), g = g.toFixed(2), o.setData({
            list: u,
            order: p,
            totalNum: l,
            totalLow: m,
            totalPrice: g,
            totalMoney: m
        }), t({
            url: i,
            method: "GET",
            success: function(e) {
                o.setData({
                    msgIds: e
                });
            }
        }), t({
            url: d,
            method: "GET",
            bizParam: {
                pageNum: 1,
                pageSize: 10,
                status: 1
            },
            success: function(e) {
                var a = [], t = "", s = "", r = "", i = o.data.totalMoney;
                e.map(function(e) {
                    2 == e.platformType && (a.push(e), e.addPrice > r && (t = e.code, s = e.name, r = e.addPrice));
                }), a.length > 0 && a.push({
                    code: "",
                    name: "不使用惊喜券",
                    addPrice: 0
                }), i = (parseFloat(i) + parseFloat(r)).toFixed(2), o.setData({
                    couponList: a,
                    couponCode: t,
                    couponName: s,
                    couponMoney: r,
                    totalMoney: i
                });
            }
        });
    },
    onShareAppMessage: function() {},
    getInfo: function(a) {
        var t = a.currentTarget.dataset.key, s = a.detail.value;
        this.setData(e({
            isChange: !0
        }, t, s));
    },
    bindPickerChange: function(e) {
        this.setData({
            isEmpty: !1,
            isChange: !0,
            address: e.detail.value
        });
    },
    agree: function() {
        var e = this.data.isAgree;
        this.setData({
            isAgree: !e
        });
    },
    goAgreement: function() {
        wx.navigateTo({
            url: "/pages/agreement/agreement"
        });
    },
    createOrder: function() {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        });
        var e = this, s = this.data.name.trim(), i = this.data.phone.trim(), d = this.data.isEmpty, c = this.data.detail.trim(), u = this.data.isAgree;
        if (s) if (i) if (11 != i.length) n({
            content: "手机号码格式错误",
            type: "error"
        }), e.setData({
            isReady: !0
        }); else if (d) n({
            content: "请选择省市区",
            type: "error"
        }), e.setData({
            isReady: !0
        }); else if (c) if (u) {
            var p = {
                userName: s,
                mobile: i,
                province: e.data.address[0],
                city: e.data.address[1],
                district: e.data.address[2],
                address: e.data.detail,
                minPrice: e.data.totalLow,
                maxPrice: e.data.totalLow,
                totalPrice: e.data.totalLow,
                totalNum: e.data.totalNum
            };
            e.data.couponCode && (p.couponCode = e.data.couponCode), e.data.isNew && e.data.proxy && (p.proxyNo = e.data.proxy), 
            p.details = e.data.order, t({
                url: r,
                method: "POST",
                bizParam: p,
                success: function(t) {
                    wx.setStorageSync(a.CN_SELLING_CART, ""), wx.setStorageSync(a.CN_PROXY_NO, ""), 
                    e.setData({
                        isPop: !0,
                        isTip: !0
                    });
                },
                bizError: function(e) {
                    n({
                        content: e.msg,
                        type: "error"
                    });
                },
                complete: function(a) {
                    e.setData({
                        isReady: !0
                    });
                }
            });
            var l = {
                userName: s,
                telNumber: i,
                provinceName: e.data.address[0],
                cityName: e.data.address[1],
                countyName: e.data.address[2],
                detailInfo: e.data.detail,
                isDefault: 1
            };
            e.data.isNew ? t({
                url: o,
                method: "POST",
                bizParam: l,
                success: function(e) {}
            }) : !e.data.isNew && e.data.isChange && (l.id = e.data.addressId, t({
                url: o,
                method: "PUT",
                bizParam: l,
                success: function(e) {}
            }));
        } else n({
            content: "请阅读并同意《用户协议》",
            type: "error"
        }), e.setData({
            isReady: !0
        }); else n({
            content: "请填写详细地址",
            type: "error"
        }), e.setData({
            isReady: !0
        }); else n({
            content: "请填写手机",
            type: "error"
        }), e.setData({
            isReady: !0
        }); else n({
            content: "请填写姓名",
            type: "error"
        }), e.setData({
            isReady: !0
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            isTip: !1
        }), wx.requestSubscribeMessage({
            tmplIds: this.data.msgIds,
            complete: function(e) {
                wx.reLaunch({
                    url: "/pages/personal/personal"
                });
            }
        });
    },
    showCoupon: function() {
        this.setData({
            isPop: !0,
            showCoupon: !0
        });
    },
    chooseCoupon: function(e) {
        var a = e.currentTarget.dataset.item, t = this.data.totalLow, s = (parseFloat(t) + parseFloat(a.addPrice)).toFixed(2);
        this.setData({
            couponCode: a.code,
            couponName: a.name,
            couponMoney: a.addPrice,
            totalMoney: s
        });
    },
    closePop2: function() {
        this.setData({
            isPop: !1,
            showCoupon: !1
        });
    }
});