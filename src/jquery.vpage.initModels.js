(function($) {
    /**
     * 初始化模型
     * 預設的起始觸發叫做 default，可由使用者自行定義
     * 
     * @param object rules 
     */
    $.vpage.initModels = function (rules){

        // 預設的起始觸發叫做 default，可由使用者自行定義
        $.vpage.storage.models = $.extend({
            default: function() {

            }
        }, rules);
        
    }
}(jQuery));