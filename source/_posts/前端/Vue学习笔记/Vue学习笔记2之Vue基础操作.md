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
### 计算属性computed

在模板中可以直接通过插值语法显示一些 data 中的数据，但是在某些情况下，可能需要对数据进行一些转化后再显示，或者需要将多个数据结合起来进行显示，这时可以使用计算属性 computed

#### 1、computed的基本使用

计算属性的使用，就是将一些计算的操作封装成函数，优雅的调用，下面是四种实现的方法：

```html
<div class="app">
  <!-- 方式1 -->
  <h2>{{firstName}} {{lastName}}</h2>
  <!-- 方式2 -->
  <h2>{{firstName + ' ' + lastName}}</h2>
  <!-- 方式3 -->
  <h2>{{getFullName()}}</h2>
  <!-- 方式4 -->
  <h2>{{fullName}}</h2>
</div>
```

```js
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      firstName: 'Yuanyang',
      lastName: 'Liao',
    },
    computed: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    },
    methods: {
      getFullName: function() {
        return this.firstName + ' ' + this.lastName
      }
    }
  })
</script>
```

#### 2、计算属性set和get
计算属性的原理和vue的响应式一样通过get和set操作实现，我们通常使用的是get函数，而set函数是当数据变化时调用

```html
 <div class="hello">
    <div id="example">
      <p>firstName值: {{firstName}}</p>
      <p>fullName值: {{fullName}}</p>
    </div>
    <button @click="ClickCeshi">点击改变fullName的值</button>
  </div>
```

```js
<script>
  data () {
    return {
      firstName: 'Foo'
    }
  },
  methods: {
    ClickCeshi () {
      this.firstName = 'fullName的新值'
    }
  },
  computed: {
    fullName: {
      get: function () {
        console.log('调用了getter属性')
        return '***' + this.firstName + '***'
      },
      set: function (newValue) {
        console.log('调用了settter属性')
        console.log(newValue)
        this.firstName = newValue
      }
    }
  }
// get是默认调用的，set是当数据变化时调用,可以在这里面定义相应的操作
</script>
```

#### 3、和methods的区别
* computed 是属性调用，而 methods 是函数调用
* computed 带有缓存功能，而 methods 没有
因为computed带有缓存功能，所以重新计算的时候需要基于数据变化，如果没变化调用返回的还是上一次计算结果,对于一些复杂的运算都应该使用计算属性

### 表单绑定v-model
#### 1、v-model基本使用
当我们在输入框输入内容时，因为 input 中的 v-model 绑定了 message，所以会实时将输入的内容传递给 message，message 发生改变，当 message 发生改变时，因为使用了 Mustache 语法，所以将 message 的值插入到 DOM 中，所以 DOM 会发生响应的改变，所以通过 v-model 实现了双向绑定。
![](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/20200305203810.png)

#### 2、v-model原理
v-model 其实是一个语法糖，它的背后本质上是包含两个操作：
* v-bind 绑定一个 value 属性
* v-on 指令给当前元素绑定 input 事件

```html
<!-- 这两个是等效的 -->
<input type="text" v-model="message">
<input type="text" :value="message" @input="message = $event.target.value">
```

#### 3、v-model使用场景
***`结合radio使用`***
```js
<div class="app">
  <label for="male">
    <input type="radio" v-model="gender" id="male" value="男">男
  </label>
  <label for="female">
    <input type="radio" v-model="gender" id="female" value="女">女
  </label>
  <h3>您选择的性别是：{{gender}}</h3>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      gender: '男'
    }
  });
</script>
```

***`结合checkbox使用`***

```js
<div class="app">
  <!-- checkbox单选框 -->
  <label for="licence">
    <input type="checkbox" v-model="isAgree" id="licence">同意协议
  </label>
  <h3>您的选择是：{{isAgree}}</h3>
  <button :disabled="!isAgree">下一步</button>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      isAgree: false
    }
  });
</script>
```

```js
// 多选框
<div class="app">
  <h3>请选择您的爱好</h3>
  <label for="sing">
    <input type="checkbox" v-model="hobbies" id="sing" value="唱">唱
  </label>
  <label for="jump">
    <input type="checkbox" v-model="hobbies" id="jump" value="跳">跳
  </label>
  <label for="rap">
    <input type="checkbox" v-model="hobbies" id="rap" value="rap">rap
  </label>
  <label for="basketball">
    <input type="checkbox" v-model="hobbies" id="basketball" value="篮球">篮球
  </label>
  <h3>您的爱好是：{{hobbies}}</h3>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      hobbies: []
    }
  });
</script>
```

