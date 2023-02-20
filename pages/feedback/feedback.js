var t = require("../../dist/base/index").$Message, e = require("../../js/request.js").$http, a = require("../../js/config.js").urls.feedback, i = require("../../js/config.js").urls.feedbackType, s = require("../../js/config.js").urls.feedbackImg;

Page({
    data: {
        isOverShare: !1,
        isEmpty: !0,
        index: 0,
        type: [],
        typeId: "",
        text: "",
        len: 0,
        img: [],
        imgs: [],
        isReady: !0,
        isPop: !1
    },
    onLoad: function(t) {
        var a = this;
        e({
            url: i,
            method: "GET",
            success: function(t) {
                a.setData({
                    type: t
                });
            }
        });
    },
    onShareAppMessage: function() {},
    getType: function(t) {
        var e = parseInt(t.detail.value), a = this.data.type[e].dictValue;
        this.setData({
            isEmpty: !1,
            index: t.detail.value,
            typeId: a
        });
    },
    getText: function(t) {
        this.setData({
            text: t.detail.value,
            len: t.detail.value.length
        });
    },
    getImg: function() {
        var t = this, e = this.data.img.length;
        wx.chooseImage({
            count: 3 - e,
            success: function(e) {
                var a = t.data.img, i = e.tempFilePaths;
                a = a.concat(i), t.setData({
                    img: a
                });
            }
        });
    },
    deleteImg: function(t) {
        var e = t.currentTarget.dataset.idx, a = this.data.img;
        a.splice(e, 1), this.setData({
            img: a
        });
    },
    showImg: function(t) {
        var e = t.currentTarget.dataset.img, a = this.data.img;
        wx.previewImage({
            current: e,
            urls: a
        });
    },
    getSubmit: function() {
        if (!this.data.isReady) return !1;
        this.setData({
            isReady: !1
        }), this.data.isEmpty ? (t({
            content: "请选择反馈类型",
            type: "error"
        }), this.setData({
            isReady: !0
        })) : this.data.text ? this.data.img.length > 0 ? this.uploadImg(0) : this.confirmSubmit() : (t({
            content: "请填写反馈说明",
            type: "error"
        }), this.setData({
            isReady: !0
        }));
    },
    confirmSubmit: function() {
        var i = this, s = {
            feedType: i.data.typeId,
            content: i.data.text,
            imgs: i.data.imgs
        };
        e({
            url: a,
            method: "POST",
            bizParam: s,
            success: function(t) {
                i.setData({
                    isPop: !0
                });
            },
            bizError: function(e) {
                t({
                    content: e.msg,
                    type: "error"
                });
            },
            complete: function(t) {
                i.setData({
                    isReady: !0
                });
            }
        });
    },
    uploadImg: function(t) {
        var e = this;
        wx.showLoading({
            title: "图片上传中",
            mask: !0
        }), wx.uploadFile({
            url: s,
            filePath: e.data.img[t],
            name: "file",
            success: function(t) {
                var a = "https://mini.cainiaoshoushu.com" + JSON.parse(t.data).fileName, i = e.data.imgs;
                i.push(a), e.setData({
                    imgs: i
                });
            },
            complete: function(a) {
                ++t < e.data.img.length ? e.uploadImg(t) : (wx.hideLoading(), e.confirmSubmit());
            }
        });
    },
    closePop: function() {
        wx.navigateBack();
    }
});