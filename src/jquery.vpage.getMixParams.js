(function($) {
    /**
     * 混合模型所需要的參數
     * @param   modelName  模型名稱
     * @param   customParams 使用者自訂參數
     */
    $.vpage.getMixParams = function(modelName, customParams) {
        var vpageParams = {
            vpage: modelName,
        }
        $.extend(true, vpageParams, customParams);
        return vpageParams;
    }
}(jQuery));