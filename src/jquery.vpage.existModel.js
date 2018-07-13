(function($) {
    // 判斷指定的模型名稱是否已經存在
    $.vpage.existModel = function (modelName, callback){
        if ($.vpage.storage.models[modelName] === undefined) return false;
        callback.call(this);
    }
}(jQuery));