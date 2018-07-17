(function($) {
    $.vpage.listenDom = function() {

        $("body").on("click", "[data-vpage]", function (e){
            e.preventDefault();
            
            var nodeName = e.currentTarget.nodeName;
            var modelName = $(this).attr("data-vpage");

            if (nodeName === "A"){
                var href = $(this).attr("href");
            } else {
                var href = $(this).attr("data-href");
            }

            var customObject = $.vpage.helper.convertQueryStringToObject(href);
            $.vpage.goto(modelName, customObject);
            
        })


    }
}(jQuery));