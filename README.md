# vpage.js 

## History 使用的方式
利用 Query String 作為判斷
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

## Hash 的使用方式
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
