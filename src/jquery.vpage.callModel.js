(function($) {
    /**
     * 呼叫模型的方法。
     * 注意！不應該直接觸發，因為這是交給 watch 當 storage.currentHistoryModelName 被改變時，
     * 所呼叫的方法。
     * 
     * @param  {[type]} modelName [description]
     * @param  {[type]} params [description]
     */
    $.vpage.callModel = function(modelName, params) {

        // 如果呼叫的模型名稱不存在
        if ($.vpage.storage.models[modelName] === undefined) return false;
        
        $.vpage.storage.models[modelName].call(this, params);
    }
}(jQuery));