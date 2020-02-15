# ES6新特性

### 1.let和const之间的区别：

A.let声明了有自己作用域，不会存在像var有变量提升的

B.const就是一旦声明了，就必须赋值，不然会出现报错

### 2.解构赋值

A.数组

```js
let [a,b,c] = [1,2,3]
console.log(a,b,c) // 1 2 3
```

B.对象

```js
let {a,b,c} = {a: 1, b: 2, c: 3}
console.log(a,b,c); // 1 2 3

let obj = {res: 'world', message: 'error'}; 
let { res, message } = obj; 
console.log(res,message); // world error
```



### 3.Map和Set的使用

**AI： Map和Set都是hash结构**

A.Map和Set都是对象，可以new出来

B.Map的用途

I.<u>处理网络错误</u>

```js
let infos = new Map([
    [400, 'InvalidParameter'],
    [404, 'Not found'],
    [500, 'InternalError']
]); 
infos.get(400); //"InvalidParameter"
infos.delete(400); //"InvalidParameter"
infos.get(400); // undefined
infos.get(404); //"Not found"
infos.get(500); //"InternalError"
```

C.Set的用途

I.<u>去重</u>

```js
let a = [1,2,3,3,,4,6];
let res = new Set(a);
console.log(res) // [1,2,3,undefined,4,6]
```



### 4.Reflect与Proxy

A.Reflect：Object 的一些明显属于语言内部的方法移植到了 Reflect 对象上（当前某些方法会同时存在于 Object 和 Reflect 对象上），未来的新方法会只部署在 Reflect 对象上。

```js
let obj = {ab: 'zero', age: 18};
console.log(Reflect.has(obj, 'ab'));
```

B.Proxy(代理)

I.proxy有两个参数target,handler。在通过proxy构造函数生成实例对象时，需要提供这两个参数。target即目标对象，handler是一个对象，声明了代理target的指定行为

```js
let target = {
    name: '小明',
    age: 15
}
let handler = {
    get:(target, name, ) => {
        return 'success'
    }
}

let pro = new Proxy(target, handler);
console.log(pro.name) //  success
```



### 5.模板字符串



### 6.ES6模块



### 7.Promise对象



### 8.Generator函数



### 9.async函数

