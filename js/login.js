var e = new (require("../@babel/runtime/helpers/interopRequireDefault")(require("./user.js")).default)(), s = require("./config.js").urls.slientLogin, r = require("./request.js").$http, t = require("./config.js").consts;

var i = {
    slientLogin: function(i, u) {
        wx.login({
            success: function(c) {
                if (c.code) {
                    var o = {
                        code: c.code
                    };
                    i && (o.fullUserInfo = i);
                    var n = wx.getStorageSync(t.CN_PROXY_NO);
                    console.log(n,9999)
                    n && (o.inviteNo = n), r({
                        url: s,
                        method: "POST",
                        bizParam: o,
                        success: function(s) {
                            wx.setStorageSync(t.CN_NOT_FIRST, !0), e.save(s), u && u.success && u.success(s), 
                            u && u.complete && u.complete(!0);
                        }
                    });
                }
            }
        });
    }
};

module.exports = i;