import WatchJS from 'melanke-watchjs';

const watch = WatchJS.watch;
const unwatch = WatchJS.unwatch;
const callWatchers = WatchJS.callWatchers;

(function($) {
    // 監聽一旦設定當前的模型名稱時，會觸發的回呼
    $.vpage.listenStorage = function (){

        watch($.vpage.storage, "currentHistoryModelName", function(key, action, setModelName, prevModelName) {
            
            $.vpage.callModel(setModelName, $.vpage.storage.currentHistoryVpageParams)

        });


        watch($.vpage.storage, "currentHashModelName", function(key, action, setModelName, prevModelName) {
            
            $.vpage.callModel(setModelName, $.vpage.storage.currentHashVpageParams)

        });
    }
}(jQuery));