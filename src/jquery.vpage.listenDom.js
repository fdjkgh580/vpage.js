(function($) {
    $.vpage.listenDom = function() {

        $("body").on("click", "[data-vpage]", function (e){
            e.preventDefault();
            
            // 取得標籤名稱與模型名稱
            var nodeName = e.currentTarget.nodeName;
            var modelName = $(this).attr("data-vpage");

            // 若是超連結
            if (nodeName === "A"){
                var href = $(this).attr("href");
            } else {
                var href = $(this).attr("data-href");
            }

            var box = href.split("?");
            var path = box[0];
            var queryString = box[1]

            var customObject = queryString === undefined 
                ? {}
                : $.vpage.helper.convertQueryStringToObject("?" + queryString);

            $.vpage.goto(modelName, customObject, path);
            
        })


    }
}(jQuery));