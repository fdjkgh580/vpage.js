# vpage.js 2
利用 jQuery 製作路由或簡單的 SPA。有兩種方式可以觸發事件，一種是 [History](https://github.com/fdjkgh580/vpage.js/blob/master/README.md#1-history-%E4%BD%BF%E7%94%A8%E7%9A%84%E6%96%B9%E5%BC%8F) 另外一種是 [Hash](https://github.com/fdjkgh580/vpage.js/blob/master/README.md#2-hash-%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)。

# 安裝並載入
````
npm i vpage.js
````
````
import 'vpage.js'
````


# 1. History 使用的方式
網址參數(GET)的鍵出現了 vpage，例如 ?vpage=book 那麼將會啟用路由偵測。網址的任何 Query String 都會傳遞到路由模型。
### 當使用 ````<a>````
````html
<a data-vpage="book" href="?bid=123">Book</a>
````
````javascript
$.vpage.router({
    book: function (params, triggerType){
        console.log(params, triggerType)
    }
})
````
[前往試試看](https://codepen.io/fdjkgh580/pen/WKjZez)
### 當使用 ````<button>```` 或其他元素

````html
<button data-vpage="contact" data-href="?email=fdjkgh580@gmail.com">Contact</button>
````
````javascript
$.vpage.router({
    contact: function (params, triggerType){
        console.log(params, triggerType)
    }
})
````
[前往試試看](https://codepen.io/fdjkgh580/pen/NBjaaL)


# 2. Hash 的使用方式
透過網址 # 的方式，例如路由指定 #product 會把後續出現以 : 開頭的命名如 :pid，作為參數名稱並傳遞到路由模型。

````html
<a href="#product/detail/seafood/P007">#product/detail/seafood/P007</a>
````
````javascript
$.vpage.router({
    '#product/detail/:type/:pid': function (params, triggerType){
        console.log(params, triggerType)
    }
})
````
[前往試試看](https://codepen.io/fdjkgh580/pen/GBmMOO)

# 3. API
### $.vpage.goto(modelName, params, {path})
手動指定 History 的路由與夾帶的參數。
````javascript
$.vpage.goto("profile", {
    uid: 7899888015
})
````
[前往試試看](https://codepen.io/fdjkgh580/pen/QBvqxY)

### location
要前往 hash 形式的路由，直接使用 location 即可
````javascript
location.href = "#contact/fdjkgh580@gmail.com/0988888888"
````
[前往試試看](https://codepen.io/fdjkgh580/pen/xJdXmR)

# 4. 事件
### default()
當網址不符合任何路由的時候所觸發。
````javascript
$.vpage.router({
    default: function (params, triggerType){
        //...
    },
    book: function (params, triggerType){
        //...
    }
})
````

### noneHash()
當網址的路由從』有 hash」 轉換到「沒有 hash」的時候所觸發。
````javascript
$.vpage.router({
    noneHash: function (params, triggerType){
        //...
    }
    '#user/:uid': function (params, triggerType){
        //...
    }
})
````
