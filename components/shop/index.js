Component({
    properties: {
        showShop: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        goShopCart: function() {
            wx.reLaunch({
                url: "/pages/shopCart/shopCart"
            });
        }
    }
});