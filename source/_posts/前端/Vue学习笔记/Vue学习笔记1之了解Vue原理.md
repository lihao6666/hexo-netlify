---
title: Vue学习笔记1之了解Vue原理
date: 2020-02-26 22:01:06
tags: Vue
categories:
- 前端
- Vue
top: 99
---

## MVVM
讲到MVVM，就要提到MVC，这里也对MTV进行总结，一起了解这三种框架结构原理

### MVC

要素 | 功能
-|-|
M(Model)| 数据模型，用来处理数据库数据事务
V(View) | 视图，基于Model返回的数据进行处理，后面将视图传给浏览器
C(Contorller) | 控制器，用于Model和View之间进行数据逻辑处理等等操作

`MVC`的通信是单向的，主要流程是`V->C->M->C->V`

<!--more-->

### MTV

要素 | 功能
-|-|
M(Model)| 数据模型，用来处理数据库数据事务
T(Template) | 模板，相当于MVC中的视图，用来处理页面展示
V(View) | 视图，这里的视图是用来处理业务逻辑

与MVC相比，MTV的view用来处理请求，接受数据，然后与模型层通信，模型层处理完后将数据返回视图层，视图再调用模板层返回html给自己，然后再返回浏览器，主要流程是
`V->M->V->T->V`

### MVVM

想想之前在用SSM开发的过程中，MVC给自己的感觉就是，DOM层(也就是视图层)与数据之间依赖关系错综复杂，功能多了就会越来越乱。所以MVVM出现了，实现了数据与视图的分离，也就是DOM操作被封装起来，通过`数据驱动视图`。

要素 | 功能
-|-|
M(Model)| 数据模型，用来处理数据库数据事务
V(View) | 视图，用来展示信息的DOM层
VM(VueModel) | 视图模型层，实现数据绑定的关键

![MVVM模型](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/20200226225129.png)

其中View通过View-Model的DOM Listeners将事件绑定到Model上，而Model则通过Data Bindings来管理View中的数据。

## MVVM实现原理

参考文章: [MVVM实现原理](https://segmentfault.com/a/1190000015895017)

MVVM的实现主要是三个核心点：

* 响应式：vue如何监听data的属性变化
* 模板解析：vue的模板是如何被解析的
* 渲染：vue模板是如何被渲染成HTML的

### 响应式
如何监听数据变化，就要先知道数据是如何被访问和修改的，还记得`get()`函数和`set()`函数，在学习python或者model的时候应该都接触过这些方法，vue就是通过检测data中的属性访问与修改实现响应式。

```js
//通过Object.defineProperty实现数据检测
var vm = {}
var data = {
    name: 'zhangsan',
    age: 20
}
var key, value
for (key in data) {
    (function (key) {
        Object.defineProperty(vm, key, {
            get: function () {
                console.log('get', data[key]) // 监听
                return data[key]
            },
            set: function (newVal) {
                console.log('set', newVal) // 监听
                data[key] = newVal
            }
        })
    })(key)
}

```
### 模板解析

就是如何将模板代码转化为`AST`语法树，后面读源码再补充吧，希望会有机会，哈哈哈

### 模板渲染

模板解析为render函数然后render成vnode(虚拟的DOM节点树),然后接着首先读取当前的虚拟DOM——vm._vnode,判断其是否为空，若为空，则为初次渲染，将虚拟DOM全部渲染到所对应的容器当中（vm.$el），若不为空，则是数据发生了修改，通过响应式我们可以监听到这一情况，使用diff算法完成新旧对比并修改。

```js
// 渲染函数
vm._update(vnode){
  const prevVnode = vm._vnode
  vm._vnode = vnode
  if (!prevVnode){
    vm.$el = vm.__patch__(vm.$el,vnode)
  } else {
    vm.$el = vm.__patch__(prevVnode,vnode)
  }
}

function updateComponent(){
  vm._update(vm._render())
}
```

## Vue实例

### Vue数据与方法

当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值，`值得注意的是只有当实例被创建时就已经存在于 data 中的属性才是响应式的`，所以在初始化data的时候如果没有值要先声明设置为空等属性。

***数据选项***

***选项*** | ***功能***
-|-|
data| vue的实例数据对象，在组件中data必须被声明为一个对象被返回，因为组件可能被用来创建多个实例
props | 用于接收父组件的数据，可以是数组或者对象
propsData | 创建是传递props
computed | 计算属性，可以绑定对data的计算操作，
methods | Vue实例的操作属性，可以绑定方法，且可以被vm通过实例属性访问



### Vue实例属性和方法

官网地址 [vue实例属性](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)

#### 实例属性

***组件树:***

***选项*** | ***功能***
-|-|
$parent | 用来访问组件实例的父实例
$root | 用来访问当前组件树的根实例
$children | 用来访问当前组件实例的直接子组件实例
$refs | 用来访问v-ref指令的子组件

***DOM访问:***

***选项*** | ***功能***
-|-|
$el | 用来挂载当前组件实例的dom元素
$els | 用来访问$el元素中使用了v-el指令的DOM元素

***数据方法访问***

***选项*** | ***功能***
-|-|
$data | 访问实例数据
$options | 访问自定义方法
$props | 访问props对象属性


#### 实例方法

***数据访问:***

***选项*** | ***功能***
-|-|
$watch | 监听表达式或者函数结果的变化

***方法访问:***

***选项*** | ***功能***
-|-|
$on | 监听自定义事件，事件由vm.$emit触发
$emit | 触发自定义事件
```js
# $on例子
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```

***生命周期访问:***

`待补充`

### Vue生命周期

主要过程有`init()`->`beforeCreated`->`created`->`beforeMount`->`mounted`->`beforeUpdate`->`updated`->`beforeDestroy`->`destroyed`，下面是Vue实例生命周期解析图:

![Vue生命周期解析图](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/20200226233022.png)

***生命周期函数*** | ***功能***
-|-|
init()| 初始化阶段，当前实例只有默认的生命周期函数，data和methods还没有初始化
beforeCreate | 初始化data和methods前的初始化阶段
created | 创建阶段时data和methods已经初始化完成，但是未被渲染
beforeMount | 模板编译好的阶段，但是未加载到DOM中去，还在内存中
mounted | Vue实例初始化完成阶段，模板已经加载到DOM中
beforeUpdate | 数据未同步阶段
updated | 数据被重新渲染加载到DOM中
beforeDestroy | 未开始销毁阶段，实例属性和方法还可以访问
destroyed | 销毁完全，实例组件完全销毁