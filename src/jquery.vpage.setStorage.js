(function($) {
    // 改變當前倉儲設定 
    $.vpage.setStorage = function(params) {

        $.vpage.storage = $.extend($.vpage.storage, params);
        
    }
}(jQuery));