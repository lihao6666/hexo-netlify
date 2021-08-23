---
title: Js学习笔记5-面向对象
date: 2021-07-12 20:19:54
tags: JavaScript
categories: 
- 前端
- js
---
## 对象的基本操作

略

## 浅拷贝和深拷贝

### 1、浅拷贝

用`Object.assgin()`实现浅拷贝，语法如下:

```js
Object.assign(目标对象, 源对象1, 源对象2...);
```
例如：

```js
const obj1 = {
    name: 'qianguyihao',
    age: 28,
    info: {
        desc: 'hello',
    },
};

// 浅拷贝：把 obj1 拷贝给 obj2。如果 obj1 只有一层数据，那么，obj1 和 obj2 则互不影响
const obj2 = Object.assign({}, obj1);
console.log('obj2:' + JSON.stringify(obj2));

obj1.info.desc = '永不止步'; // 由于 Object.assign() 只是浅拷贝，所以当修改 obj1 的第二层数据时，obj2 对应的值也会被改变。
console.log('obj2:' + JSON.stringify(obj2));
```

也可以实现对象合并，具体如下：

```js
const obj1 = {
    name: 'qianguyihao',
    age: 28,
    desc: 'hello world',
};

const obj2 = {
    name: '许嵩',
    sex: '男',
};

// 浅拷贝：把 obj1 赋值给 obj2。这一行，是关键代码。这行代码的返回值也是 obj2
Object.assign(obj2, obj1);

console.log(JSON.stringify(obj2));
```

### 2、深拷贝

```js
let obj1 = {
    name: 'qianguyihao',
    age: 28,
    info: {
        desc: 'hello',
    },
    color: ['red', 'blue', 'green'],
};
let obj2 = {};

deepCopy(obj2, obj1);
console.log(obj2);
obj1.info.desc = 'github';
console.log(obj2);

// 方法：深拷贝
function deepCopy(newObj, oldObj) {
    for (let key in oldObj) {
        // 获取属性值 oldObj[key]
        let item = oldObj[key];
        // 判断这个值是否是数组
        if (item instanceof Array) {
            newObj[key] = [];
            deepCopy(newObj[key], item);
        } else if (item instanceof Object) {
            // 判断这个值是否是对象
            newObj[key] = {};
            deepCopy(newObj[key], item);
        } else {
            // 简单数据类型，直接赋值
            newObj[key] = item;
        }
    }
}
```

## 对象的高级操作

### 1、Object.freeze()

Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

```js
const params = {
    name: 'qianguyihao';
    port: '8899';
}

Object.freeze(params); // 冻结对象 params

params.port = '8080';// 修改无效
```

## Js原型链和原型继承

[Js原型继承](https://blog.csdn.net/m0_37846579/article/details/80278092)


## Tip

### 1、json

**json的遍历**

```js
for (var key in myJson) {
        console.log(key); //获取 键
        console.log(myJson[key]); //获取 值（第二种属性绑定和获取值的方法）
        console.log('------');
    }
```