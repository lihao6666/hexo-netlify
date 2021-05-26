---
title: HTML
date: 2021-01-01 10:12:36
tags: html
categories: 
- 前端
- html+css
---

## 基础


### 一、常用标签
#### 块级元素和行内元素

*块级元素*
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/html.png)

*行内元素*
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/%E8%A1%8C%E5%86%85%E5%85%83%E7%B4%A0.png)

#### meta

##### 1、用于seo优化

```html
<meta name="Description" content="网易是中国领先的互联网技术公司，为用户提供免费邮箱、游戏、搜索引擎服务，开设新闻、娱乐、体育等30多个内容频道，及博客、视频、论坛等互动交流，网聚人的力量。" />
```

##### 2、用于计时跳转到指定页面

```html
<meta http-equiv="refresh" content="3;http://www.baidu.com">
```

##### 3、用于指定路径

```html
<base href="/">
```
使用这个标签后，所有的a链接以这个链接路径为基准


#### 超链接

##### 1、外部链接

```
<a href="http://www.baidu.com" target="_blank">点我点我</a>
```
`target = "_blank"`表示新窗口打开链接

##### 2、锚链接(实现当前页跳转)

```html
<a name="miao">gigi</a>
<a href="#miao">回到顶部</a>
<!-- 可以实现当前页面跳转 -->
```

```html
<a href="xx.html#tips"/>   <!--这里写需要定位的-->
<a name="tips"/>      <!--被定位的-->
<!-- 不同页面跳转 -->
```


##### 3、邮件链接

```
<a href="mailto:xxx@163.com">点击进入我的邮箱</a>
```
参数详解：

* href：目标URL
* title：悬停文本。
* name：主要用于设置一个锚点的名称。
* target：告诉浏览器用什么方式来打开目标页面。target属性有以下几*个值：
    * _self：在同一个网页中显示（默认值）
    * _blank：在新的窗口中打开。
    * _parent：在父窗口中显示
    * _top：在顶级窗口中显示

#### img标签

```html
<img src="images/1.jpg" width="300" height="`188" title="哈哈哈" alt="图片无法加载">
```

属性详解：

* width/height 图片的长宽
* alt 设置图片无法加载显示的内容
* title 图片标题





#### 表格标签

##### 1、无序列表 

`<ul>`,无序列表中的每一项是`<li> `
type = "disc/circle/square"

##### 2、有序列表 

`<ol>`，里面的每一项是`<li>`

##### 3、定义列表

```html
<dl>
    <dt>购物指南</dt> <!--第一项标题 -->
    <dd><!--定义子项-->
        <a href="#">购物流程</a>
        <a href="#">会员介绍</a>
        <a href="#">生活旅行/团购</a>
        <a href="#">常见问题</a>
        <a href="#">大家电</a>
        <a href="#">联系客服</a>
    </dd>
</dl>
<dl>
    <dt>配送方式</dt>
    <dd>
        <a href="#">上门自提</a>
        <a href="#">211限时达</a>
        <a href="#">配送服务查询</a>
        <a href="#">配送费收取标准</a>
        <a href="#">海外配送</a>
    </dd>
</dl>
```

##### 4、表格标签

```html
<table>
    <caption align="center">这是表格的标题</caption>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
```

*属性详解*(table)：
* cellpadding: 单元格内容到边的距离
* cellspacing: 单元格之间外边距
* width/height: 单元格长宽
* border: 边框设置

*属性详解*(td):
* colspan 横向合并
* rowspan 纵向合并

##### 5、框架标签

```html
<a href="文字页面.html" target="myframe">默认显示文字页面</a><br>
<a href="图片页面.html" target="myframe">点击进入图片页面</a><br>
<a href="表格页面.html" target="myframe">点击进入表格页面</a><br>

<iframe src="文字页面.html" width="400" height="400" name="myframe"></iframe>
<br>
```

#### 表单标签

##### 1、form(input,select,textarea等标签要在其中使用)

属性详解:

* name：表单的名称，用于JS来操作或控制表单时使用；
* id：表单的名称，用于JS来操作或控制表单时使用；
* action：指定表单数据的处理程序，一般是PHP，如：action=“login.php”
* method：表单数据的提交方式，一般取值：get(默认)和post


##### 2、input

*属性详解*:

* type:
    * text（默认）
    * password：密码类型
    * radio：单选按钮，名字相同的按钮作为一组进行单选（单选按钮，天生是不能互斥的，如果想互斥，必须要有相同的name属性。name就是“名字”。 ）
    * checkbox：多选按钮，name 属性值相同的按钮作为一组进行选择。
    checked：将单选按钮或多选按钮默认处于选中状态。当<input>标签设置为type="radio"或者type=checkbox时，可以用这个属性。属性值也是checked，可以省略。
    * hidden：隐藏框，在表单中包含不希望用户看见的信息
    * button：普通按钮，结合js代码进行使用。
    * submit：提交按钮，传送当前表单的数据给服务器或其他程序处理。这个按钮不需要写value自动就会有“提交”文字。这个按钮真的有提交功能。点击按钮后，这个表单就会被提交到form标签的action属性中指定的那个页面中去。
    * reset：重置按钮，清空当前表单的内容，并设置为最初的默认值
    * image：图片按钮，和提交按钮的功能完全一致，只不过图片按钮可以显示图片。
    * file：文件选择框。
    提示：如果要限制上传文件的类型，需要配合JS来实现验证。对上传文件的安全检查：一是扩展名的检查，二是文件数据内容的检查。

* value="内容"：文本框里的默认内容（已经被填好了的）

* size="50"：表示文本框内可以显示五十个字符。一个英文或一个中文都算一个字符。
    注意size属性值的单位不是像素哦。

* readonly：文本框只读，不能编辑。因为它的属性值也是readonly，所以属性值可以不写。
    用了这个属性之后，在google浏览器中，光标点不进去；在IE浏览器中，光标可以点进去，但是文字不能编辑。

* disabled：文本框只读，不能编辑，光标点不进去。属性值可以不写。

*label联动*:

```html
<input type="radio" name="sex" id="nan" /> <label for="nan">男</label>
<input type="radio" name="sex" id="nv"  /> <label for="nv">女</label>
<!-- 通过label的for属性和input的id属性保持一致实现了文字和选项的包裹 -->
```


##### 3、select

```html
<select>
    <option>小学</option>
    <option>初中</option>
    <option>高中</option>

