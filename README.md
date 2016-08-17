# vpage.js 
- vpage 是一個 jQuery 的 plugin 掛件
- 透過簡單的寫法，設計出與網址對應的動態事件
- 能讓瀏覽器的上下頁切換 (window.onpopstate)、重新整理頁面後 (偽 history.state) 觸發指定的事件
- vpage 不包含 AJAX 處理

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

## 更多範例
- [簡單](http://creation.kiiuo.com/vpage/Demo/simple.html)  
- [建議](http://creation.kiiuo.com/vpage/Demo/standard.html)  

## 參考更多說明
- [我的部落格](http://jsnwork.kiiuo.com/archives/2348/jquery-vpage-js-%E5%BF%AB%E9%80%9F%E5%88%87%E6%8F%9B%E7%B6%B2%E5%9D%80%E8%88%87%E5%B0%8D%E6%87%89%E4%BA%8B%E4%BB%B6)  
