# Jquery总结：

## 1.自执行函数

A.

```js
$(function(){
    // 实现逻辑
})
```

B.

```js
$(document).ready(function(){
    // 实现逻辑
})
```

C.

```js
$().ready(function(){
    // 实现逻辑
})
```

## 2.获取文本的值

text()、html()、val()

## 3.获取样式

css()

## 4.操作方法

parent、children、parents、find、eq、sliblings、index、height、width、addClass、removeClass、hasClass、toggle、toggleClass、show、hide、trim、slideUp、slideDown、slideToggle、

add、remove、append、appendTo、prepend、prependTo、next、nextAll、nextUntil

## 5.发送请求

A.get

```js
$.get({
    url: 'https://baidu.com',
    data: {
        userName: 'aa',
        password: '123'
    },
    dataType: 'json',
    success: function(){
        console.log(res)
    }
})
```

B.post

```js
$.post({
    url: 'https://baidu.com',
    data: {
        userName: 'xxx',
        password: '123'
    },
    dataType: 'json',
    success: function(res){
        console.log(res)
    }
})
```

C.ajax

```js
function handleBtn(){
    $.ajax({
        type: 'get',
        url: 'https://baidu.com',
        data: {
            page: 5,
            limit: 5
        },
        dataType: 'json', // 设置数据返回形式
        success: function(res){
            console.log(res)
        }
    })
}
```

D.发送图片时要注意设置：processData为fasle和contentType为false

```js
$.ajax({
    type: 'post',
    data: {
        num: 5
    },
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(res){
        console.log(res)
    }
})
```

