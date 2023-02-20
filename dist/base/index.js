function e(e) {
    var o = getCurrentPages(), t = o[o.length - 1].selectComponent(e);
    return t || (console.error("无法找到对应的组件，请按文档说明使用组件"), null);
}

function o(o) {
    var t = o.selector;
    e(void 0 === t ? "#toast" : t).handleShow(o);
}

o.hide = function() {
    var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#toast", t = e(o);
    t.handleHide();
}, module.exports = {
    $Toast: o,
    $Message: function(o) {
        var t = o.selector;
        e(void 0 === t ? "#message" : t).handleShow(o);
    }
};