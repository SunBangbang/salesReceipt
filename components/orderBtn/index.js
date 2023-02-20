Component({
    properties: {
        nav: {
            type: String,
            value: "0"
        }
    },
    data: {},
    methods: {
        changeNav: function(t) {
            var e = t.currentTarget.dataset.idx;
            this.setData({
                nav: e
            }), this.triggerEvent("getOrder", {
                order: e
            });
        }
    }
});