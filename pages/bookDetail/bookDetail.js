var t = require("../../js/request.js").$http, s = require("../../js/config.js").urls.bookDetail, i = require("../../js/config.js").urls.shopCartTotal, a = require("../../js/config.js").urls.addShopCart, e = require("../../js/config.js").urls.bookList;

Page({
    data: {
        isOverShare: !0,
        id: "",
        skuId: "",
        img: "",
        imgList: [],
        name: "",
        author: "",
        press: "",
        isbn: "",
        sellPrice: "",
        price: "",
        discount: "",
        details: "",
        salesNum: 0,
        totalNum: 0,
        isMore: !1,
        pageNum: 1,
        firstCateId: "",
        secondCateId: "",
        list: [],
        showLoading: !1,
        isLoading: !1,
        loadingTip: "",
        isTop: !1,
        isPop: !1,
        showService: !1,
        showCart: !1,
        showLevel: !1,
        typeList: [],
        idx: 0,
        num: 1,
        cartNum: 0
    },
    onLoad: function(i) {
        var a = i.id, e = this;
        t({
            url: s +"?id="+ a,
            method: "GET",
            success: function(t) {
                // t.skuList.map(function(t) {
                //     t.price = t.price.toFixed(2);
                // }
                // ), 
                e.setData({
                    // id: a,
                    // originalSkuId: t.id,
                    // skuId: t.id,
                    img: t.url,
                    // imgList: JSON.parse(t.spu.urls),
                    name: t.name,
                    author: t.author,
                    press: t.press,
                     isbn: t.isbn,
                    // sellPrice: t.spu.sellPrice.toFixed(2),
                    price: t.price,//.toFixed(2),
                    // originalPrice: t.spu.price.toFixed(2),
                    // discount: (t.spu.sellPrice / t.spu.price * 10).toFixed(1),
                     details: t.mobileDesc
                    // salesNum: t.spu.sales,
                    // totalNum: t.stock,
                    // originalTotalNum: t.stock,
                    // typeList: t.skuList,
                    // firstCateId: t.spu.firstCateId,
                    // secondCateId: t.spu.secondCateId
                });
            },
            complete: function(t) {
                e.bookList();
            }
        }) //, e.getShopCartNum();
    },
    onPageScroll: function(t) {
        t.scrollTop > 300 ? this.setData({
            isTop: !0
        }) : this.setData({
            isTop: !1
        });
    },
    onReachBottom: function() {
        if (this.data.list.length % 10 != 0) return !1;
        var t = parseInt(this.data.pageNum) + 1;
        this.setData({
            pageNum: t,
            showLoading: !0,
            isLoading: !0,
            loadingTip: "努力加载中"
        }), this.bookList();
    },
    onShareAppMessage: function(t) {
        if ("menu" == t.from) return {
            title: "卖书赚零钱，分享赢收益",
            path: "/pages/store/store?proxyNo=" + wx.getStorageSync(consts.CN_PROXY_CODE),
            imageUrl: "https://mini.cainiaoshoushu.com/face/img/share-img.jpg"
        };
        return {
            title: "有本书想和你一起读",
            path: "/pages/bookDetail/bookDetail?id=" + this.data.id,
            imageUrl: this.data.img
        };
    },
    getShopCartNum: function() {
        var s = this;
        t({
            url: i,
            method: "GET",
            success: function(t) {
                s.setData({
                    cartNum: t
                });
            }
        });
    },
    bookList: function() {
        var s = this, i = {
            pageNum: s.data.pageNum,
            pageSize: 10
        };
        s.data.firstCateId && (i.firstCateId = s.data.firstCateId), s.data.secondCateId && (i.secondCateId = s.data.secondCateId), 
        t({
            url: e,
            method: "GET",
            bizParam: i,
            success: function(t) {
                t.map(function(t) {
                    t.sellPrice = t.sellPrice.toFixed(2), t.price = t.price.toFixed(2);
                });
                var i = s.data.list;
                i = i.concat(t), s.setData({
                    list: i
                }), i.length > 0 && t.length < 10 ? s.setData({
                    showLoading: !0,
                    isLoading: !1,
                    loadingTip: "我也是有底线的"
                }) : i.length > 0 && 10 == t.length && s.setData({
                    showLoading: !1,
                    isLoading: !1,
                    loadingTip: ""
                });
            }
        });
    },
    lookMore: function() {
        this.setData({
            isMore: !this.data.isMore
        });
    },
    showService: function() {
        this.setData({
            isPop: !0,
            showService: !0
        });
    },
    showCart: function() {
        this.addCart();
    },
    showLevel: function() {
        this.setData({
            showCart: !1,
            showLevel: !0
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            showService: !1,
            showCart: !1,
            showLevel: !1,
            idx: 0,
            skuId: this.data.originalSkuId,
            price: this.data.originalPrice,
            totalNum: this.data.originalTotalNum,
            num: 1
        });
    },
    chooseLevel: function(t) {
        var s = t.currentTarget.dataset.idx;
        this.setData({
            idx: s,
            skuId: this.data.typeList[s].id,
            price: this.data.typeList[s].price,
            totalNum: this.data.typeList[s].stock
        });
    },
    changeNum: function(t) {
        this.setData({
            num: t.detail.num
        });
    },
    addCart: function() {
        if (this.data.totalNum <= 0) wx.showToast({
            title: "亲，掌柜正在抓紧补货，先看看别的吧~",
            icon: "none"
        }); else {
            var s = this;
            t({
                url: a,
                method: "POST",
                bizParam: {
                    num: s.data.num,
                    skuId: s.data.skuId
                },
                success: function(t) {
                    wx.showToast({
                        title: "添加成功",
                        icon: "success"
                    }), s.getShopCartNum();
                },
                bizError: function(t) {
                    wx.showToast({
                        title: t.msg,
                        icon: "none"
                    });
                }
            });
        }
    },
    goShare: function() {
        wx.navigateTo({
            url: "/pages/share/share"
        });
    },
    goStore: function() {
        wx.reLaunch({
            url: "/pages/store/store"
        });
    },
    goShopCart: function() {
        wx.reLaunch({
            url: "/pages/shopCart/shopCart"
        });
    }
});