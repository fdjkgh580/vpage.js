# vpage.js 

## 簡單範例

````html 
<a data-vpage="me" href="">Me</a>
<a data-vpage="book" href="?bid=123">Book</a>
<button data-vpage="contact" data-href="?email=fdjkgh580@gmail.com">Contact</button>
````
當網址未出現 ?vpage 的時候，將會觸發 default()；若有的話，例如 ?vpage=profile 那麼就會觸發對應的 profile() 方法。如同我們熟悉的路由概念，辨識取決於網址的 vpage 參數。

無論瀏覽器上一頁、下一頁切換，或是經由網址載入，都將執行對應的呼叫。
````javascript
$.vpage.router({
    // ex. https://localhost
    default: function (){
        console.log('Welcome')
    },
    // https://localhost?vpage=book
    me: function (){
        console.log('me')
    },
    // https://localhost?vpage=book
    book: function (obj){
        console.log("Bid: " + obj.bid)
    },
    // https://localhost?vpage=contact
    contact: function (obj){
        console.log("E-mail: " + obj.email)
    }
})
````


## 進階範例
````html
<button id="profile">profile</button>
<div class="output"></div>
````

````javascript
$.vpage.router({
    default: function (){
        $(".output").empty()
    },
    profile: function (query){
        $(".output").html("User ID：" + query.uid)
    }
})


$("body").on("click", "#profile", function (){

    // Do something...

    $.vpage.goto("profile", {
        uid: 7899888015
    })
})
````