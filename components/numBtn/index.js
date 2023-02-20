Component({
    properties: {
        num: {
            type: Number,
            value: 0
        },
        totalNum: {
            type: Number,
            value: 0
        },
        total: {
            type: Number,
            value: 0
        }
    },
    data: {
        nav: 1,
        navImg: "/images/icon-order1.png",
        navPrice: 1
    },
    methods: {
        changeNum: function(t) {
            var e = t.currentTarget.dataset.type, n = this.properties.total, a = this.properties.totalNum, o = this.properties.num;
            "cut" == e ? o <= 1 ? wx.showToast({
                title: "数量低于范围",
                icon: "none"
            }) : (o -= 1, this.setData({
                num: o
            }), this.triggerEvent("changeNum", {
                num: o
            })) : n >= 50 ? wx.showToast({
                title: "当前订单的书籍总数已达上限，请分批下单！",
                icon: "none"
            }) : o >= a ? wx.showToast({
                title: "数量超出范围",
                icon: "none"
            }) : (o += 1, this.setData({
                num: o
            }), this.triggerEvent("changeNum", {
                num: o
            }));
        }
    }
});