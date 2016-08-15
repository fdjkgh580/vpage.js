# vpage.js 
- vpage 是一個 jQuery 的 plugin 掛件。透過非常簡單的寫法，就能設計出與網址對應關係的動態事件。並且能讓瀏覽器的上下頁切換(window.onpopstate)、重新整理頁面後 (偽 history.state) 觸發指定的事件。
- vpage 不包含 AJAX 處理，因此能搭配您習慣用的 AJAX 函式庫即可。

## 範例
````javascript
$(selector).vpage({
    name: 'my_button', // 該模型的唯一名稱
    event: 'click', // 綁定的事件，參考 jQuery 的 .on() 方法
    url_get_onload_key: 'call_vpage_name', // 提供網址一個觸發 vpage 的 GET 參數鍵如 ?call_vpage_name=my_button
    prepare: function (param){
        // 事件觸發前的動作
    },
    do: function (param){
        // 事件觸發
    },
    onload: function (){
        // 畫面進入後要觸發的事件
        // 例如偵測到網址 ?call_vpage_name=my_button 會觸發
    },
    onpop: function (){
        // 上下頁切換觸發的事件
    }
})
````

## 更多範例
- [簡單範例](http://creation.kiiuo.com/vpage/Demo/simple.html)  
- [建議的明確的標準寫法](http://creation.kiiuo.com/vpage/Demo/standard.html)  

## $.vpage.version()
取得當前版本

## $.vpage.get_url_param(key)
取得網址的 GET 參數     
<table>
    <tr>
        <th>參數</th>
        <th>型態</th>
        <th>說明</th>
    </tr>
    <tr>
        <td>key</td>
        <td>string</td>
        <td>GET的鍵  </td>
    </tr>
</table>

````javascript
// http://domain.com?onload=hello_world
$.vpage.get_url_param("onload"); // hello_world
````

## $.vpage.listen()  
監聽 vpage 設定的頁面讀取事件 onload 與 上下頁切換觸發事件 onpop。須要放置在所有的 vpage   最後，這樣當頁面讀取、上下頁切換的時候才能被觸發。  

## $.vpage.trigger(name, type);  
提供手動觸發 vpage 的 onload() 與 onpop()    
<table>
    <tr>
        <th>參數</th>
        <th>型態</th>
        <th>說明</th>
    </tr>
    <tr>
        <td>name</td>
        <td>string</td>
        <td>vpage 的名稱</td>
    </tr>
    <tr>
        <td>type</td>
        <td>string</td>
        <td>onload | onpop  </td>
    </tr>
</table>
````javascript
$.vpage.trigger("my_button", "onload"); // 觸發 vpage = my_button 的 onload 方法
````

## $.vpage.set(name, key, val)  
設定參數  
<table>
    <tr>
        <th>參數</th>
        <th>型態</th>
        <th>說明</th>
    </tr>
    <tr>
        <td>name</td>
        <td>string</td>
        <td>vpage 的名稱</td>
    </tr>
    <tr>
        <td>key</td>
        <td>string</td>
        <td>參數鍵</td>
    </tr>
    <tr>
        <td>val</td>
        <td>string</td>
        <td>參數值</td>
    </tr>
</table>
````javascript
$.vpage.set("my_button", "url", "?onload=my_button&type=news");
````

## $.vpage.get(name, key)  
取得參數  
<table>
    <tr>
        <th>參數</th>
        <th>型態</th>
        <th>說明</th>
    </tr>
    <tr>
        <td>name</td>
        <td>string</td>
        <td>(選)vpage 的名稱，不指定返回全部  </td>
    </tr>
    <tr>
        <td>key</td>
        <td>string</td>
        <td>(選)參數的鍵，不指定返回全部  </td>
    </tr>
</table>
````javascript
$.vpage.get("my_button", "url")
````

## 動態替換網址的建議方法
請不要直接使用 JavaScript 原生的 history.pushState() 切換網址，應該配合 $.vpage.set() 的方式指定才能有效操作。
````javascript
$(".item").vpage({
    ......
    prepare: function (param){
        $.vpage.set("my_button", "url", "?onload=my_button&type=news");
    },
    ......
})
````
    
也可以使用標籤的寫法
````html
<a href="?onload=my_button&type=news" class="item news">最新消息</a>
````

## $(selector).vpage(param);
針對元素綁定事件
<table>
    <tr>
        <th>參數</th>
        <th>型態</th>
        <th>說明</th>
    </tr>
    <tr>
        <td>param.name</td>
        <td>string</td>
        <td>為該模型命名</td>
    </tr>
    <tr>
        <td> param.event </td>
        <td> string </td>
        <td> 在元素綁定 on 的事件   </td>
    </tr>
    <tr>
        <td> param.url_get_onload_key </td>
        <td> string </td>
        <td> 提供 onload 辨識的鍵，預設 onload  </td>
    </tr>
    <tr>
        <td> param.do(param) </td>
        <td> function </td>
        <td> 觸發時的動作 </td>
    </tr>
    <tr>
        <td> param.onload </td>
        <td> function </td>
        <td> 畫面進入時所觸發的事件 </td>
    </tr>
    <tr>
        <td> param.onpop </td>
        <td> function </td>
        <td> 切換上下頁面所觸發的事件 </td>
    </tr>
    <tr>
        <td> param.state </td>
        <td> object </td>
        <td> (選)history.pushState 物件      </td>
    </tr>
    <tr>
        <td> param.prepare(param) </td>
        <td> function </td>
        <td> (選)觸發事件前的準備動作   </td>
    </tr>
    <tr>
        <td> param.title </td>
        <td> string </td>
        <td> (選)變更的網頁標題   </td>
    </tr>
</table>


## 參考範例
- [簡單範例](http://creation.kiiuo.com/vpage/Demo/simple.html)  
- [建議的明確的標準寫法](http://creation.kiiuo.com/vpage/Demo/standard.html)  
