Component({
    properties: {
        showTop: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        goTop: function(o) {
            wx.pageScrollTo ? wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            }) : wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新版本后重试"
            });
        }
    }
});