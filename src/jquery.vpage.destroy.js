(function($) {
    $.vpage.destroy = function() {
        unwatch($.vpage.storage, "currentModelName");
        $.vpage.helper.initStorage();
        return true;
    }
}(jQuery));