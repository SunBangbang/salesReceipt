var e = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(t) {
        var r = t.getFullYear(), n = t.getMonth() + 1, u = t.getDate(), o = t.getHours(), s = t.getMinutes(), a = t.getSeconds();
        return [ r, n, u ].map(e).join("/") + " " + [ o, s, a ].map(e).join(":");
    },
    formatTimeTwo: function(t, r) {
        var n = [ "Y", "M", "D", "h", "m", "s" ], u = [];
        for (var o in t = new Date(1e3 * t), u.push(t.getFullYear()), u.push(e(t.getMonth() + 1)), 
        u.push(e(t.getDate())), u.push(e(t.getHours())), u.push(e(t.getMinutes())), u.push(e(t.getSeconds())), 
        u) r = r.replace(n[o], u[o]);
        return r;
    }
};