(function($) {
    /**
     * @param   storage
     * @param   url
     * @param   title
     */
    $.vpage.historyPush = function(param) {
        history.pushState(param.storage, param.title, param.url);
    }
}(jQuery));