</select>
```

*属性详解(select)*:
* multiple:多选
* size: 大于1表示滚动视图

*属性详解(option)*:
* selected: 选中


##### 4、textarea

属性详解:
* rows/cols: 文本行数和列数
* readonly: 只读



#### 特殊标签

* <sup> 上标如x的平方可以使用x<sup>2<sup>
* <sub> 下标
* <br> 换行标签









### 二、H5新特性


#### 新增语义标签

- `<section>` 表示区块

- `<article>` 表示文章。如文章、评论、帖子、博客

- `<header>` 表示页眉

- `<footer>` 表示页脚

- `<nav>` 表示导航

- `<aside>` 表示侧边栏。如文章的侧栏

- `<figure>` 表示媒介内容分组。

- `<mark>` 表示标记 (用得少)

- `<progress>` 表示进度 (用得少)

- `<time>` 表示日期

```html
<!-- 经典H5页面布局 -->
<!-- 头部 -->
<header>
    <ul class="nav"></ul>
</header>

<!-- 主体部分 -->
<div class="main">
    <!-- 文章 -->
    <article></article>
    <!-- 侧边栏 -->
    <aside></aside>
</div>

<!-- 底部 -->
<footer>

</footer>
```

#### 新增表单类型
- `email` 只能输入email格式。自动带有验证功能。

- `tel` 手机号码。

- `url` 只能输入url格式。

- `number` 只能输入数字。

- `search` 搜索框

- `range` 滑动条

- `color` 拾色器

- `time`	时间

- `date` 日期

- `datetime` 时间日期

- `month` 月份

- `week` 星期

#### 其它

* audio标签: 音频播放
* video标签: 视频播放


## 高级操作

### 一、拖拽

```html
<div class="box1" draggable="true">哈哈哈哈</div>
```
通过简单设置draggable属性可以实现元素的可拖拽

#### 1、拖拽事件监听

* ondragstart当拖拽开始时调用

* ondragleave 当鼠标离开拖拽元素时调用

* ondragend 当拖拽结束时调用

* ondrag 整个拖拽过程都会调用

#### 2、目标元素监听

* ondragenter 当拖拽元素进入时调用

* ondragover 当拖拽元素停留在目标元素上时，就会连续一直触发（不管拖拽元素此时是移动还是不动的状态）

* ondrop 当在目标元素上松开鼠标时调用

* ondragleave 当鼠标离开目标元素时调用

例子
```html
<body>
<div class="one" draggable="true"></div>
<div class="two"></div>

<script>
    var two = document.querySelector('.two');

    //目标元素的拖拽事件

    // 当被拖拽元素进入时触发
    two.ondragenter = function () {
        console.log("来了.");
    }

    // 当被拖拽元素离开时触发
    two.ondragleave = function () {

        console.log("走了..");
    }

    // 当拖拽元素在 目标元素上时，连续触发
    two.ondragover = function (e) {
        //阻止拖拽事件的默认行为
        e.preventDefault(); //【重要】一定要加这一行代码，否则，后面的方法 ondrop() 无法触发。

        console.log("over...");
    }

    // 当在目标元素上松开鼠标是触发
    two.ondrop = function () {
        console.log("松开鼠标了....");
    }
</script>
</body>
```
演示图片:
![演示视频](https://img.smyhvae.com/20180223_2240.gif)


### 二、web存储

#### 1、sessionStorage(窗口关闭销毁)

```js
window.sessionStorage.setItem('userName', txt.value);
window.sessionStorage.setItem('pwd', '123456');//设置更新数据
window.sessionStorage.removeItem('userName');//消除key数据
window.sessionStorage.clear();//清除所有数据
```

#### 2、 localStorage(永久生效，手动删除)

方法同上，使用window.localStorage.方法


## 参考
[Github文档地址](https://github.com/qianguyihao/Web.git)

