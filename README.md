# vpage
透過簡單的處理，讓您不需要重新整理頁面的動態事件切換。並且讓瀏覽器的上下頁切換(window.onpopstate)、重新整理頁面後 (偽 history.state) ，都能觸發指定的事件。
vpage 不包含 AJAX 處理，因此能搭配您習慣用的 AJAX 函式庫即可。

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
- [簡單範例](http://localhost/vpage/demo/simple.html)  
- [建議的明確的標準寫法](http://localhost/vpage/demo/standard.html)  
