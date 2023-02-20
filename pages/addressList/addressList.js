var t = require("../../js/request.js").$http, e = require("../../js/config.js").urls.addressList, s = require("../../js/config.js").urls.editAddress;

Page({
    data: {
        isOverShare: !1,
        source: "",
        list: [],
        isPop: !1,
        deleteId: ""
    },
    onLoad: function(t) {
        t.source && this.setData({
            source: t.source
        });
    },
    onShow: function() {
        this.getList();
    },
    onShareAppMessage: function() {},
    getList: function() {
        var s = this;
        t({
            url: e,
            method: "GET",
            success: function(t) {
                s.setData({
                    list: t
                });
            }
        });
    },
    chooseItem: function(t) {
        var e = t.currentTarget.dataset.item, s = getCurrentPages(), i = s[s.length - 2];
        this.data.source && (i.setData({
            addressInfo: e,
            isPop: !1,
            showAddress: !1
        }), wx.navigateBack({
            delta: 1
        }));
    },
    doDefault: function(e) {
        var i = e.currentTarget.dataset.item;
        i.isDefault = 1;
        var a = this;
        t({
            url: s,
            method: "PUT",
            bizParam: i,
            success: function(t) {
                wx.showToast({
                    title: "修改成功",
                    icon: "success"
                }), a.getList();
            }
        });
    },
    doEdit: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/addressEdit/addressEdit" + (e ? "?id=" + e : "")
        });
    },
    doDelete: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            isPop: !0,
            deleteId: e
        });
    },
    closePop: function() {
        this.setData({
            isPop: !1,
            deleteId: ""
        });
    },
    confirmDelete: function() {
        var e = this;
        t({
            url: s + "/" + e.data.deleteId,
            method: "DELETE",
            success: function(t) {
                wx.showToast({
                    title: "删除成功",
                    icon: "success"
                }), e.getList();
            },
            bizError: function(t) {
                wx.showToast({
                    title: t.msg,
                    icon: "none"
                });
            },
            complete: function(t) {
                e.setData({
                    isPop: !1,
                    deleteId: ""
                });
            }
        });
    }
});