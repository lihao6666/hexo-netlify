---
title: Js学习笔记3-对象
date: 2021-05-17 18:37:23
tags: JavaScript
categories: 
- 前端
- js
---

### 一、内置对象String

字符串的所有方法，都不会改变原来字符串，因为要保证字符串的不可变性，所以方法操作后会返回一个新的值

#### 查找字符串

##### 1、indexOf()/lastIndexOf()

用于查找指定字符串出现的位置，使用方法是`str.indexOf(字符串,[起始位置])`，其中indexOf是从前往后查、lastIndexOf是从后往前查

##### 2、search()

用于查找指定字符串出现的位置，使用方法是`str.search(正则表达式或者字符串)`

##### 3、includes()

查找字符串中是否包含指定的内容，使用方法是`str.includes(想要查找的字符串, [position])`

##### 4、startsWith()/endswith()

判断字符串是否以指定内容开头，使用方法是`str.startswith(查找内容，[position])`

#### 获取指定位置的字符

##### 1、charAt(index)/str[index]

获取指定下标的字符，使用方法是`str.charAt(index)`

##### 2、charCodeAt(index)

获取指定下标字符的unicode编码，使用方法是`str.charCodeAt(index)`

#### 字符串截取

##### 1、slice()

用来截取字符串，使用方法是`str.slice(开始索引，结束索引)`,原则想python切片一样，包左不包右

##### 2、substring()

同slice()，但是又以下不同:

- `substring()`不能接受负值作为参数。如果传递了一个**负值**，则默认使用 0。

- `substring()`还会自动调整参数的位置，如果第二个参数小于第一个，则自动交换。比如说， `substring(1, 0)`相当于截取的是第一个字符。

##### 3、substr()

截取指定长度的字符串，使用方法是`str.substr(开始索引，截取的长度)`,ES没有对其进行标准化，因此不建议使用

##### 4、concat()

字符串连接，使用方法是`str1.concat(str2)`

##### 5、split()

通过指定的分隔符将字符串拆分为一个数组，使用方法是`str.split(分隔符)`

#### 其它操作

##### 1、replace()

将字符串指定内容替换，使用方法是`str.replace(被替换的字符，新的字符)`

##### 2、trim()

去除字符串前后的空格，使用方法是`str.trim()`

##### 3、大小写转换

- str.toLowerCase()

- str.toUpperCase()

### 二、内置对象Number

number类型包括整数和小数

##### 1、isInteger()

判断是否是整数，使用方法是`Number.isInteger(数字)`

##### 2、toFixed()

小数点后保留多少位，使用方法是`数字.toFixed(几位)`

### 三、内置对象Math的常用方法

| 方法 | 描述 | 备注 |
|:-------------|:-------------|:-------------|
| Math.PI | 圆周率 | Math对象的属性  |
| Math.abs() |  **返回绝对值** |  |
| Math.random() | 生成0-1之间的**随机浮点数** | 取值范围是 [0，1) |
| Math.floor() | **向下取整**（往小取值） |  |
| Math.ceil() | **向上取整**（往大取值） |  |
| Math.round() | 四舍五入取整（正数四舍五入，负数五舍六入） |  |
| Math.max(x, y, z)  | 返回多个数中的最大值 |  |
| Math.min(x, y, z)  | 返回多个数中的最小值 |  |
| Math.pow(x,y) | 乘方：返回 x 的 y 次幂 |  |
| Math.sqrt() | 开方：对一个数进行开方运算 |  |


### 四、内置对象Date

#### 对象创建

##### 1、不传参数

默认获取系统当前时间

```js
var date1 = new Date();
```

##### 2、传递参数

举例1：（参数是字符串）

```js
const date11 = new Date('2020/02/17 21:00:00');
console.log(date11); // Mon Feb 17 2020 21:00:00 GMT+0800 (中国标准时间)

const date12 = new Date('2020/04/19'); // 返回的就是四月
console.log(date12); // Sun Apr 19 2020 00:00:00 GMT+0800 (中国标准时间)

const date13 = new Date('2020-05-20');
console.log(date13); // Wed May 20 2020 08:00:00 GMT+0800 (中国标准时间)

const date14 = new Date('Wed Jan 27 2017 12:00:00 GMT+0800 (中国标准时间)');
console.log(date14); // Fri Jan 27 2017 12:00:00 GMT+0800 (中国标准时间)
```


举例2：（参数是多个数字）

```js
const date21 = new Date(2020, 2, 18); // 注意，第二个参数返回的是三月，不是二月
console.log(date21); // Wed Mar 18 2020 00:00:00 GMT+0800 (中国标准时间)

const date22 = new Date(2020, 3, 18, 22, 59, 58);
console.log(date22); // Sat Apr 18 2020 22:59:58 GMT+0800 (中国标准时间)

const params = [2020, 06, 12, 16, 20, 59];
const date23 = new Date(...params);
console.log(date23); // Sun Jul 12 2020 16:20:59 GMT+0800 (中国标准时间)
```


举例3：（参数是时间戳）

```js
const date31 = new Date(1591950413388);
console.log(date31); // Fri Jun 12 2020 16:26:53 GMT+0800 (中国标准时间)

// 先把时间对象转换成时间戳，然后把时间戳转换成时间对象
const timestamp = new Date().getTime();
const date32 = new Date(timestamp);
console.log(date32); // Fri Jun 12 2020 16:28:21 GMT+0800 (中国标准时间)
```

#### 日期格式化

Date对象 有如下方法，可以获取日期和时间的**指定部分**：

| 方法名        | 含义              | 备注      |
| ------------- | ----------------- | --------- |
| getFullYear() | 获取年份          |           |
| getMonth()    | **获取月： 0-11** | 0代表一月 |
| getDate()       | **获取日：1-31** | 获取的是几号 |
| getDay() | **获取星期：0-6** | 0代表周日，1代表周一 |
| getHours() | 获取小时：0-23 |  |
| getMinutes() | 获取分钟：0-59 |           |
| getSeconds() | 获取秒：0-59 |           |
| getMilliseconds() | 获取毫秒 | 1s = 1000ms |
| getTime() | 获取时间戳
| now() | 获取当前时间的时间戳





