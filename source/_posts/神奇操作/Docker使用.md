---
title: Docker使用
date: 2021-01-04 09:21:17
tags: docker
categories: 神奇操作
top: 98
---

## 基础使用

### 一、基本命令

* docker search [镜像名字] //搜索镜像
* docker pull [镜像名字]  //拉取镜像
* docker images //查看安装的镜像
* docker rmi [id] //删除安装的镜像 docker rm [id] //删除容器
* docker ps // 查看现在运行的容器 docker ps -a //查看所有的容器
* docker ps -p //查看正在运行的容器的id

### 二、docker运行命令

```
docker run -it [镜像名字] /bin/bash 

```

参数说明：
* -i: 交互式操作。
* -t: 终端,可以使用`-it`实现直接进入容器，运行exit会直接停止容器
* ubuntu: ubuntu 镜像。
* /bin/bash：放在镜像名后的是命令
* 使用exit退出终端

```
docker run --name [容器别名] -itd [镜像名字] /bin/bash
docker run -itd --name mongo -p 27017:27017 mongo
```
参数说明：

* --name 会给容器一个别名，便于操作
* -itd -d参数不会进入容器，会后台运行
* 可以使用`docker exec -it [镜像id] /bin/bash进入镜像终端

```

* docker start //启动容器
* docker stop //停止容器
* docker restart //重新启动容器



## 进阶

后面补充