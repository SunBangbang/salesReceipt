Component({
    properties: {
        list: {
            type: Array,
            value: []
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