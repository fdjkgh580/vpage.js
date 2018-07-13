(function($) {
    /**
     * 從網址參數中取得模型名稱
     * @param  {object} allQueryObject 網址參數的物件
     * @return {string}                模型名稱
     */
    $.vpage.modelName = function (allQueryObject){
        
        // 尋找
        return (allQueryObject['vpage'] === undefined) 
            ? "default" 
            : allQueryObject['vpage'];
    }
}(jQuery));