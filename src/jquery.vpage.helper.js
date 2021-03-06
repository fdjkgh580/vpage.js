(function($) {
    $.vpage.helper = new function (){
        // 初始化倉儲
        this.initStorage = function() {
            $.vpage.storage = {
                // 記錄所有模型方法，如同路由
                models: {},

                // 讀取的類型，判斷是頁面載入或是上下頁面切換 onLoad | onPop
                triggerType: null, 

                // 當前 history 新模型的名稱與觸發的所有參數
                currentHistoryModelName: false, 
                currentHistoryVpageParams: {},

                // 當前 hash 新模型的名稱與觸發的所有參數
                currentHashModelName: false,
                currentHashVpageParams: {},

                // 每次變動 router 都會觸發的方法
                alwaysCallback: function () {},
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
         * 如果找不到，則預設
         * @param  {string} triggerType onLoad | onPop
         * @callback(allQueryObject)
         */
        this.loadHistoryFromQuery = function(triggerType) {
            var _this = this;
            var allQueryObject = $.vpage.getUrlParams();
            var modelName = $.vpage.modelName(allQueryObject);

            // console.log("--->", modelName, window.location.hash)
            if (modelName === null) {

                $.vpage.setStorage({
                    currentHistoryModelName: 'default',
                    currentHistoryVpageParams: {},
                    triggerType: triggerType
                })

                // 因為一開始就載入，若外部指定 always() 我們必須設定延遲觸發
                if ($.vpage.isDelayTriggerAlways === false) {
                    $.vpage.isDelayTriggerAlways = true;
                }
                else {
                    // console.log('@@@');
                    // $.vpage.storage.alwaysCallback.call(_this, $.vpage.storage);
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
                    currentHistoryVpageParams: urlParams,
                    triggerType: triggerType
                })

                $.vpage.storage.alwaysCallback.call(_this, $.vpage.storage);
            });
        }

        /**
         * @param  {string} triggerType onLoad | onPop
         */
        this.loadHash = function (triggerType){
            var rBoxMatch;

            var hash = window.location.hash;

            // 如果沒有 Hash
            if (hash === "") {
                
                $.vpage.setStorage({
                    currentHashModelName: 'noneHash',
                    currentHashVpageParams: {},
                    triggerType: triggerType
                })

                return false;
            }

            // 分解符號 /
            var locationHashBox = hash.split("/");

            // 總共的數量
            var totalHashSeg = locationHashBox.length;

            // 若有，把定義路由 hash 的形式找出來
            var definedBox = _getHashRouter();
            // console.log($.inArray(hash, definedBox), hash, definedBox);


            // 先比對是否有完全相符合，代表不使用參數，例如 url: #home, router 指定 #home
            if ($.inArray(hash, definedBox) > -1) {
                var matchModelName = hash;

                // // 觸發並傳遞參數
                $.vpage.setStorage({
                    currentHashModelName: matchModelName,
                    currentHashVpageParams: {},
                    triggerType: triggerType
                })
            }
            // 不代參數的網址與路由，若沒有完全匹配的再逐一判斷
            else {

                // 符合模型名稱的，拆解出每個字段
                var eachval = $.each(definedBox, function (key, modelName){

                    // 將定義的路由分解
                    var splitBox = modelName.split("/");

                    rBoxMatch = _matchRouterHash(modelName, splitBox, locationHashBox, totalHashSeg);

                    // 如果不是匹配的模型名稱，繼續下一個
                    if (rBoxMatch.matchModelName === false) return true;

                    // 找到了
                    return false;
                })

                // 如果全部比對都沒有
                if (rBoxMatch.matchModelName === false) {
                    $.vpage.setStorage({
                        currentHashModelName: 'noneHash',
                        currentHashVpageParams: rBoxMatch.matchParams,
                        triggerType: triggerType
                    })
                    return false;
                }

                // 觸發並傳遞參數
                $.vpage.setStorage({
                    currentHashModelName: rBoxMatch.matchModelName,
                    currentHashVpageParams: rBoxMatch.matchParams,
                    triggerType: triggerType
                })
            }
        }

        // 開始比對如 user/uid => user/123
        var _matchRouterHash = function (modelName, modelNameBox, locationHashBox, totalHashSeg){

            // 放置匹配到的模型名稱
            var matchModelName = false;

            // 放置匹配到給模型的參數
            var matchParams = {};

            // 網址的 hash 總字段數量不等於該次模型的字段落數量，那就離開
            if (modelNameBox.length !== totalHashSeg) {
                return {
                    matchModelName: matchModelName,
                    matchParams: matchParams
                }
            }

            // EX.
            // [#user, :uid]   <==> [#user, 123]
            // [#products, content, :pid]   <==> [#products, content, 123]
            $.each(modelNameBox, function (key, seg){


                // 如果是模型盒的第一個，且它的字段不等於網址 Hash 的第一個字段值，那麼後續也不必比對，因為絕對不是這個
                if (key == 0 && seg != locationHashBox[key]) {
                    return false;
                }


                // 若還有下一筆
                if (key + 1 <= modelNameBox.length) {

                    // 模型名稱的字段與 hash 值對應到了，那代表有可能是這個路由，所以繼續比對下一個字段。
                    if (seg == locationHashBox[key]) {
                        return true;
                    }
                    else {
                        // 如果對應不到，那有可能是參數。
                    }

                    // 這個字段是如 :var 參數嗎
                    if (seg.indexOf(":") < 0) {
                        // 代表這個字段屬於路由，而不是參數。代表路由不符合。
                        return false;
                    }
                    else {
                    }
                }
                // 若沒有下一筆
                else {
                }

                // console.log(key, modelNameBox.length);
                // if (locationHashBox[key])


                // 代表變數就是這個值，例如 id = 123
                var paramName = seg.slice(1); // 去除 :

                // 設定模型名稱
                if (matchModelName === false) matchModelName = modelName;

                // 設定模型需要的參數
                matchParams[paramName] = locationHashBox[key];

                // 繼續下一個字段，比對參數下去
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
                
                // 若模組名稱的第一個字不是 # 則繼續尋找
                if (modelName.indexOf("#") < 0) return true; 

                // 來到這裡的就是 hash 類型
                hashRouterBox.push(modelName)
            })
            
            return hashRouterBox;
        }

        // 瀏覽器上、下頁切換
        this.onPopState = function() {
            var _this = this;
            window.onpopstate = function() {
                _this.loadHistoryFromQuery('onPop');
            }
        }



        // Hash 發生變動
        this.onHashChange = function (){
            var _this = this;
            window.onhashchange = function (){

                // 因為 modelName 在 history 如 'user/:uid' 下進行切換的時候並不會變動
                // 所以要預先設設置一份偽 modelName 作為變動概念
                $.vpage.setStorage({
                    currentHashModelName: '--autoSetForOnHashChange',
                    currentHashVpageParams: {},
                    triggerType: 'onPop'
                })

                $.vpage.helper.loadHash('onPop');


                // 代表上方沒有找到 HASH
                if ($.vpage.storage.currentHashModelName === '--autoSetForOnHashChange'){
                    $.vpage.setStorage({
                        currentHashModelName: 'noneHash',
                        currentHashVpageParams: {},
                        triggerType: 'onPop'
                    })
                }

                $.vpage.storage.alwaysCallback.call(_this, $.vpage.storage);
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