(function($) {
    $.vpage.getMixParams = function(modelName, userParams) {
        var vpageParams = {
            vpage: modelName,
        }
        $.extend(true, vpageParams, userParams);
        return vpageParams;
    }
}(jQuery));