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

![](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/%E6%96%87%E6%9C%AC%E5%B1%9E%E6%80%A7.png)

#### 3、列表属性

![](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/%E5%88%97%E8%A1%A8%E5%B1%9E%E6%80%A7.png)



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