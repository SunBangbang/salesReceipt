var e = require("./config.js").urls;

var o = {
    $http: function(o) {
        if (o) if (o.url) if (o.method) {
            o.bizParam || (o.bizParam = {});
            var t = getApp().getUser();
            t && (o.bizParam.userId = t.userId, o.bizParam.customerId = t.userId, o.bizParam.token = t.token);
            var r = {
                url: o.url,
                success: function(t) {
                    200 == t.statusCode ? 200 == t.data.code ? (o.success && (o.url == e.shareCode ? o.success(t.data) : o.success(t.data.data)), 
                    o.complete && o.complete(!0)) : (o.bizError && o.bizError(t.data), o.complete && o.complete(!1)) : (o.error && o.error(t), 
                    o.complete && o.complete(!1));
                },
                fail: function(e) {
                    o.error && o.error(e), o.complete && o.complete(!1);
                },
                complete: function(e) {}
            };
            r.method = o.method, r.data = o.bizParam, o.url == e.slientLogin ? r.header = {
                "Content-Type": "application/json;charset=UTF-8"
            } : r.header = {
                "Content-Type": "application/json;charset=UTF-8",
                userId: t ? t.userId : "",
                token: t ? t.token : "",
                AuthorizationMini: t ? t.token : ""
            }, wx.request(r);
        } else console.info("method must not be null"); else console.info("url must not be null"); else console.info("handle is null");
    }
};

module.exports = o;