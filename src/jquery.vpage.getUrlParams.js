(function($) {
    // 取得網址的 get 參數，例如 ?
    $.vpage.getUrlParams = function(key) {
        
        var vars = {},
            hash;

        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            // vars[hash[0]] = hash[1];
            if (hash[1] === undefined) return false;

            var hKey = hash[0];
            var hValue = hash[1];


            var valueSplitBox = hValue.split("#")
            hValue = valueSplitBox[0];

            vars[hKey] = decodeURIComponent(hValue);
        }


        return !key ? vars : vars[key];
    }
}(jQuery));