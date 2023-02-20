var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../behaviors/zIndex"));

Component({
    behaviors: [ e.default ],
    externalClasses: [ "l-class", "l-mask-class" ],
    properties: {
        show: {
            type: Boolean,
            value: !1
        },
        opacity: {
            type: [ String, Number ],
            value: .4
        },
        zIndex: {
            type: Number,
            value: 99
        },
        center: {
            type: Boolean,
            value: !1
        },
        locked: {
            type: Boolean,
            value: !0
        },
        fullScreen: {
            type: String,
            value: ""
        },
        NavColor: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        doNothingMove: function() {},
        onMaskTap: function() {
            !0 !== this.data.locked && this.setData({
                show: !1
            }), this.triggerEvent("lintap", !0, {
                bubbles: !0,
                composed: !0
            });
        }
    },
    attached: function() {}
});