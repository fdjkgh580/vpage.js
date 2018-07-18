(function($) {
    /**
     * 使用者要前往的模型
     * @param  {string} modelName  模型名稱
     * @param  {object} *customParams 使用者自訂夾帶的參數
     * @param  {string} *path 路徑
     */
    $.vpage.goto = function(modelName, customParams, path) {

        if ($.vpage.isInit === false) return false;

        // 模型名稱是否已經存在？
        var isExist = $.vpage.existModel(modelName, function (){

            // 混合模型所需要的參數
            var currentHistoryVpageParams = $.vpage.getMixParams(modelName, customParams);

            // 轉換成網址的參數
            var queryString = $.param(currentHistoryVpageParams);

            // 添加到歷史紀錄
            $.vpage.historyPush({
                storage: currentHistoryVpageParams,
                url: path + '?' + queryString,
                title: currentHistoryVpageParams.title
            })

            // 改變當前倉儲設定
            $.vpage.setStorage({
                currentHistoryModelName: modelName,
                currentHistoryVpageParams: currentHistoryVpageParams
            })

        })

        if (isExist === false) return false;    

        return true;
    }
}(jQuery));