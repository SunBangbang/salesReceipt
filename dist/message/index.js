var e = require("../../@babel/runtime/helpers/objectSpread2"), t = {
    visible: !1,
    content: "",
    duration: 2,
    type: "default"
}, a = null;

Component({
    externalClasses: [ "i-class" ],
    data: e({}, t),
    methods: {
        handleShow: function(t) {
            var i = this, n = t.type, s = void 0 === n ? "default" : n, d = t.duration, l = void 0 === d ? 2 : d;
            this.setData(e(e({}, t), {}, {
                type: s,
                duration: l,
                visible: !0
            }));
            var o = 1e3 * this.data.duration;
            a && clearTimeout(a), 0 !== o && (a = setTimeout(function() {
                i.handleHide(), a = null;
            }, o));
        },
        handleHide: function() {
            this.setData(e({}, t));
        }
    }
});