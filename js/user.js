Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e, r = require("../@babel/runtime/helpers/classCallCheck"), t = require("../@babel/runtime/helpers/createClass"), s = require("./config.js").consts, n = function() {
    function n() {
        if (r(this, n), e) return e;
        e = this;
    }
    return t(n, [ {
        key: "restore",
        value: function() {
            var e = wx.getStorageSync(s.CN_NOT_FIRST);
            this.user = !!e && JSON.parse(wx.getStorageSync(s.CN_USER_INFO));
        }
    }, {
        key: "save",
        value: function(e) {
            wx.setStorageSync(s.CN_USER_INFO, JSON.stringify(e)), this.user = e;
        }
    }, {
        key: "getUser",
        value: function() {
            return this.user;
        }
    }, {
        key: "isLogin",
        value: function() {
            return !!this.user;
        }
    }, {
        key: "updateUserInfo",
        value: function(e) {
            var r = this;
            post({
                url: updateInfoUrl,
                bizParam: {
                    avatar: e.avatarUrl,
                    nick_name: e.nickName,
                    gender: e.gender
                },
                success: function(e) {
                    r.save(e.user);
                }
            });
        }
    } ]), n;
}();

exports.default = n;