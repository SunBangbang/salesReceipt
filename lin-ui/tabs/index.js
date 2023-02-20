var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/objectSpread2"), a = e(require("../behaviors/scrollCenter"));

Component({
    behaviors: [ a.default ],
    externalClasses: [ "l-class-tabs", "l-class-header", "l-class-active", "l-class-content", "l-class-inactive", "l-class-line", "l-class-tabimage", "l-class-header-line", "l-class-icon", "l-tabs-class", "l-header-class", "l-active-class", "l-content-class", "l-inactive-class", "l-line-class", "l-tabimage-class", "l-header-line-class", "l-icon-class", "l-tabpanel-class", "l-badge-class" ],
    relations: {
        "../tabpanel/index": {
            type: "child",
            linked: function() {
                this.initTabs();
            }
        }
    },
    options: {
        multipleSlots: !0
    },
    properties: {
        activeKey: {
            type: String,
            value: ""
        },
        placement: {
            type: String,
            value: "top"
        },
        animated: Boolean,
        swipeable: Boolean,
        scrollable: Boolean,
        hasLine: {
            type: Boolean,
            value: !0
        },
        animatedForLine: Boolean,
        activeColor: {
            type: String,
            value: "#1DC4AB"
        },
        inactiveColor: {
            type: String,
            value: "#B5B5B5"
        },
        equalWidth: {
            type: Boolean,
            value: !0
        },
        contentHeight: Number
    },
    data: {
        tabList: [],
        currentIndex: 0,
        transformX: 0,
        transformY: 0
    },
    observers: {
        activeKey: function(e) {
            var t = this;
            if (e) {
                var a = this.data.tabList.findIndex(function(t) {
                    return t.key === e;
                });
                this.setData({
                    currentIndex: a
                }, function() {
                    t.data.scrollable && t.queryMultipleNodes();
                });
            }
        }
    },
    ready: function() {
        this.initTabs();
    },
    methods: {
        initTabs: function() {
            var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.activeKey, n = this.getRelationNodes("../tabpanel/index");
            if (n.length > 0) {
                var i = a, l = this.data.currentIndex, s = n.map(function(e, n) {
                    return i = a || 0 !== n ? i : e.data.key, l = e.data.key === i ? n : l, t({}, e.data);
                });
                this.setData({
                    tabList: s,
                    activeKey: i,
                    currentIndex: l
                }, function() {
                    e.data.scrollable && e.queryMultipleNodes();
                });
            }
        },
        swiperChange: function(e) {
            var t = e.detail, a = t.source, n = t.current;
            if ("touch" === a) {
                var i = n, l = this.data.tabList[n].key;
                this._setChangeData({
                    activeKey: l,
                    currentIndex: i
                });
            }
        },
        handleChange: function(e) {
            var t = e.currentTarget.dataset.key, a = e.currentTarget.dataset.index;
            this._setChangeData({
                activeKey: t,
                currentIndex: a
            });
        },
        _setChangeData: function(e) {
            var t = this, a = e.activeKey, n = e.currentIndex;
            this.setData({
                activeKey: a,
                currentIndex: n
            }, function() {
                t.data.scrollable && t.queryMultipleNodes();
            }), this.triggerEvent("linchange", {
                activeKey: a,
                currentIndex: n
            });
        }
    }
});