***`结合select使用`***
```js
<div class="app">
  <!-- 选择一个值 -->
  <h3>请选择您喜欢的水果：</h3>
  <select name="" v-model="fruit">
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="橘子">橘子</option>
    <option value="西瓜">西瓜</option>
    <option value="榴莲">榴莲</option>
  </select>
  <h3>您选择的水果是：{{fruit}}</h3>

  <!-- 选择多个值 -->
  <select name="" v-model="fruits" multiple>
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="橘子">橘子</option>
    <option value="西瓜">西瓜</option>
    <option value="榴莲">榴莲</option>
  </select>
  <h3>您选择的水果是：{{fruits}}</h3>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      fruit: '苹果',
      fruits: []
    }
  });
</script>
```

#### 4、v-model修饰符
* `lazy 修饰符`
  默认情况下，v-model 是在 input 事件中同步输入框的数据，也就是说，一旦有数据发生改变，对应的 data 中的数据就会自动发生改变lazy 修饰符可以让数据在失去焦点或者回车时才会更新
* `number 修饰符`
  默认情况下，在输入框中无论输入的是字母还是数字，都会被当做字符串类型进行处理，但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字处理number 修饰符可以让在输入框中输入的内容自动转成数字类型
* `trim 修饰符`
  如果输入的内容首尾有很多空格，通常我们希望将其去除trim 修饰符可以过滤内容左右两边的空格

```js
<div class="app">
  <!-- 1.lazy修饰符：失去焦点或按下回车才更新 -->
  <input type="text" v-model.lazy="name">
  <h2>{{name}}</h2>
  <!-- 2.number修饰符：将输入框中的内容自动转为number -->
  <input type="number" v-model.number="age">
  <h2>{{age}}---{{typeof age}}</h2>
  <!-- 3.trim修饰符：过滤内容左右两边的空格 -->
  <input type="text" v-model.trim="name">
  <h2>你输入的名字是:{{name}}</h2>
</div>
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      name: 'YuanyangLiao',
      age: 18,
    }
  });
</script>
```



## 控制逻辑
### 事件监听v-on
#### 1、v-on的基本使用
v-on主要的应用场景就是事件的监听，比如点击，拖拽，键盘等等事件

```html
<template>
 <div class="App">
  <!-- 常规写法 -->
  <!-- <button v-on:click="increment">+</button> -->
  <!-- 语法糖形式 -->
  <!-- <button @click="decrement">-</button> -->

  <!-- 2.事件调用的方法有参数 -->
  <button @click="btnClick()">按钮1</button>
  <!-- undefined -->
  <button @click="btnClick(123)">按钮2</button>
  <!-- 123 -->
  <button @click="btnClick">按钮3</button>
  <!-- MouseEvent对象：vue会默认将浏览器产生的event对象作为参数传到方法中 -->

  <!-- 3.在事件定义时，即需要event对象，又需要其他参数 -->
  <button @click="btnClick(123,$event)">按钮</button>

</div>
</template>
```
```js
<script>
export default {
  name: 'App',
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    btnClick (event, num) {
      console.log(event, num)
    }
  }
}
</script>
```

