(function($) {
    // 改變當前倉儲設定 
    $.vpage.setStorage = function(params) {

        // console.log([
        //     "setStorage Before:::", 
        //     params, 
        //     $.vpage.storage,
        // ])


        $.vpage.storage = $.extend($.vpage.storage, params);


        // console.log([
        //     "setStorage After:::", 
        //     params, 
        //     $.vpage.storage 
        // ])

    }
}(jQuery));