(function ( $ ) {

    var version = "1.2.0";

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

                // 預設參數
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

                // console.log(param)

                return param;

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
                if ($.vpage.storage[vpage_name]) {
                    $.vpage.storage[vpage_name].onload.call();
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
                if (history.state){
                    // console.log(history.state)


                    var key = false;

                    // 從倉儲中搜尋。如果發現網址有，代表必須觸發
                    $.each($.vpage.storage, function (vname, data){
                        key = $.vpage.get_url_param(data.url_get_onload_key);

                        if (key) return false;
                    })


                    if (key) {
                        var obj = $.vpage.storage[key];
                        obj.onpop.call();
                    }
                    else {
                        $.vpage.default();
                    }

                }
                else {
                    // 最初始
                    $.vpage.default();
                }
                
            }
            return $.vpage.api;
        }

        // 將參數放置到 history.state 紀錄
        this.push_state = function (param){
            var vpn = param.name;
            var pushdata = {};

            param.state = $.vpage.api.add_state(param);
            pushdata[param.name] = param.state;

            // 合併
            if (history.state) {
                var newext = $.extend(history.state, pushdata);
                // console.log(newext)
                // alert("目前是 " + param.name + "需要與已存在的合併")
            }
            else {
                var newext = pushdata;
            }

            history.pushState(newext, param.title, param.url);
        }

    }

    // 版本
    $.vpage.version = function (){
        return version;
    }

    // 取得網址的 get 參數，例如 ?
    $.vpage.get_url_param = function (key){
        var vars = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
           hash = hashes[i].split('=');
           vars[hash[0]] = hash[1];
        }
        return !key ? vars : vars[key];
    }

    /**
     * 監聽 vpage 設定的 onload 與 onpop 事件，
     * 須要放置在所有的 vpage 最後。
     */
    $.vpage.listen = function(){
        $.vpage.is_listen = true;
        $.vpage.api.onload.call();
        $.vpage.api.onpop.call();
    }

    /**
     * 由外部手動觸發
     * @param   name         vpage 的名稱
     * @param   type         onload | onpop
     */
    $.vpage.trigger = function (name, type){
        if (type == "onload"){
            $.vpage.storage[name].onload.call();
        }
        else if (type == "onpop") {
            $.vpage.storage[name].onpop.call();
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
        if (!storage) {
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

        if (!name) return $.vpage.storage;

        if (!key) {

            // 找不到 vpage
            var storage = $.vpage.storage[name];
            if (!storage) {
                return false;
            }

            // 返回所有參數
            return $.vpage.storage[name];
        }

        return $.vpage.storage[name][key];
    }

    // 總體預設方法
    $.vpage.default = function (){}


    /**
     * [vpage description]
     * @param  param.name                      為該模型命名
     * @param  param.event                     on 的事件
     * @param  param.do(param)                 觸發時的動作
     * @param  param.onload                    畫面進入時所觸發的事件
     * @param  param.onpop                     切換上下頁面所觸發的事件
     * @param  param.parent                    (選)on 的父元素, param.parent 與 param.child 同時使用，等於取代選擇器使用
     * @param  param.child                     (選)on 的子元素, param.parent 與 param.child 同時使用，等於取代選擇器使用
     * @param  param.state                     (選)history.pushState 物件     
     * @param  param.prepare(param)            (選)觸發事件前的準備動作
     * @param  param.title                     (選)變更的網頁標題
     * @param  url_get_onload_key              (選)觸發 onpop 的鍵，預設 onload
     * @param  param.url                       private 網址不可由外部參數指定。需要透過 $.vpage.set()
     */
    $.fn.vpage = function (param){

        // 檢查並取得
        param = $.vpage.api.check_param(param);

        // 將設定放到倉儲，使用 vpage 的名稱作為鍵
        $.vpage.storage[param.name] = param;

        // 初次進入，就先將參數放置到 history.state 紀錄
        if (!history.state) {
            $.vpage.api.push_state(param);
        }
        else if (!history.state[param.name]) {
            $.vpage.api.push_state(param);
        }

        var $parent = param.parent === undefined ? this : $(param.parent);
        var child = param.child === undefined ? false : param.child;



        // 綁定使用者指派的事件
        $parent.on(param.event, child, function (){

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

    // $.fn.testee = function (parents, selector){

    //     var _this = this;

    //     // console.log(_this);

    //     // 綁定使用者指派的事件
    //     $(parents).on("click", selector, function (obj, e){
    //         console.log($(this).html())
    //         return false;
    //     })
    // }

}( jQuery ));
