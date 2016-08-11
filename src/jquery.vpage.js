(function ( $ ) {

    var version = "1.0.0";

    $.vpage = {};
    $.vpage.storage = {}

    $.vpage.api = new function (){

        // 添加新的辨識
        this.add_state = function (param){
            param.state.vpage_name = param.name;
            return param.state;
        }

        // 取得堆中的 vpage 名稱
        this.key = function (){
            return history.state.vpage_name;
        }

        // 取得網址的 get 參數，例如 ?
        this.get_url_param = function (key){
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++){
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == key){
                    return sParameterName[1];
                }
            }
        }​

        /**
         * 畫面進入時所觸發的事件
         * 若要啟用，網址需要夾帶有 GET 參數 "onload"
         */
        this.onload = function (){

            // 取得 GET 的 onload 值，作為辨識的鍵
            var vpage_name = $.vpage.api.get_url_param("onload");

            if (vpage_name) {
                //呼叫對應的 onload()
                $.vpage.storage[vpage_name].onload();
            }

            return $.vpage.api;
        }

        /**
         * 切換上下頁面所觸發的事件
         */
        this.onpop = function (){

            window.onpopstate  = function (event){
                //如果有放入堆疊的話才執行
                if (history.state && history.state.vpage_name){
                    var key = $.vpage.api.key();
                    var obj = $.vpage.storage[key];
                    obj.onpop();
                }
                return $.vpage.api;
            }

        }

    }

    

    // 監聽 vpage 設定的 onload 與 onpop 事件
    $.vpage.listen = function(){
        $.vpage.api.onload().onpop();
    }

    /**
     * 由外部手動觸發
     * @param   name         vpage 的名稱
     * @param   type         onload | onpop
     */
    $.vpage.trigger = function (name, type){
        if (type == "onload"){
            $.vpage.storage[name].onload();
        }
        else if (type == "onpop") {
            $.vpage.storage[name].onpop();
        }
    }

    // 設定
    $.vpage.set = function (name, key, val){
        $.vpage.storage[name][key] = val;
    }

    // 取得設定
    $.vpage.get = function (name, key){
        return $.vpage.storage[name][key];
    }

    // 直接修改網址
    $.vpage.url = function (url){
        history.pushState(false, false, url);
    }


    /**
     * [vpage description]
     * @param  param.name                      為該模型命名
     * @param  param.state                     history.pushState 物件     
     * @param  param.event                     on 的事件
     * @param  param.before(this, param)       (選)on 回呼
     * @param  param.after(this, param)        (選)on 回呼
     * @param  param.title                     (選)變更的網頁標題
     * @param  param.url                       (選)變更的網址
     * @param  param.onload                    (選)
     * @param  param.onpop                     (選)
     */
    $.fn.vpage = function (param){

        // 將設定放到倉儲，使用 vpage 的名稱作為鍵
        $.vpage.storage[param.name] = param;

        this.on(param.event, function (){

            if (param.before) param.before(this, param);

            param.state = $.vpage.api.add_state(param);

            history.pushState(param.state, param.title, param.url);

            if (param.after) param.after(this, param);
        })
    }

}( jQuery ));
