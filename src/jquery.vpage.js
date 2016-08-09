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

        this.key = function (){
            return history.state.vpage_name;
        }
    }

    $.vpage.onload = function (){
        if (history.state && history.state.vpage_name){
            // 搜尋對應的方法
            var key = $.vpage.api.key();
            var obj = $.vpage.storage[key];
            obj.onload()
        }
        return $.vpage;
    }

    $.vpage.onpop = function (){

        window.onpopstate  = function (event){
            if (history.state && history.state.vpage_name){
                var key = $.vpage.api.key();
                var obj = $.vpage.storage[key];
                obj.onpop();
            }
            return $.vpage;
        }

    }

    $.vpage.listen = function(){
        $.vpage.onload().onpop();
    }




    /**
     * [vpage description]
     * @param  param.name
     * @param  param.data
     * @param  param.title
     * @param  param.url
     * @param  param.onload
     * @param  param.onpop
     */
    $.fn.vpage = function (param){

        $.vpage.storage[param.name] = param;


        this.on("click", function (){
            param.state = $.vpage.api.add_state(param);

            history.pushState(param.state, param.title, param.url);
        })
    }

    // 觸發預設

   


    
 
}( jQuery ));
