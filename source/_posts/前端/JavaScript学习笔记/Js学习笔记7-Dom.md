---
title: Js学习笔记7-Dom
date: 2021-07-14 14:46:22
tags: JavaScript
categories: 
- 前端
- js
---


## Dom基本操作

### 1、元素节点的获取

```js
var div1 = document.getElementById("box1"); //方式一：通过 id 获取 一个 元素节点（为什么是一个呢？因为 id 是唯一的）

var arr1 = document.getElementsByTagName("div"); //方式二：通过 标签名 获取 元素节点数组，所以有s

var arr2 = document.getElementsByClassName("hehe"); //方式三：通过 类名 获取 元素节点数组，所以有s
```

### 2、关系节点获取

*兄弟节点*

```js
下一个兄弟节点 = 节点.nextElementSibling || 节点.nextSibling
前一个兄弟节点 = 节点.previousElementSibling || 节点.previousSibling
```

*第一个子节点*

```js
第一个子元素节点 = 节点.firstElementChild || 节点.firstChild
```

*最后一个子节点*

```js
最后一个子元素节点 = 节点.lastElementChild || 节点.lastChild
```

*所有子节点*

```js
子节点数组 = 父节点.childNodes;   //获取所有节点。
子节点数组 = 父节点.children;   //获取所有节点。用的最多。
```

### 3、节点操作

*创建节点*

```js
新的标签(元素节点) = document.createElement("标签名");

```

*插入节点*

```js
父节点.appendChild(新的子节点);
```

*删除节点*

```js
父节点.removeChild(子节点);
node1.parentNode.removeChild(node1); //删除当前节点

```

*复制节点*

```js
要复制的节点.cloneNode();       //括号里不带参数和带参数false，效果是一样的。

要复制的节点.cloneNode(true); //参数为true的话，也会复制当前节点的子节点

```

### 4、节点属性操作

*属性获取*

```js
元素节点.getAttribute("src");
myNode.src
myNode.className    //注意，是className，不是class
myNode.title
```

*设置属性*

```js
myNode.setAttribute("src","images/3.jpg");
myNode.src = "images/2.jpg" 
```

*删除属性*

```js
元素节点.removeAttribute("src");    
```



## Dom中style属性的获取和修改

### 1、行内样式读取

```js
元素.style.样式名
元素.style["属性"];  //格式
//这样读取的都是行内样式(就是在节点中的style样式，不能读取内嵌或者外链的样式)
```

### 2、当前显示样式读取

```js
window.getComputedStyle("要获取样式的元素", "伪元素");
window.getComputedStyle(document.getElementById("box"), null)
```
