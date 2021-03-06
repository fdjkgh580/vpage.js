(function($) {

    $.vpage = {

        version: '2.4.0',

        // 只有為 true 的時候，才有辦法進行程序
        isInit: false,
        
        // 倉儲，當初始化之後，任何改變 storage 的行為，都不可直接指定，
        // 務必需要透過 $.vpage.setStorage() 指定
        // storage 物件的預設名稱，參考 $.vpage.helper.initStorage()
        storage: {},

        // 提供是否延遲觸發 always() 的標記
        isDelayTriggerAlways: false,
    }

    
    $.vpage.init = function() {
        $.vpage.listenDom();
    }

}(jQuery));