![](https://hexo-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/20200305164748.png)

#### 2、v-on修饰符

在某些情况下，我们拿到 event 的目的可能是进行一些事件处理，vue 提供了修饰符来帮助我们方便的处理一些事件：
* .stop ：调用 event.stopPropagation()
* .prevent ：调用 event.preventDefault()
* .{keyCode | keyAlias} ：只当事件是从特定键触发时才触发回调
* .native ：监听组件根元素的原生事件
* .once ：只触发一次回调
* .capture： 捕获冒泡，即有冒泡发生时，有该修饰符的dom元素会先执行，如果有多个，从外到内依次执行，然后再按自然顺序执行触发的事件
* . self：将事件绑定到自身，只有自身才能触发，通常用于避免冒泡事件的影响
```html
<div class="app">
  <!-- 1 .stop:停止冒泡 -->
  <div @click="divClick">divdiv
    <button @click.stop="btnClick">按钮</button>
  </div>
  <!-- 如果不使用stop子事件触发会向父div传递，会打印divClick，这里使用stop就不会打印 -->

  <!-- 2. .prevent:阻止默认行为 -->
  <form action="baidu" method="post">
    <input type="submit" value="提交" @click.prevent="submitClick">
  </form>
  <!-- 这里使用prevent会阻止默认事件发生，但是不会影响冒泡 -->

  <!-- 3. .enter:监听enter按键 -->
  <input type="text" @keyup.enter="enterClick">

  <!-- 4. .once:点击回调只会触发一次 -->
  <button @click.once="btnClick2">按钮2</button>

  <!-- 5. 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div v-on:click.capture="doThis">...</div>

  <!-- 6. 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
</div>
```
```js
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      counter: 0
    },
    methods: {
      btnClick() {
        console.log("btnClick...")
      },
      divClick() {
        console.log("divClick...")
      },
      submitClick() {
        console.log("submitClick...")
      },
      enterClick() {
        console.log("enterClick...")
      },
      btnClick2() {
        console.log("btnClick2...")
      }
    }
  })
</script>
```

### 条件判断
#### 1、v-if和v-show
两者主要区别：
* v-if 是真正的条件渲染，会确保在切换过程中，条件块内的事件和子组件被销毁和重建（组件被重建将会调用created）
* v-show 不论如何，都会被渲染在 DOM 中，当条件为真值时，将会修改条件的 css 样式
* v-if 有更高的切换开销，v-show 有更高的初始渲染开销
* v-if 是动态的向 DOM 树内添加或者删除 DOM 元素，v-show 是通过设置 DOM 元素的 display 样式属性控制显隐
* v-if 切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件，v-show 只是简单的基于 css 切换
* v-if 是惰性的，如果初始条件为假，则什么也不做，只有在条件第一次变为真时才开始局部编译，v-show 是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且 DOM 元素保留
* v-if 有更高的切换消耗，v-show 有更高的初始渲染消耗
* v-if 适合运营条件不大可能改变，v-show适合频繁切换

```html
<div class="app">
  <span v-if="isUser">
    <label for="username">用户账号</label>
    <input type="text" id="username" placeholder="用户账号" key="username">
  </span>
  <span v-else>
    <label for="email">用户邮箱</label>
    <input type="text" id="email" placeholder="用户邮箱" key="email">
  </span>
  <button @click="isUser = !isUser">切换类型</button>
</div>
```
```js
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      isUser: true
    }
  })
</script>
// 这里如果频繁切换使用v-show更好
```

### 循环v-for
#### 1、遍历数组
```html
<div class="app">
  <ul>
    <!-- 1.遍历数组的值 -->
    <li v-for="item in NBAStars">{{item}}</li>
    <!-- 2.遍历数组的索引和值 -->
    <li v-for="(item,index) in NBAStars">{{index+1}}.{{item}}</li>
  </ul>
</div>
```
```js
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      NBAStars: ['林书豪', '杜兰特', '詹姆斯', '欧文', '库里']
    }
  })
</script>
```
#### 2、遍历对象
```html
<div class="app">
  <ul>
    <!-- 1.遍历对象的值 -->
    <li v-for="item in info">{{item}}</li><br>
    <!-- 2.遍历对象的键和值 -->
    <li v-for="(item,key) in info">{{key}} : {{item}}</li><br>
    <!-- 3.遍历对象的索引、键和值 -->
    <li v-for="(item,key,index) in info">{{index+1}}. {{key}} : {{item}}</li>
  </ul>
</div>
```
```js
<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '.app',
    data: {
      info: {
        name: 'LiaoYuanyang',
        age: 18,
        gender: '男',
        height: 1.75
      }
    }
  })
</script>
```
#### 3、key属性

***索引错位***

主要有时候绑定的是索引，如果有时候动态渲染数据就会出现错位现象，详情可以参考这篇文章 [https://www.cnblogs.com/yangpeixian/p/11707069.html](https://www.cnblogs.com/yangpeixian/p/11707069.html)

***效率update***

涉及到虚拟dom和diff算法，可以参考这篇文章 [https://blog.csdn.net/shicl/article/details/81392385](https://blog.csdn.net/shicl/article/details/81392385)



