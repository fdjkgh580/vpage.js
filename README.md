# vpage
$.vpage 不需要重新整理頁面的換頁設計

## $.vpage.version()
取得版本  

## $.vpage.get_url_param(key)
取得網址的 GET 參數     
@key string GET的鍵  
````javascript
// http://domain.com?onload=hello_world
$.vpage.get_url_param("onload"); // hello_world
````

## $.vpage.listen()  
監聽 vpage 設定的頁面讀取事件 onload 與 上下頁切換觸發事件 onpop。須要放置在所有的 vpage   最後，這樣當頁面讀取、上下頁切換的時候才能被觸發。  

## $.vpage.trigger(name, type);  
提供手動觸發 vpage 的 onload() 與 onpop()    
@name string vpage 的名稱  
@type string onload | onpop  
````javascript
$.vpage.trigger("my_button", "onload"); // 觸發 vpage = my_button 的 onload 方法
````

## $.vpage.set(name, key, val)  
設定參數  
@name string vpage的名稱  
@key string 參數鍵  
@val string 參數值  
````javascript
$.vpage.set("my_button", "url", "?onload=my_button&type=news");
````

## $.vpage.get(name, key)  
取得參數  
@name string (選)vpage 的名稱，不指定返回全部  
@key string (選)參數的鍵，不指定返回全部  
````javascript
$.vpage.get("my_button", "url")
````

## 動態替換網址的建議方法
請不要直接使用 history.pushState() ，配合 $.vpage.set() 的方式指定才能有效操作。
````javascript
$(".item").vpage({
    ......
    prepare: function (param){
        $.vpage.set("my_button", "url", "?onload=my_button&type=news");
    },
    ......
})
````

### $(selector).vpage(param);
針對元素綁定事件
@param.name string 為該模型命名  
@param.event string 在元素綁定 on 的事件  
@param.url_get_onload_key string 提供 onload 辨識的鍵，預設 onload 
@param.do(param) function 觸發時的動作  
@param.onload function 畫面進入時所觸發的事件  
@param.onpop function 切換上下頁面所觸發的事件  
@param.state object (選)history.pushState 物件       
@param.prepare(param) function (選)觸發事件前的準備動作  
@param.title string (選)變更的網頁標題  

參考範例
- [簡單範例](http://localhost/vpage/demo/simple.html)  
- [建議的明確的標準寫法](http://localhost/vpage/demo/standard.html)  
