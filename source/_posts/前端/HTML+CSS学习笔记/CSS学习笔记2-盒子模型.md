---
title: CSS学习笔记2-盒子模型
date: 2021-07-14 17:27:21
tags: css
categories:
- 前端
- html+css
---


## 盒子模型 

### 1、盒子模型区域

一个盒子中主要的属性就5个：width、height、padding、border、margin。如下：

- width和height：**内容**的宽度、高度（不是盒子的宽度、高度）
- padding：内边距。
- border：边框。
- margin：外边距

### 2、标准盒子模型和IE盒子模型

*标准盒子模型*

![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/w3c%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B.png)

*IE盒子模型*

![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/IE%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B.png)

### 3、paddng

*padding区域有颜色*

padding就是内边距。padding的区域有背景颜色，css2.1前提下，并且背景颜色一定和内容区域的相同。也就是说，background-color将填充**所有border以内的区域

*padding写法*

```css
padding-top: 30px;
padding-right: 20px;
padding-bottom: 40px;
padding-left: 100px;

/* 综合写法（上、右、下、左 */
/* 如果只写了三个值，则顺序为：上、右、下。左和右一样。 */
/* 如果只写了两个值，则为上和右，其中上和下，左和右一样 */
padding:30px 20px 40px 100px;

```

*默认带有padding的元素*

- `ul` 默认带有40px的padding-left

- `ol` 默认带有40px的padding-left


### 4、border

border就是边框。边框有三个要素：像素（粗细）、线型、颜色。

*border-style*

- dotted - 定义点线边框
- dashed - 定义虚线边框
- solid - 定义实线边框
- double - 定义双边框
- groove - 定义 3D 坡口边框。效果取决于 border-color 值
- ridge - 定义 3D 脊线边框。效果取决于 border-color 值
- inset - 定义 3D inset 边框。效果取决于 border-color 值
- outset - 定义 3D outset 边框。效果取决于 border-color 值
- none - 定义无边框
- hidden - 定义隐藏边框

*border拆分*

```css
/* 顺序也是上、右、下、左 */
border-width:10px 20px;
border-style:solid dashed dotted;
border-color:red green blue yellow;
/* 也可以按照方向拆分 */
border-top:10px solid red;
border-right:10px solid red;
border-bottom:10px solid red;
border-left:10px solid red;
border-top-width:10px;
/* 更细的拆分 */
border-top-style:solid;
border-top-color:red;
border-right-width:10px;
border-right-style:solid;
border-right-color:red;
border-bottom-width:10px;
border-bottom-style:solid;
border-bottom-color:red;
border-left-width:10px;
border-left-style:solid;
border-left-color:red;
```





### 4、tip

*body也有margin*

浏览器给`<body>`默认的margin大小是8个像素，此时`<body>`占据了整个页面的一大部分区域，而不是全部区域