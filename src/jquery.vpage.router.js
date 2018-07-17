(function($) {

    $.vpage.router = function(rules) {

        $.vpage.isInit = true;

        // 初始化模型
        $.vpage.initModels(rules)

        // 監聽倉儲如果發生改變
        $.vpage.listenStorage();
        
        // 當網址有 vpage 相關參數，則觸發模型
        $.vpage.helper.triggerModelFromQuery();

        // 監聽上、下頁切換
        $.vpage.helper.popstate();
    }
}(jQuery));