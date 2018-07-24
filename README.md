# vpage.js 2
利用 jQuery 製作路由。有兩種方式可以觸發事件，一種是 History 另外一種是 Hash。

## 1. History 使用的方式
網址參數(GET)的鍵出現了 vpage，例如 ?vpage=book 那麼將會啟用路由偵測。
### 當使用 ````<a>````
````html
<a data-vpage="book" href="?bid=123">Book</a>
````
````javascript
$.vpage.router({
    book: function (obj, triggerType){
        console.log(obj, triggerType)
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
    contact: function (obj, triggerType){
        console.log(obj, triggerType)
    }
})
````
[前往試試看](https://codepen.io/fdjkgh580/pen/NBjaaL)


## 2. Hash 的使用方式
````html
<a href="#product/detail/seafood/P007">#product/detail/seafood/P007</a>
````
````javascript
$.vpage.router({
    '#product/detail/:type/:pid': function (obj, triggerType){
        console.log(obj, triggerType)
    }
})
````
[前往試試看](https://codepen.io/fdjkgh580/pen/GBmMOO)

## API
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

## 事件
### default()
當網址不符合任何路由的時候所觸發。
````javascript
$.vpage.router({
    default: function (obj, triggerType){
        //...
    },
    book: function (obj, triggerType){
        //...
    }
})
````
### noneHash()
當網址的路由從沒有 hash 轉換到沒有 hash 的時候所觸發。
````javascript
$.vpage.router({
    noneHash: function (obj, triggerType){
        //...
    }
    '#user/:uid': function (obj, triggerType){
        //...
    }
})
````
