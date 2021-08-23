---
title: Js学习笔记6-正则表达式
date: 2021-07-14 11:09:22
tags: JavaScript
categories: 
- 前端
- js
---

## 正则表达式创建

**构造函数**

```js
var reg = new RegExp("正则表达式", "匹配模式"); // 注意，两个参数都是字符串
reg.test(字符串)

```

其中匹配模式有两种选择:

- i 忽略大小写

- g 全局匹配

**字面量创建**

```js
var 变量 = /正则表达式/匹配模式;  // 注意，这个语法里没有引号

```

## 正则表达式规则

[正则表达式规则](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)

## 常用正则表达式

### 1、判断是否是电子邮件

```js
var emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

var email = "abchello@163.com";

console.log(emailReg.test(email));
```

### 待补充