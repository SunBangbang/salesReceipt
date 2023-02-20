var e = require("../../js/config.js").consts, s = require("../../js/request.js").$http, t = require("../../js/login.js").slientLogin, r = require("../../js/config.js").urls.shopCartTotal;

Component({
    properties: {
        idx: {
            type: String,
            value: "0"
        }
    },
    data: {
        navList: [ {
            icon1: "/images/footer-1-0.png",
            icon2: "/images/footer-1-1.png",
            name: "商城",
            url: "/pages/store/store"
        }, {
            icon1: "/images/footer-2-0.png",
            icon2: "/images/footer-2-1.png",
            name: "卖书",
            url: "/pages/sell/sell"
        }, {
            icon1: "/images/footer-3-0.png",
            icon2: "/images/footer-3-1.png",
            name: "购物车",
            url: "/pages/shopcart/shopcart"
        }, {
            icon1: "/images/footer-4-0.png",
            icon2: "/images/footer-4-1.png",
            name: "我的",
            url: "/pages/personal/personal"
        } ],
        cartNum: 0
    },
    pageLifetimes: {
        show: function() {
            this.getShopCartNum();
        }
    },
    lifetimes: {
        attached: function() {
            this.getShopCartNum();
        }
    },
    methods: {
        getShopCartNum: function() {
            var e = this;
            s({
                url: r,
                method: "GET",
                success: function(s) {
                    e.setData({
                        cartNum: s
                    });
                }
            });
        },
        goNav: function(s) {
            var r = s.currentTarget.dataset.idx, o = s.currentTarget.dataset.url;
            if (r == this.data.idx) return !1;
            3 == r ? wx.getStorageSync(e.CN_USER_INFO) && JSON.parse(wx.getStorageSync(e.CN_USER_INFO)).userInfo ? wx.reLaunch({
                url: "/pages/personal/personal"
            }) : wx.getUserProfile({
                desc: "用于完善用户资料和业务运转",
                success: function(e) {
                    t(e, {
                        success: function(e) {
                            wx.reLaunch({
                                url: "/pages/personal/personal"
                            });
                        }
                    });
                }
            }) : wx.reLaunch({
                url: o
            });
        }
    }
});