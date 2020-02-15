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

```js
let a = 'world'; 
let b = 'hello ' + `${a}`;
console.log(b); // hello world
```

### 6.ES6模块

A.export default

```html
在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
export default 中的 default 是对应的导出接口变量。
通过 export 方式导出，在导入时要加{ }，export default 则不需要。
export default 向外暴露的成员，可以使用任意变量来接收。
```

### 7.Promise对象

A.Promise 异步操作有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。

B.Promise一旦创建，便无法取消

C.eg：

```js
let p1 = new Promise(function(resolve, reject){
    resolve('p1')
});
let p2 = new Promise(function(resolve, reject){
    resolve('p2')
});
p1.then((res) => {
    console.log(res)
});
p2.then((res) => {
    console.log(res)
});  // p1 p2
```

D.async + await 是promise的语法糖

### 8.Generator函数

A.generator组成：

- function后面有*
- 函数内部有yield表达式

B.

```js
function* func(){
    console.log('one');
    yield '1';
    console.log('two');
    yield '2';
    console.log('three');
    return '3';
}
let a = func(); 
a.next(); // one
a.next(); // two
a.next(); // three
```



### 9.async函数

A.async是异步操作有关的关键字

```js
function show(){
    console.log('show')
}
async function ResShow(){
    console.log('a');
    await show();
    console.log('b');
}
ResShow(); // a show b
```

