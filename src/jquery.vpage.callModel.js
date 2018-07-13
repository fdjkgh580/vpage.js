(function($) {
    // 呼叫方法
    $.vpage.callModel = function(modelName, urlParams) {
        if ($.vpage.storage.models[modelName] === undefined) return false;
        // 重新取得網址參數
        var urlParams = $.vpage.getUrlParams();
        $.vpage.storage.models[modelName].call(this, urlParams);
    }
}(jQuery));