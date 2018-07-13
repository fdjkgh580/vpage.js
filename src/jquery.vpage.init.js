(function($) {
    $.vpage = {}
    // 只有為 true 的時候，才有辦法進行程序
    $.vpage.isInit = false;
    // 倉儲
    $.vpage.storage = {}
    
    $.vpage.init = function(rule) {
        // 預設的起始觸發叫做 default，可由使用者自行定義
        rule = $.extend({
            default: function() {}
        }, rule);
        $.vpage.storage.models = rule;
        // 設定新的模型名稱
        watch($.vpage.storage, "currentModelName", function(key, action, setModelName, prevModelName) {
            $.vpage.callModel(setModelName)
        });
        $.vpage.helper.triggerModelFromQuery();
        $.vpage.helper.popstate();
    }
}(jQuery));