Component({
    properties: {
        data: Object,
        isWater: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        goBookDetail: function(t) {
            var e = t.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/pages/bookDetail/bookDetail?id=" + e
            });
        }
    }
});