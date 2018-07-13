(function($) {
    /**
     * 使用者要前往的模型
     * @param  {string} modelName  模型名稱
     * @param  {object} customParams 使用者自訂夾帶的參數
     */
    $.vpage.goto = function(modelName, customParams) {

        if ($.vpage.isInit === false) return false;

        // 模型名稱是否已經存在？
        var isExist = $.vpage.existModel(modelName, function (){

            // 混合模型所需要的參數
            var vpageParams = $.vpage.getMixParams(modelName, customParams);

            // 轉換成網址的參數
            var queryString = $.param(vpageParams);

            // 添加到歷史紀錄
            $.vpage.historyPush({
                storage: vpageParams,
                url: '?' + queryString,
                title: vpageParams.title
            })

            // 改變當前倉儲設定
            $.vpage.setStorage({
                currentModelName: modelName,
                vpageParams: vpageParams
            })

        })

        if (isExist === false) return false;    

        return true;
    }
}(jQuery));