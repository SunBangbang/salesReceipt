Component({
    properties: {
        width: {
            type: String,
            value: "690rpx"
        },
        color: {
            type: String,
            value: "#f8f8f8"
        },
        showRightIcon: {
            type: Boolean,
            value: !1
        },
        key: {
            type: String,
            value: ""
        }
    },
    data: {},
    lifetimes: {
        attached: function() {}
    },
    methods: {
        goSearch: function() {
            wx.navigateTo({
                url: "/pages/search/search?key=" + this.data.key
            });
        },
        goType: function() {
            wx.navigateTo({
                url: "/pages/type/type"
            });
        }
    }
});