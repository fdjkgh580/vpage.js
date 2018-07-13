(function($) {
    $.vpage = {}
    // 只有為 true 的時候，才有辦法進行程序
    $.vpage.isInit = false;
    // 倉儲
    $.vpage.storage = {}
    // 初始化倉儲
    var _initStorage = function() {
        $.vpage.storage = {
            // 記錄所有模型方法，如同路由
            models: {},
            // 設定新模型的名稱
            currentModelName: false,
            // 當前觸發的所有參數 
            vpageParams: {}
        }
    }


    /**
     * 從網址找到 vpage 所指定的模型名稱，使之觸發回呼。
     * 如果找不到，則回呼 default
     * 
     * @callback(allQueryObject)
     */
    var _triggerModelFromQuery = function() {
        var allQueryObject = $.vpage.getUrlParams();
        
        var modelName = (allQueryObject['vpage'] === undefined) 
            ? "default"
            : allQueryObject['vpage'];

        // modelName 是否存在
        $.vpage.existModel(modelName, function (){
            $.vpage.storage.models[modelName].call(this, allQueryObject);
        });

    }
    // 瀏覽器上、下頁切換
    var _popstate = function() {
        window.onpopstate = function() {
            var urlParams = $.vpage.getUrlParams();
            //如果網址不存在 vpage 參數
            if (urlParams.vpage === undefined) {
                $.vpage.storage.currentModelName = 'default';
                return true;
            }
            $.vpage.storage.currentModelName = urlParams.vpage;
        }
    }
    // 判斷指定的模型名稱是否已經存在
    $.vpage.existModel = function (modelName, callback){
        if ($.vpage.storage.models[modelName] === undefined) return false;
        callback.call(this);
    }
    /**
     * @param   storage
     * @param   url
     * @param   title
     */
    $.vpage.historyPush = function(param) {
        history.pushState(param.storage, param.title, param.url);
    }
    $.vpage.getMixParams = function(modelName, userParams) {
        var vpageParams = {
            vpage: modelName,
        }
        $.extend(true, vpageParams, userParams);
        return vpageParams;
    }
    // 取得網址的 get 參數，例如 ?
    $.vpage.getUrlParams = function(key) {
        var vars = {},
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return !key ? vars : vars[key];
    }
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
        _triggerModelFromQuery();
        _popstate();
    }
    $.vpage.destroy = function() {
        unwatch($.vpage.storage, "currentModelName");
        _initStorage();
        return true;
    }
    // 呼叫方法
    $.vpage.callModel = function(modelName, urlParams) {
        if ($.vpage.storage.models[modelName] === undefined) return false;
        // 重新取得網址參數
        var urlParams = $.vpage.getUrlParams();
        $.vpage.storage.models[modelName].call(this, urlParams);
    }
    $.vpage.model = function(modelName, userParams) {
        var vpageParams = $.vpage.getMixParams(modelName, userParams);
        var urlParams = $.param(vpageParams);
        $.vpage.historyPush({
            storage: vpageParams,
            url: '?' + urlParams,
            title: vpageParams.title
        })
        $.vpage.storage.currentModelName = modelName;
        $.vpage.storage.vpageParams = vpageParams;
    }
}(jQuery));