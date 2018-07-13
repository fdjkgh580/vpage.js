(function($) {
    $.vpage.helper = new function (){
        // 初始化倉儲
        this.initStorage = function() {
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
        this.triggerModelFromQuery = function() {
            var allQueryObject = $.vpage.getUrlParams();
            var modelName = (allQueryObject['vpage'] === undefined) ? "default" : allQueryObject['vpage'];
            // modelName 是否存在
            $.vpage.existModel(modelName, function() {
                $.vpage.storage.models[modelName].call(this, allQueryObject);
            });
        }
        // 瀏覽器上、下頁切換
        this.popstate = function() {
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
    }
}(jQuery));