var e = require("../../@babel/runtime/helpers/defineProperty"), t = require("../../dist/base/index").$Message, a = require("../../js/request.js").$http, i = require("../../js/config.js").urls.provinceList, s = require("../../js/config.js").urls.cityList, d = require("../../js/config.js").urls.countryList, r = require("../../js/config.js").urls.editAddress;

Page({
    data: {
        isOverShare: !1,
        id: "",
        name: "",
        phone: "",
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        countryId: "",
        countryName: "",
        address: "",
        detail: "",
        isDefault: !1,
        addressList: [],
        value: [ 0, 0, 0 ],
        isEmpty: !0,
        isPop: !1
    },
    onLoad: function(e) {
        var t = this;
        e.id && a({
            url: r + "/" + e.id,
            method: "GET",
            success: function(a) {
                t.setData({
                    id: e.id,
                    name: a.name,
                    phone: a.phone,
                    provinceId: a.provinceId,
                    provinceName: a.provinceName,
                    cityId: a.cityId,
                    cityName: a.cityName,
                    countryId: a.countryId ? a.countryId : "",
                    countryName: a.countryName ? a.countryName : "",
                    address: a.address,
                    detail: a.detailAddress,
                    isDefault: 1 == a.isDefault,
                    isEmpty: !1
                });
            }
        });
        var n = [];
        a({
            url: i,
            method: "GET",
            success: function(e) {
                n[0] = e, a({
                    url: s + e[0].id,
                    method: "GET",
                    success: function(e) {
                        n[1] = e, a({
                            url: d + e[0].id,
                            method: "GET",
                            success: function(e) {
                                n[2] = e, t.setData({
                                    addressList: n
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {},
    getInfo: function(t) {
        var a = t.currentTarget.dataset.key, i = t.detail.value;
        this.setData(e({}, a, i));
    },
    bindMultiPickerChange: function(e) {
        var t = e.detail.value, a = this.data.addressList, i = a[0][t[0]].name + a[1][t[1]].name + (a[2].length > 0 ? a[2][t[2]].name : "");
        this.setData({
            isEmpty: !1,
            value: t,
            provinceId: a[0][t[0]].id,
            provinceName: a[0][t[0]].name,
            cityId: a[1][t[1]].id,
            cityName: a[1][t[1]].name,
            countryId: a[2].length > 0 ? a[2][t[2]].id : "",
            countryName: a[2].length > 0 ? a[2][t[2]].name : "",
            address: i
        });
    },
    bindMultiPickerColumnChange: function(e) {
        var t = e.detail.column, i = e.detail.value, r = this, n = r.data.addressList;
        if (0 == t) {
            var c = n[0][i].id;
            a({
                url: s + c,
                method: "GET",
                success: function(e) {
                    n[1] = e, a({
                        url: d + e[0].id,
                        method: "GET",
                        success: function(e) {
                            n[2] = e, r.setData({
                                addressList: n
                            });
                        }
                    });
                }
            });
        } else if (1 == t) {
            c = n[1][i].id;
            a({
                url: d + c,
                method: "GET",
                success: function(e) {
                    n[2] = e, r.setData({
                        addressList: n
                    });
                }
            });
        }
    },
    bindSwitchChange: function(e) {
        var t = e.detail.value;
        this.setData({
            isDefault: t
        });
    },
    save: function() {
        var e = this, i = this.data.name.trim(), s = this.data.phone.trim(), d = this.data.isEmpty, n = this.data.detail.trim();
        if (i) if (s) if (11 != s.length) t({
            content: "手机号码格式错误",
            type: "error"
        }); else if (d) t({
            content: "请选择省市区",
            type: "error"
        }); else if (n) {
            var c = {
                name: i,
                mobile: s,
                phone: s,
                provinceId: e.data.provinceId,
                provinceName: e.data.provinceName,
                cityId: e.data.cityId,
                cityName: e.data.cityName,
                countryId: e.data.countryId,
                countryName: e.data.countryName,
                address: e.data.address,
                detailAddress: e.data.detail,
                isDefault: e.data.isDefault ? 1 : 0,
                zipCode: "000000"
            }, o = "";
            e.data.id ? (c.id = e.data.id, o = "PUT") : o = "POST", a({
                url: r,
                method: o,
                bizParam: c,
                success: function(t) {
                    e.setData({
                        isPop: !0
                    });
                }
            });
        } else t({
            content: "请填写详细地址",
            type: "error"
        }); else t({
            content: "请填写手机",
            type: "error"
        }); else t({
            content: "请填写姓名",
            type: "error"
        });
    },
    closePop: function() {
        wx.navigateBack();
    }
});