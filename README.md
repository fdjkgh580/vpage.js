# vpage.js 2
利用 jQuery 製作路由或簡單的 SPA。有兩種方式可以觸發事件，一種是 [History](https://github.com/fdjkgh580/vpage.js/blob/master/README.md#1-history-%E4%BD%BF%E7%94%A8%E7%9A%84%E6%96%B9%E5%BC%8F) 另外一種是 [Hash](https://github.com/fdjkgh580/vpage.js/blob/master/README.md#2-hash-%E7%9A%84%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)。

# 安裝並載入

````
npm i vpage.js
````

````
import 'vpage.js'
````


# History 使用的方式
- 網址參數(GET)的鍵出現了 vpage，例如 ?vpage=book 那麼將會啟用路由偵測。網址的任何 Query String 都會傳遞到路由模型。

### 當使用 ````<a>````

````html
<a data-vpage="book" href="?bid=123">Book</a>
````

````js
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

````js
$.vpage.router({
    contact: function (params, triggerType){
        console.log(params, triggerType)
    }
})
````

[前往試試看](https://codepen.io/fdjkgh580/pen/NBjaaL)

# Hash 的使用方式
- 透過網址 # 的方式，例如路由指定 #product 會把後續出現以 : 開頭的命名如 :pid，作為參數名稱並傳遞到路由模型。

````html
<a href="#product/detail/seafood/P007">#product/detail/seafood/P007</a>
````

````js
$.vpage.router({
    '#product/detail/:type/:pid': function (params, triggerType){
        console.log(params, triggerType)
    }
})
````
# 回調函式的參數 triggerType 比較
- `History` 進入頁面是 `onLoad`；觸發前往頁是 `onLoad`；切換上下頁是 `onPop`。
- `Hash` 進入頁面是 `onLoad`；觸發前往頁是 `onPop`；切換上下頁是 `onPop`；。

[前往試試看](https://codepen.io/fdjkgh580/pen/GBmMOO)

# API

### $.vpage.goto(modelName, params, {path})
前往路由。用來手動指定 History 的路由與夾帶的參數。

````js
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

# 事件

### default()
- 初始化 History
- 當網址不符合任何路由的時候所觸發。

````js
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
- 初始化 Hash
- 當網址不包含任何 Hash 的時候觸發。

````js
$.vpage.router({
    noneHash: function (params, triggerType){
        //...
    }
    '#user/:uid': function (params, triggerType){
        //...
    }
})
````
