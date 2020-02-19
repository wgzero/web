# VSCode的一些插件用法

## 1.Rest Client

A.Restful接口:get 、post、put、delete(get查询所有数据，post添加数据，put更新数据，delete删除数据)

```js
//查询所有数据
get http://localhost:3006/api/v1/blog HTTP/1.1
// 添加数据
post http://localhost:3006/api/v1/blog HTTP/1.1
content-type: application/json

{
    "id": "5",
    "author": "Wed, 21 Oct 2015 18:27:50 GMT",
    "title": "time",
    "content": "about time"
}

// 更新数据
put http://localhost:3006/api/v1/blog HTTP/1.1
content-type: application/json

{
    "id": "3",
    "author": 555,
    "title": "5555",
    "content": "55555"
}

// 删除数据 3是传递id参数
delete http://localhost:3006/api/v1/blog/3 HTTP/1.1


```

## 2.