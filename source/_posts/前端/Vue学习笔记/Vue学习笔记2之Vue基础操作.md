---
title: Vue学习笔记2之Vue基础操作
date: 2020-02-29 16:40:30
tags: Vue
categories:
- 前端
- Vue
---

## 模板语法

### 插值

#### 1、文本
和Django的模板很类似，这里是会动态刷新的数据，且可以使用表达式当data数据变化的时候也会相应的变化，可以用v-once实现一次插入，所以v-once的作用就是实现一次渲染
```html
<span>Message: {{ msg }}</span>
<span>Message: {{ msg*2 }}</span>
<span v-once>这个将不会改变: {{ msg }}</span>
```

#### 2、v-html

用来渲染从服务器返回的html数据

#### 3、v-text

和文本插值语法类似语法类似，不过v-text会覆盖原有的标签text

![v-text](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/20200229165916.png)

#### 4、v-pre

v-pre 用于跳过这个元素和它子元素的编译过程，显示原本的插值语法，将代码原封不动的解析出来

![v-pre](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/20200229170436.png)

### 绑定属性v-bind

#### 1、v-bind基础用法
插值语法中可以实现对data的动态绑定，对于其它入src，href等属性我们可以使用`v-bind`实现。这时，可以使用`v-bind` 指令来动态绑定属性，`v-bind`用于绑定一个或多个属性值，或者向另一个组件传递 props值
![v-bind使用1](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/20200229171716.png)

#### 2、v-bind语法糖
v-bind 有一个对应的语法糖（简写方式），在开发中，通常会使用语法糖的形式，因为这样更加简洁
简写方式如下：
```html
<div class="app">
  <img :src="imgSrc" alt=""><br>
  <a :href="aHref">Vue.js官网</a>
</div>
```

#### 3、v-bind动态绑定class
绑定 class 有两种方式：
* 对象语法
* 数组语法

***对象语法：***
这里v-bind可以通过methods方法返回一个对象集合，其中可以通过data中的数据来给class进行属性的激活或者关闭
```html
用法一：直接通过{}绑定一个类
<h2 :class="{'active': isActive}">Hello World</h2>

用法二：也可以通过判断，传入多个值
<h2 :class="{'active': isActive, 'line': isLine}">Hello World</h2>

用法三：和普通的类同时存在，并不冲突
注：如果isActive和isLine都为true，那么会有title/active/line三个类
<h2 class="title" :class="{'active': isActive, 'line': isLine}">Hello World</h2>

用法四：如果过于复杂，可以放在一个methods或者computed中
<h2 class="title" v-bind:class="getCLasses()">{{message}}</h2>
注：classes是一个计算属性
<h2 class="title" :class="classes">Hello World</h2>
```
***数组语法：***
数组的数据和data数据绑定，可以直接传入名字

```html
用法一：直接通过{}绑定一个类
<h2 :class="['active']">Hello World</h2>

用法二：也可以传入多个值
<h2 :class=“[‘active’, 'line']">Hello World</h2>

用法三：和普通的类同时存在，并不冲突
注：会有title/active/line三个类
<h2 class="title" :class=“[‘active’, 'line']">Hello World</h2>

用法四：如果过于复杂，可以放在一个methods或者computed中
注：classes是一个计算属性
<h2 class="title" :class="classes">Hello World</h2>
```

***应用：***
![v-bind绑定class](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/20200229173755.png)

#### 4、v-bind动态绑定style

同样有两种绑定方式

***对象语法：***
style 后面跟的是一个对象类型
* 对象的 key 是 CSS 属性名称
* 对象的 value 是具体赋的值，值可以来自于 data 中的属性

```html
<div class="app">
  <!-- 50px 必须加上单引号 -->
  <h2 :style="{fontSize:'50px'}">{{message}}</h2>
  <!-- finalSize、finalColor当成一个变量使用 -->
  <h2 :style="{fontSize:finalSize + 'px',color:finalColor}">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      message: 'YuanyangLiao',
      finalSize: 100,
      finalColor: 'skyblue',
    },
  })
</script>
```

***数组语法：***
style 后面跟的是一个数组类型

```html
<div class="app">
  <h2 :style="[baseStyles,baseStyles2]">{{message}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      message: 'YuanyangLiao',
      baseStyles: {
        color: 'red'
      },
      baseStyles2: {
        fontSize: '50px'
      },
    },
  })
</script>
```




