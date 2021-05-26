---
title: CSS
date: 2021-01-05 09:30:21
tags: css
categories:
- 前端
- html+css
---

## 基础

### 一、文字相关

#### 1、字体属性

*基础属性*

```css
p{
	color: red; /*字体颜色*/
	font-size: 5px;   /*字体大小*/
	line-height: 15px;      /*行高*/
	font-family: 幼圆,黑体; 	/*字体类型：如果没有幼圆就显示黑体，没有黑体就显示默认*/
	font-style: italic ;		/*italic表示斜体，normal表示不倾斜*/
	font-weight: bold/normal;	/*粗体*/
	font-variant: small-caps;  /*小写变大写*/
	
}
```
*垂直居中*

```css
vertical-align: middle; /*指定行级元素的垂直对齐方式。*/

```
`vertical-align`属性可用于指定**行内元素**（inline）、**行内块元素**（inline-block）、**表格的单元格**（table-cell）的垂直对齐方式。主要是用于图片、表格、文本的对齐。

#### 2、文本属性

![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/%E6%96%87%E6%9C%AC%E5%B1%9E%E6%80%A7.png)

#### 3、列表属性

![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/%E5%88%97%E8%A1%A8%E5%B1%9E%E6%80%A7.png)



#### 4、浮动属性


```css
a{
	float: left/right/none/inherit
}
```

### 二、背景相关

#### 1、常用背景属性

* `background`:url("");设置背景图片，可以逗号隔开设置多个背景自适应
* `background-color`: 可以使用英语单词、rgb(),16进制、rgba()等方式
* `background-repeat`: no-repeat/repeat(`默认`)/repeat-x/repeat-y
* `background-position`: 向右偏移量(或者left、center、right) 向下偏移量(top、center、bottom)
* `background-attachment`: fixed/scroll;设置背景是否固定
* `background`:red url(1.jpg) no-repeat 100px 100px fixed;

* `background-size`: width height(百分比、cover、contain)
* `background-origin`: padding-box/border-box/content-box;从哪里开始加载
* `background-clip`: padding-box/border-box/content-box; 超出部分裁剪
* `background-image`: 颜色渐变
* `clip-path`: 元素裁剪

### 三、样式表和选择器

#### 1、基础选择器

*①标签选择器*

*②ID选择器*

```css
#mytitle{ border:3px dashed green; }
/* 使用#来进行选择 */
```

*③类选择器*

```css
.one{ width:800px; }
/* 使用.来进行选择 */

```

```html
<h3 class="teshu  zhongyao">我是一个h3啊</h3>
<!-- 同一个标签可以使用多个类，使用空格隔开 -->
```

*④通配符匹配*

```css
* {
    margin-left: 0px;
    margin-top: 0px;
}
```
#### 2、高级选择器

*①后代选择器*
```css
<style type="text/css">
    .div1 p {
        color: red;
    }
</style>
/* 使用空格表示后代关系 */

```
*②交集选择器*

```css
h3.special {
    color: red;
}
/* 定义时紧密相连，表示连续满足 */
```

*③并集选择器*

```css
p,
h1,
#mytitle,
.one {
    color: red;
}
/* 定义时用逗号隔开，表示都选择 */
```



### 四、伪类

> 同一个标签，根据其**不同的种状态，有不同的样式**。这就叫做“伪类”。伪类用冒号来表示

#### 1、静态伪类

- `:link` 超链接点击之前
- `:visited` 链接被访问过之后

#### 2、动态伪类

- `:hover` “悬停”：鼠标放到标签上的时候
- `:active`	“激活”： 鼠标点击标签，但是不松手时。
- `:focus` 是某个标签获得焦点时的样式（比如某个输入框获得焦点）

#### 3、超链接a的伪类

- `:link`  	“链接”：超链接点击之前
- `:visited` “访问过的”：链接被访问过之后
- `:hover`	“悬停”：鼠标放到标签上的时候
- `:active`	“激活”： 鼠标点击标签，但是不松手时。

	`注意要按照顺序写`

	`注意：`
	> a:link、a:visited都是可以省略的，简写在a标签里面。也就是说，a标签涵盖了link、visited的状态（前提是都具有了相同的属性）

### 五、继承性和层叠性

#### 1、继承性

[参考链接](https://www.cnblogs.com/thislbq/p/5882105.html)

#### 2、层叠性

当多个选择器，选择上了某个元素的时候，要按照如下顺序统计权重：

-  id 选择器
-  类选择器、属性选择器、伪类选择器
-  标签选择器、伪元素选择器

因为对于相同方式的样式表，其选择器排序的优先级为：`ID选择器 > 类选择器 > 标签选择器`

冲突总结：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/20170727_2050.png)


### 六、