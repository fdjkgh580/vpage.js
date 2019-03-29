(function($) {

    $.vpage.always = function(alwaysCallback) {
        $.vpage.setStorage({
            alwaysCallback: alwaysCallback
        });

        // 前方是否已被設定需要觸發了？
        if ($.vpage.isDelayTriggerAlways === true) {
            $.vpage.storage.alwaysCallback.call(this, $.vpage.storage);
        }
    }
}(jQuery));