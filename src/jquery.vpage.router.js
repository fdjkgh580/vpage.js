(function($) {

    /**
     * 當 history 沒有任何 ?vpage 那麼將會預設觸發 'default'
     * 若當 Hash 從有到無，將會觸發 'noneHash'
     * 
     */

    $.vpage.router = function(rules) {

        $.vpage.isInit = true;

        // 初始化倉儲
        $.vpage.helper.initStorage();

        // 初始化倉儲中的模型
        $.vpage.initModels(rules)

        // 監聽倉儲如果發生改變
        $.vpage.listenStorage();
        
        // 當網址有 vpage 相關參數，則觸發模型
        $.vpage.helper.loadHistoryFromQuery('onLoad');

        // 當網址有 Hash 的時候進行比對與觸發
        $.vpage.helper.loadHash('onLoad');
        
        $.vpage.helper.onPopState();

        $.vpage.helper.onHashChange();

    }
}(jQuery));