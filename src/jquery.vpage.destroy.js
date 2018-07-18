import WatchJS from 'melanke-watchjs';

const watch = WatchJS.watch;
const unwatch = WatchJS.unwatch;
const callWatchers = WatchJS.callWatchers;

(function($) {
    $.vpage.destroy = function() {
        unwatch($.vpage.storage, "currentHistoryModelName");
        $.vpage.helper.initStorage();
        $.vpage.isInit = false;
        return true;
    }
}(jQuery));