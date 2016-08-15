(function ( $ ) {

    var version = "1.0.2";

    // 提供 onload 辨識的鍵，預設 onload 
    var url_get_onload_key;

    $.vpage = {};

    // 倉儲存放
    $.vpage.storage = {}

    // 是否已經設置監聽
    $.vpage.is_listen = false;

    $.vpage.api = new function (){

        // 設定監聽了？
        this.is_set_listen = function (){
            if ($.vpage.is_listen === false) {
                console.log('vpage 還未設定 listen() ');
                return false;
            }
            return true;
        }

        // 確認參數的合法性
        this.check_param = function (param){
            try {

                param = $.extend({
                    url_get_onload_key: 'onload'
                }, param);

                // 禁止輸入 url 
                if (param.url !== undefined) throw '請勿指定參數 param.url';
                else if (param.name === undefined) throw '請指定參數 param.name';
                else if (param.event === undefined) throw '請指定參數 param.event';
                else if (param.do === undefined) throw '請指定參數 param.do';
                else if (param.onload === undefined) throw '請指定參數 param.onload';
                else if (param.onpop === undefined) throw '請指定參數 param.onpop';

                url_get_onload_key = param.url_get_onload_key;

                console.log(param)

            } catch (err){
                console.log('Error: ' + err);
                return false;
            }
        }

        // 如果是標籤 a 就自動設定網址
        this.auto_set_url = function (usethis, name){
            if ($(usethis).get(0).tagName != "A") return false;
            var href = $(usethis).attr("href");


            $.vpage.set(name, "url", href);
            return href;
        }

        // 添加新的辨識
        this.add_state = function (param){
            if (!param.state) param.state = {};
            param.state.vpage_name = param.name;
            return param.state;
        }

        // 取得堆中的 vpage 名稱
        this.key = function (){
            return history.state.vpage_name;
        }

        

        /**
         * 畫面進入時所觸發的事件
         * 若要被觸發這個事件，網址需要夾帶有 GET 參數鍵 url_get_onload_key ，值需要指定 vpage 的 name 參數。
         * 例如 http://domain.com?onload=my_button
         */
        this.onload = function (){

            // 取得 GET 的 onload 值，作為辨識的鍵
            var vpage_name = $.vpage.get_url_param(url_get_onload_key);

            if (vpage_name) {

                //呼叫對應的 onload()
                if ($.vpage.storage[vpage_name] !== undefined) {
                    $.vpage.storage[vpage_name].onload();
                }
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
                    obj.onpop.call();

                }
                else {
                    // 不應該進入這個判斷。
                    console.log('System Error.');
                }
                
            }
            return $.vpage.api;
        }

        // 將參數放置到 history.state 紀錄
        this.push_state = function (param){
            param.state = $.vpage.api.add_state(param);
            history.pushState(param.state, param.title, param.url);
        }

    }

    // 版本
    $.vpage.version = function (){
        return version;
    }

    // 取得網址的 get 參數，例如 ?
    $.vpage.get_url_param = function (key){
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++){
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == key){
                return sParameterName[1];
            }
        }
    }

    /**
     * 監聽 vpage 設定的 onload 與 onpop 事件，
     * 須要放置在所有的 vpage 最後。
     */
    $.vpage.listen = function(){
        $.vpage.is_listen = true;
        $.vpage.api.onload();
        $.vpage.api.onpop();
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

    /**
     * 設定參數
     * @param  name     vpage 的名稱
     * @param  key      參數的鍵
     * @param  val      參數的值
     */
    $.vpage.set = function (name, key, val){
        var storage = $.vpage.storage[name];
        if (storage === undefined) {
            console.log('找不到指定的 vpage = ' + name);
            return false;
        }
        $.vpage.storage[name][key] = val;
    }

    /**
     * 取得參數
     * @param  name     (選)vpage 的名稱，不指定返回全部
     * @param  key      (選)參數的鍵，不指定返回全部
     */
    $.vpage.get = function (name, key){

        if (name === undefined) return $.vpage.storage;

        if (key === undefined) {

            // 找不到 vpage
            var storage = $.vpage.storage[name];
            if (storage === undefined) {
                return false;
            }

            // 返回所有參數
            return $.vpage.storage[name];
        }

        return $.vpage.storage[name][key];
    }


    /**
     * [vpage description]
     * @param  param.name                      為該模型命名
     * @param  param.event                     on 的事件
     * @param  param.do(param)                 觸發時的動作
     * @param  param.onload                    畫面進入時所觸發的事件
     * @param  param.onpop                     切換上下頁面所觸發的事件
     * @param  param.state                     (選)history.pushState 物件     
     * @param  param.prepare(param)            (選)觸發事件前的準備動作
     * @param  param.title                     (選)變更的網頁標題
     * @param  param.url                       private 網址不可由外部參數指定。需要透過 $.vpage.set()
     */
    $.fn.vpage = function (param){


        $.vpage.api.check_param(param);

        // 將設定放到倉儲，使用 vpage 的名稱作為鍵
        $.vpage.storage[param.name] = param;

        // 初次進入，就先將參數放置到 history.state 紀錄
        $.vpage.api.push_state(param);

        // 綁定使用者指派的事件
        this.on(param.event, function (){

            // 設定監聽了？
            if ($.vpage.api.is_set_listen() === false) return false;

            // 判斷自動設定網址
            $.vpage.api.auto_set_url(this, param.name);

            // 準備動作
            if (param.prepare) param.prepare.call(this, param);

            // 因為會被動態修改參數，所以要再次覆蓋
            $.vpage.api.push_state(param);

            // 觸發動作
            if (param.do) return param.do.call(this, param);
        })

    }

}( jQuery ));
