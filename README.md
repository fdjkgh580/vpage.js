# vpage.js 

## 簡單範例

````html 
<button id="home">home</button>
<button id="profile">profile</button>
<button id="contact">contact</button>
<div class="output"></div>
````
當網址未出現 ?vpage 的時候，將會觸發 default()；若有的話，例如 ?vpage=profile 那麼就會觸發對應的 profile() 方法。如同我們熟悉的路由概念，辨識取決於網址的 vpage 參數。

無論瀏覽器上一頁、下一頁切換，或是經由網址載入，都將執行對應的呼叫。
````javascript
$.vpage.init({
    default: function (){
        $(".output").empty()
    },
    home: function (query){
        $(".output").html(query.say)
    },
    profile: function (query){
        $(".output").html("User ID：" + query.uid)
    },
    contact: function (query){
        $(".output").html(query.email)
    }
})
````

### $.vpage.goto('指定網址參數 vpage 名稱', 夾帶給網址的自訂參數)
````javascript  
$("body").on("click", "#home", function (){
    $.vpage.goto("home", {
        say: 'Hello World'
    })
})
$("body").on("click", "#profile", function (){
    $.vpage.goto("profile", {
        uid: 7899888015
    })
})
$("body").on("click", "#contact", function (){
    $.vpage.goto("contact", {
        email: "vpage@gmail.com"
    })
})
````
