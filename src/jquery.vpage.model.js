(function($) {
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