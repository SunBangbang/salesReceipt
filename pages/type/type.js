var a = require("../../js/request.js").$http, t = require("../../js/config.js").urls.allType;

Page({
    data: {
        isOverShare: !1,
        banner: "",
        parentName: "",
        parentId: "",
        type: []
    },
    onLoad: function(e) {
        var n = this;
        a({
            url: t,
            method: "GET",
            success: function(a) {
                n.setData({
                    type: a,
                    banner: a[0].picUrl,
                    parentName: a[0].name,
                    parentId: a[0].id
                });
            }
        });
    },
    onShareAppMessage: function() {},
    changeNav: function(a) {
        var t = a.detail.activeKey, e = "", n = "";
        this.data.type.map(function(a) {
            a.id == t && (e = a.name, n = a.picUrl);
        }), this.setData({
            banner: n,
            parentName: e,
            parentId: t
        });
    },
    goTop: function(a) {
        var t = a.currentTarget.dataset.type, e = "/pages/top/top" + (t ? "?idx=" + t : "");
        wx.navigateTo({
            url: e
        });
    },
    goTypeList: function(a) {
        if (1 == a.currentTarget.dataset.type) {
            var t = {
                banner: this.data.banner,
                name: this.data.parentName,
                firstCateId: this.data.parentId
            };
            t = JSON.stringify(t), wx.navigateTo({
                url: "/pages/typeList/typeList?param=" + t
            });
        } else {
            t = {
                banner: this.data.banner,
                name: a.currentTarget.dataset.name,
                firstCateId: this.data.parentId,
                secondCateId: a.currentTarget.dataset.id
            };
            t = JSON.stringify(t), wx.navigateTo({
                url: "/pages/typeList/typeList?param=" + t
            });
        }
    }
});