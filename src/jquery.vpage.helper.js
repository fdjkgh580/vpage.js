(function($) {
    $.vpage.helper = new function (){
        // 初始化倉儲
        this.initStorage = function() {
            $.vpage.storage = {
                // 記錄所有模型方法，如同路由
                models: {},

                // 當前 history 新模型的名稱與觸發的所有參數
                currentHistoryModelName: false, 
                currentHistoryVpageParams: {},

                // 當前 hash 新模型的名稱與觸發的所有參數
                currentHashModelName: false,
                currentHashVpageParams: {}
            }
        }

        /**
         * 轉換如 ?id=123 為 {id:123}
         */
        this.convertQueryStringToObject = function (str){
            var search = str.substring(1);
            var obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
            return obj;
        }


        /**
         * 從網址找到 vpage 所指定的模型名稱，使之觸發回呼。
         * 如果找不到，則忽略
         * 
         * @callback(allQueryObject)
         */
        this.loadHistoryFromQuery = function() {
            var allQueryObject = $.vpage.getUrlParams();
            var modelName = $.vpage.modelName(allQueryObject);

            if (modelName === null) {
                

                // 網址不存在 vpage 參數也不存在 Hash，那將預設
                if (window.location.hash === "") {

                    $.vpage.setStorage({
                        currentHistoryModelName: 'default',
                        currentHistoryVpageParams: {}
                    })

                }

                return false;
            }

            // modelName 是否存在
            $.vpage.existModel(modelName, function() {

                // 重新取得網址參數
                var urlParams = $.vpage.getUrlParams();

                // console.log('history is here')

                // 變更當前的模型名稱
                $.vpage.setStorage({
                    currentHistoryModelName: modelName,
                    currentHistoryVpageParams: urlParams
                })
            });
        }

        this.loadHash = function (){
            var hash = window.location.hash;
            // 如果沒有 Hash
            if (hash === "") return false;

            // 忽略第 0 個的 # 並分解
            var locationHashBox = hash.slice("1").split("/")

            // 若有，把定義路由 hash 的形式找出來
            var definedBox = _getHashRouter();

            var rBoxMatch;
            
            // 符合模型名稱的，拆解出每個字段
            $.each(definedBox, function (key, modelName){

                // 將定義的路由分解
                var splitBox = modelName.split("/");

                rBoxMatch = _matchRouterHash(modelName, splitBox, locationHashBox)

                // 如果不是匹配的模型名稱，繼續下一個
                if (rBoxMatch.matchModelName === false) return true;

                // 找到了
                return false;
            })

            // console.log('hash is here')

            // 觸發並傳遞參數
            $.vpage.setStorage({
                currentHashModelName: rBoxMatch.matchModelName,
                currentHashVpageParams: rBoxMatch.matchParams
            })

        }

        // 開始比對如 user/uid => user/123
        var _matchRouterHash = function (modelName, modelNameBox, locationHashBox){
            // console.log(modelName, modelNameBox, locationHashBox)
            var matchModelName = false;
            var matchParams = {};

            $.each(modelNameBox, function (key, seg){
                // 絕對不是這個項目所以跳離
                if (key == 0 && seg != locationHashBox[key]) return false;
                if (seg == locationHashBox[key]) return true;
                // console.log('index: '+key+'不同了')
                // 這個 key 是如 :var 參數嗎
                if (seg.indexOf(":") < 0) return false; // 代表也不是這個路由...
                // 代表變數就是這個值，例如 id = 123
                var paramName = seg.slice(1); // 去除 :
                matchParams[paramName] = locationHashBox[key];
                matchModelName = modelName;

                return true;
            })

            return {
                matchModelName: matchModelName,
                matchParams: matchParams
            }
        }


        // 取得路由指定的 hash 項目
        var _getHashRouter = function (){
            var hashRouterBox = [];
            $.each($.vpage.storage.models, function (modelName, fun){
                // 找模組名稱如果出現 / 那代表就是
                if (modelName.indexOf("/") < 0) return true;
                // 來到這裡的就是 hash 類型
                hashRouterBox.push(modelName)
            })
            return hashRouterBox;
        }

        // 瀏覽器上、下頁切換
        this.popstate = function() {
            var _this = this;
            window.onpopstate = function() {

                

                _this.loadHistoryFromQuery();

            }
        }

        this.hashchange = function (){
            window.onhashchange = function (){

                // 因為 modelName 如 'user/:uid' 在進行切換的時候並不會變動
                // 所以要預先設設置一份偽 modelName 作為變動概念
                $.vpage.setStorage({
                    currentHashModelName: '--autoSetForOnHashChange',
                    currentHashVpageParams: {}
                })

                $.vpage.helper.loadHash();

                // 代表上方沒有找到 HASH
                if ($.vpage.storage.currentHashModelName === '--autoSetForOnHashChange'){
                    $.vpage.setStorage({
                        currentHashModelName: 'noneHash',
                        currentHashVpageParams: {}
                    })
                }
            }
        }

        

        /**
         * 取得組合片段
         * @param  {array} getBox 指定要找的片段索引，例如 [1,2]
         * @param  {array} getBox 提供尋找的字串，不指定則使用 pathname
         * @return {string}       取得如 user/123
         */
        this.segments = function (getBox, searchStr){

            var str = searchStr === undefined 
                ? window.location.pathname
                : searchStr;

            var pathArray = str.split( '/' );
            var mix = [];

            $.each(getBox, function (key, val){

                if (pathArray[val] === undefined) return false;

                mix.push(pathArray[val])
            })

            return mix.join("/");
        }

    }
}(jQuery));