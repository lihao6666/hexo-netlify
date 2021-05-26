---
title: Hexo博客之音乐播放思考
date: 2020-04-02 15:02:18
tags: hexo
categories: blog
top: 96
---
![三毛](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/20200203215950.png)
{% note success %}
一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。
                                                    <p align="right"> -- 三毛
{% endnote %}

## 一、网易云链接
这个可以先进网易云找到想要播放的歌曲，然后可以选择生成外链的，如下：
```html
<iframe 
 frameborder="no" border="0" 
 marginwidth="0" marginheight="0" 
 width=530 height=310 
 src="//music.163.com/outchain/player?type=0&id=2205641361&auto=0&height=430">
</iframe>
```

## 二、Aplayer
hexo已经提供了hexo-tag-aplayer插件来使用标签在Markdown中使用，先安装插件
```cmd
npm install hexo-tag-aplayer --save
```
<!--more-->

### 1、默认的aplayer播放器
#### *单曲播放*
默认的aplayer标签需要指定歌曲的url和封面的图片，使用参数如下：
```html
{% aplayer "title" "author" "url" "pic_url" "lrc:caffeine.txt" %}
```
- title : 曲目标题
- author: 曲目作者
- url: 音乐文件 URL 地址
- picture_url: (可选) 音乐对应的图片地址
- narrow: （可选）播放器袖珍风格
- autoplay: (可选) 自动播放，移动端浏览器暂时不支持此功能
- width:xxx: (可选) 播放器宽度 (默认: 100%)
- lrc:xxx: （可选）歌词文件 URL 地址

#### *歌单播放*

也可以配置播放歌单，多曲目播放，使用参数如下：
```html
{% aplayerlist %}
{
    "narrow": false,                          // （可选）播放器袖珍风格
    "autoplay": true,                         // （可选) 自动播放，移动端浏览器暂时不支持此功能
    "mode": "random",                         // （可选）曲目循环类型，有 'random'（随机播放）, 'single' (单曲播放), 'circulation' (循环播放), 'order' (列表播放)， 默认：'circulation' 
    "showlrc": 3,                             // （可选）歌词显示配置项，可选项有：1,2,3
    "mutex": true,                            // （可选）该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停
    "theme": "#e6d0b2",	                      // （可选）播放器风格色彩设置，默认：#b7daff
    "preload": "metadata",                    // （可选）音乐文件预载入模式，可选项： 'none' 'metadata' 'auto', 默认: 'auto'
    "listmaxheight": "513px",                 // (可选) 该播放列表的最大长度
    "music": [
        {
            "title": "CoCo",
            "author": "Jeff Williams",
            "url": "caffeine.mp3",
            "pic": "caffeine.jpeg",
            "lrc": "caffeine.txt"
        },
        {
            "title": "アイロニ",
            "author": "鹿乃",
            "url": "irony.mp3",
            "pic": "irony.jpg"
        }
    ]
}
{% endaplayerlist %}
```

### 2、使用meting播放
上面的自带播放器比较麻烦，现在aplayer支持使用meting来播放网易云、QQ音乐、虾米音乐、酷狗音乐等，所以使用起来会更加方便

#### *修改hexo配置文件*
添加如下：
```
aplayer:
  meting: true
```

#### *使用示例*
```
<!-- 简单示例 (id, server, type)  -->
{% meting "60198" "netease" "playlist" %}

<!-- 进阶示例 -->
{% meting "60198" "netease" "playlist" "autoplay" "mutex:false" "listmaxheight:340px" "preload:none" "theme:#ad7a86"%}
```

选项 | 默认值 | 描述
-|-|-|
id	|必须值|歌曲 id / 播放列表 id / 相册 id / 搜索关键字
server |必须值|	音乐平台: netease, tencent, kugou, xiami, baidu
type|	必须值|	song, playlist, album, search, artist
fixed|	false|	开启固定模式
mini|	false|	开启迷你模式
loop	|all	|列表循环模式：all, one,none
order	|list|	列表播放模式： list, random
volume	|0.7	|播放器音量
lrctype	|0|	歌词格式类型
listfolded|	false|	指定音乐播放列表是否折叠
storagename|	metingjs|	LocalStorage 中存储播放器设定的键名
autoplay	|true	|自动播放，移动端浏览器暂时不支持此功能
mutex	|true|	该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停
listmaxheight	|340px|	播放列表的最大长度
preload	|auto|	音乐文件预载入模式，可选项： none, metadata, auto
theme	|#ad7a86|	播放器风格色彩设置

#### *pjax问题*
因为自己网站开启了pjax选项，这里播放歌单音乐后，切换页面不会暂停播放，但是有个问题就是aplayer实例被占用，所以重新进入页面播放器就不会显示，可以通过清理aplayer实例来实现，这里使用官网的代码发现没有什么用，所以使用强制刷新,算是解决了这个问题

* 在`_data/body-end.swig`文件中添加调用js代码
```html
{% if page.type ==='music' %}
  <script src="/js/cleanaplayer.js"></script>
{% endif %}
```
* 在相应的文件夹下创建文件，写入代码如下
```js

if (window.aplayers) {
    for (let i = 0; i < window.aplayers.length; i++) {
        window.aplayers[i].destroy();
        location.reload()
    }
    window.aplayers = [];
}
```
这里只是解决了重新回到这个页面的问题，但是还存在一个问题，就是第一次进入这个页面时pjax进入的，所以不会渲染出来，要刷新才可以出现，这个bug，我想了半天还是未找到办法，目前还是手动解决。



