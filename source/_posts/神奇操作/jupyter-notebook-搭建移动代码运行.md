---
title: jupyter notebook 搭建移动代码运行
date: 2019-09-28 10:05:20
tags: linux
categories: linux
---
# 服务器搭建jupyter notebook
***
## 一、安装
```python
    #先购买一个虚拟服务器、如腾讯的校园服务器
    pip3 install jupyter
```
## 二、生成访问密码
1.进入服务器python3
2.输入
```
  from notebook.auth import passwd
  passswd()
  #输入密码，重复，复制生成的密文
```
## 三、修改配置文件
```
  #生成配置文件
  jupyter notebook --generate-config
```
```
  #修改配置文件
  # 找到下面几项将前面的#去除，并进行相应的修改

  # 设定ip访问，允许任意ip访问
  c.NotebookApp.ip = '*'
  # 不打开浏览器
  c.NotebookApp.open_browser = False
  # 用于访问的端口，设定一个不用的端口即可，这里设置为7000
  c.NotebookApp.port = 7000
  # 设置登录密码， 将刚刚复制的内容替换此处的xxx
  c.NotebookApp.password = u'xxx'
  # 保存退出即可
```
## 四、运行jupyter notebook
```
  #可以使用screen运行和ctrl + a + d快捷键
  jupyter notebook --allow-root
```
## 五、浏览器登录

进入浏览器输入服务器ip+端口号即可

## 六、ipad使用技巧
```
  因为jupyter支持远程访问、我们完全可以通过ipad 网址加端口号访问，ipad也可以通过termius远程控制应用开启关闭，具体参考上一节
```

## 七、可能遇到的问题

```
  有些服务器没有安装python或者pip，百度安装

  pip更新

```