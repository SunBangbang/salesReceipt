var c = "http://tyy.qti.cn", o = {
    urls: {
        slientLogin: "".concat(c, "/user/wxlogin"),
        bannerList: "".concat(c, "/mini/bannerList"),///mall/bannerList
        noticeList: "".concat(c, "/mini/notice"),//mall/notice/list
        storeType: "".concat(c, "/mini/categoryRecommend"),// mall/category/recommend
        bookList: "".concat(c, "/mini/bookList"),//mall/goods/list
        hotKey: "".concat(c, "/mall/browse/hostSearchRecord"),
        allType: "".concat(c, "/mall/goods/firstAndSecondCategory"),
        bookDetail: "".concat(c, "/mini/bookDetail"),//mall/goods/
        shopCartTotal: "".concat(c, "/shoppingCart/count"),///mall/shoppingCart/count
        addShopCart: "".concat(c, "/mall/shoppingCart"),
        editShopCart: "".concat(c, "/mall/shoppingCart/num"),
        shopCartInfo: "".concat(c, "/mall/shoppingCart/my"),
        shopOrderMoney: "".concat(c, "/mall/order/settlement"),
        shopOrder: "".concat(c, "/mall/order/submit"),
        payOrder: "".concat(c, "/mall/pay/applet/"),
        bookInfo: "".concat(c, "/mini/isbn?isbn="),///mini/book/isbn/
        bookLimit: "".concat(c, "/mini/config/restriction"),
        address: "".concat(c, "/mini/address/user/"),
        addressEdit: "".concat(c, "/mini/address"),
        order: "".concat(c, "/mini/order/"),
        shipping: "".concat(c, "/mini/order/shipping/"),
        shopOrderNum: "".concat(c, "/order/count?userId=1"),//
        shopOrderList: "".concat(c, "/mall/order/my"),
        editOrder: "".concat(c, "/mall/order/"),
        orderNum: "".concat(c, "/mini/order/num/"),
        orderList: "".concat(c, "/mini/order/user/"),
        orderShare: "".concat(c, "/mini/order/share/"),
        shopOrderShare: "".concat(c, "/mall/order/share/"),
        balance: "".concat(c, "/user/user?userId=1"),///mini/account/user/
        balanceLog: "".concat(c, "/mini/account/log/"),
        cash: "".concat(c, "/mini/account/withdraw"),
        couponList: "".concat(c, "/mall/coupon/all"),
        getCoupon: "".concat(c, "/mall/coupon/receive"),
        myCoupon: "".concat(c, "/mall/coupon/my"),
        shareTotal: "".concat(c, "/mini/proxy/my"),
        shareCode: "".concat(c, "/mini/proxy/share"),
        shareList: "".concat(c, "/mini/proxy/income"),
        addressList: "".concat(c, "/mall/address/my"),
        editAddress: "".concat(c, "/mall/address"),
        provinceList: "".concat(c, "/mall/address/provinces"),
        cityList: "".concat(c, "/mall/address/city/"),
        countryList: "".concat(c, "/mall/address/district/"),
        feedbackType: "".concat(c, "/mini/user/feedback/type"),
        feedbackImg: "".concat(c, "/mini/upload"),
        feedback: "".concat(c, "/mini/user/feedback"),
        msgTemp: "".concat(c, "/mini/message/tempIds"),
        getActivityHelp: "".concat(c, "/mall/marketing/activity"),
        activityHelpDetail: "".concat(c, "/mall/marketing/activity/help/"),
        joinActivityHelp: "".concat(c, "/mall/marketing/activity/join/")
    },
    consts: {
        CN_NOT_FIRST: "cn_not_first",
        CN_USER_INFO: "cn_user_info",
        CN_HISTORY_KEY: "cn_history_key",
        CN_SELECTED_CART: "cn_selected_cart",
        CN_IS_TIP: "cn_is_tip",
        CN_SELLING_CART: "cn_selling_cart",
        CN_PROXY_NO: "cn_proxy_no",
        CN_PROXY_CODE: "cn_proxy_code"
    }
};

module.exports = o;