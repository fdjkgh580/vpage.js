(function($) {
    // 取得網址的 get 參數，例如 ?
    $.vpage.getUrlParams = function(key) {
        var vars = {},
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            // vars[hash[0]] = hash[1];
            vars[hash[0]] = decodeURIComponent(hash[1]);
        }
        return !key ? vars : vars[key];
    }
}(jQuery));