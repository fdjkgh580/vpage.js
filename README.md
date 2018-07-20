# vpage.js 

## History 使用的方式
利用 Query String 作為判斷
### 當使用 ````<a>````
````html
<a data-vpage="book" href="?bid=123">Book</a>
````
````javascript
$.vpage.router({
    // ex. https://localhost
    default: function (){
        console.log('default!!')
    },
    // https://localhost?vpage=book&bid=123
    book: function (obj){
        console.log("Bid: " + obj.bid)
    },
})
````
### 當使用 ````<button>```` 或其他元素

````html
<button data-vpage="contact" data-href="?email=fdjkgh580@gmail.com">Contact</button>
````
````javascript
$.vpage.router({
    //...
    contact: function (obj){
        console.log("E-mail: " + obj.email)
    },
})
````

## Hash 的使用方式
````html
<a href="#products/seafood/P007">#products/seafood/P007</a>
````
````javascript
$.vpage.router({
    // https://......
    noneHash: function (){
        console.log('noneHash!!')
    },
    // https://......#products/seafood/P007
    'products/:type/:pid': function (obj){
        console.log('product', obj)
    }    
})
````
