---
title: Js学习笔记2-运算符
date: 2021-05-17 18:37:23
tags: JavaScript
categories: 
- 前端
- js
---

### 短路的用法

1、JS中的`&&`属于**短路**的与：

- 如果第一个值为false，则不会执行后面的内容。

- 如果第一个值为 true，则继续执行第二条语句，并返回第二个值。

```javascript
const a1 = 'qianguyihao';
//第一个值为true，会继续执行后面的内容
a1 && alert('看 a1 出不出来'); // 可以弹出 alert 框

const a2 = undefined;
//第一个值为false，不会继续执行后面的内容
a2 && alert('看 a2 出不出来'); // 不会弹出 alert 框
```

2、JS中的`||`属于**短路**的或：

- 如果第一个值为true，则不会执行后面的内容。

- 如果第一个值为 false，则继续执行第二条语句，并返回第二个值。

举例：

```js
const result; // 请求接口时，后台返回的内容
let errorMsg = ''; // 前端的文案提示

if (result && result.retCode != 0) {
	// 接口返回异常码时
	errorMsg = result.msg || '活动太火爆，请稍后再试'; // 文案提示信息，优先用 接口返回的msg字段，其次用 '活动太火爆，请稍后再试' 这个文案兜底。
}

if (!result) {
	// 接口挂掉时
	errorMsg = '网络异常，请稍后再试';
}
```

### 运算符优先级

- `.`、`[]`、`new`

- `()`

- `++`、`--`

- `!`、`~`、`+`（单目）、`-`（单目）、`typeof`、`void`、`delete`

- `%`、`*`、`/`

- `+`（双目）、`-`（双目）

- `<<`、`>>`、`>>>`

- 关系运算符：`<`、`<=`、`>`、`>=`

- `==`、`!==`、`===`、`!==`

- `&`

- `^`

- `|`

- `&&` &&比||优先级高

- `||`

- `?:`

- `=`、`+=`、`-=`、`*=`、`/=`、`%=`、`<<=`、`>>=`、`>>>=`、`&=`、`^=`、`|=`

- `,`

