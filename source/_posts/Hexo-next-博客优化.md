---
title: Hexo next 博客优化
date: 2020-02-03 21:25:07
tags: hexo
categories: blog
top: 96
---
![三毛](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/20200203215950.png)
{% note success %}
一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。
                                                    <p align="right"> -- 三毛
{% endnote %}

## 一、文章编写优化
***
### 1、题头图片
* 基础方法(无法定义大小)
`![备注](url)`
* 修改图片方法
`<img src="" width=800 height=800 aligin=right >`
<!--more-->

### 2、开篇名言

* 修改`custom.styl`文件
```css
# 添加css
.note.success {
    font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, STKaiti, KaiTi, SimKai, DFKai-SB, 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    background-color: #fdf6e3;
    border-left-color: #fdf6e3;
}
```
* 编写技巧
```
{% note success %}
一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。
                                                    <p align="right"> -- 三毛
{% endnote %}
```
* 另一种方法(可以添加作者来源等)
```
{% blockquote David Levithan, Wide Awake https://lihao6666.cn 欢迎你的到来 %}
Do not just seek happiness for yourself. Seek happiness for all. Through kindness. Through mercy.
{% endblockquote %}
```
* 添加引用
```
{% cq %}Elegant in code, simple in core{% endcq %}
```

### 3、站内链接(跳转站内文章)
* 在文章内加入下面片段
```
# post_link 先是站内文章名字，然后是显示名字
{% post_link Cookie爬取Ajax数据 "爬虫" %}
```

### 4、站外链接(添加渐变)

* 修改文件 `themes\next\source\css\_common\components\post\post.styl`
```css
# 添加css代码
.post-body p a{
  color: #0593d3;
  border-bottom: none;
  border-bottom: 1px solid #0593d3;
  &:hover {
    color: #fc6423;
    border-bottom: none;
    border-bottom: 1px solid #fc6423;
  }
}
```
* 编写技巧
`[备注](url)` 
* 测试

[李浩的小窝](https://lihao6666.cn)

### 5、强调色(路径文件等)
* 修改`custom.styl`文件
```css
code {
    color: #dd4b39;
}
```

### 6、代码修改会增添
* 可以修改默认配色
```css
```diff /themes/next/_config.yml
 custom_file_path:
-  #style: source/_data/styles.styl
+  style: source/_data/styles.styl
```

### 7、添加相关推荐
在文章的最后添加tag相关的文章推荐，在主题文件夹下的`layout/_macro/post.swig`文件中的`post-footer`和`post-tags`中间添加如下代码:

```js
  {% if page.tags %}
      <div class="post-recommend"><h5 class="post-recommend-title">相关推荐:</h5></div>
      <ul class="popular-posts">
      {% for tag in page.tags.toArray() %}
        {% for post in tag.posts.toArray().slice('0','3') %}
          {% if post.title != page.title %}
              <li><a href={{ url_for(post.path) }}>{{ post.title }}</li>
          {% endif %}
        {% endfor %}
      {% endfor %}
      </ul>
  {% endif %}
```

## 二、博客访问优化

### 1、使用pjax
具体可以参考官网文档[pjax使用](https://theme-next.org/docs/third-party-services/external-libraries)
