---
title: Js学习笔记1-变量
date: 2021-05-17 18:37:23
tags: JavaScript
categories: 
- 前端
- js
---




### 变量声明

#### 1、变量作用域相关

- 使用var关键字声明的变量（ 比如 `var a = 1`），**会在所有的代码执行之前被声明**（但是不会赋值）
  
- js没有块级作用域

- 任何变量，如果未经声明就赋值，此变量是属于 window 的属性

### 关键字和保留字

关键字如下：

```js

break、continue、case、default、

if、else、switch、for、in、do、while、

try、catch、finally、throw、

var、void、function、return、new、

this、typeof、instanceof、delete、with、

true、false、null、undefined
```

保留字如下：

```js
abstract、boolean、byte、char、class、const、

debugger、double、enum、export、extends、final、float、goto

implements、import、int、interface、long、native、package、

private、protected、public、short、static、super、synchronized、throws、

transient、volatile
```

### 基本数据类型和应用数据类型

我们首先记住一句话：JS中，所有的**变量**都是保存在**栈内存**中的。

然后来看看下面的区别。

*基本数据类型*：

基本数据类型的值，直接保存在栈内存中。值与值之间是独立存在，修改一个变量不会影响其他的变量。

*引用数据类型*：

对象是保存到**堆内存**中的。每创建一个新的对象，就会在堆内存中开辟出一个新的空间；而**变量保存了对象的内存地址**（对象的引用），保存在栈内存当中。如果两个变量保存了同一个对象的引用，当一个通过一个变量修改属性时，另一个也会受到影响。

### 数据类型基本操作

#### 字符串

```js
var str1 = '哈哈哈';
console.log(str1.length);  //获取字符串的长度

```

```js
var name = 'qianguyihao';
var age = '26';

console.log('我是' + name + ',age:' + age); //传统写法

console.log(`我是${name},age:${age}`); //ES6 写法 模板字符串写法
//**注意**，上方代码中，倒数第二行用的符号是单引号，最后一行用的符号是反引号（在 tab 键的上方）
```

#### 空值类型对比

- NaN 是Number类型，表示非数字
- null 是空对象，表示为空对象未初始化
- undefined 表示已经声明，但是未赋值或者未定义时

#### 数据类型转换

*返回变量数据类型*

```js
typeof [变量]
```

*显示类型转换*

- toString() 调用方法为`变量.toString()`，返回新变量结果
- String() 调用方法为`String(变量)`
- Number() 包括小数,调用方法为`Number(变量)`,其中对于null为0，undefined为NaN
- parseInt(string) 特性是只保留字符串开头的数字、自动截断小数
- parseFloat(string)
- Boolean()

*隐式转换*

- isNaN ()
- 自增/自减运算符：`++`、`—-`
- 正号/负号：`+a`、`-a`
- 加号：`+`
- 运算符：`-`、`*`、`/`





















