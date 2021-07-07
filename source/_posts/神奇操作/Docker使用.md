---
title: Docker使用
date: 2021-01-04 09:21:17
tags: docker
categories: 神奇操作
top: 98
---
## docker原理

[docker原理](http://dockone.io/article/2941)

- 进程隔离（命名空间）
- Docker 通过 Linux 的命名空间实现了网络的隔离，又通过 iptables 进行数据包转发
- 目录隔离
- 物理资源的隔离
- 镜像的layer(可读)，容器是最上层(可写可读)
- 与虚拟机的区别

## 基础使用

### 一、基本命令

* docker search [镜像名字] //搜索镜像
* docker pull [镜像名字]  //拉取镜像
* docker images //查看安装的镜像
* docker rmi [id] //删除安装的镜像 docker rm [id] //删除容器
* docker ps // 查看现在运行的容器 docker ps -a //查看所有的容器
* docker ps -q- //查看正在运行的容器的id

<!--more-->
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

### 一、查看日志
命令格式：

```cmd
docker logs [OPTIONS] CONTAINER
  Options:
        --details        显示更多的信息
    -f, --follow         跟踪实时日志
        --since string   显示自某个timestamp之后的日志，或相对时间，如42m（即42分钟）
        --tail string    从日志末尾显示多少行日志， 默认是all
    -t, --timestamps     显示时间戳
        --until string   显示自某个timestamp之前的日志，或相对时间，如42m（即42分钟）
```
查看当前运行容器的实时日志:
```cmd
docker logs --tail 10000 -f [容器id]
```
### 二、docker容器文件拷贝

容器中文件拷贝到本地：

```cmd
docker cp [容器名称]:[容器中文件或者文件夹路径] [本地路径]
```
本地文件拷贝到容器中：
```cmd
docker cp [本地路径] [容器名称]:[容器中文件或者文件夹路径] 
```

### 三、查看容器运行的ip地址

```cmd
docker inspect [容器名字] | grep IPAddress
```

## 进阶使用

### 一、docker-compose使用

[docker-compose使用](https://www.runoob.com/docker/docker-compose.html)



### 二、dockerfile使用

[dockerfile使用](https://www.runoob.com/docker/docker-dockerfile.html)

### 三、配合使用

比如下面的应用场景，我们拉取了一个镜像，但是镜像中还有些环境需要配置，比如一些python包没安装，这时候我们需要使用Dockerfile将自己需要的python库打包到相对应的镜像中，Dockerfile内容如下:

```Dockerfile
FROM osimis/orthanc

# RUN echo '这是一个本地构建的nginx镜像' 
# COPY ./orthanc.json /etc/orthanc/orthanc.json
RUN apt install python3-pip \
&& pip3 install pymysql \
&& pip3 install pyjwt
```

下面我们需要使用docker-compose先构建对应的镜像，然后再运行容器，docker-compose.yml内容如下:

```yml
version: "3.3"
services:
    orthanc:
        build:
            context: ./orthanc                 # 指定Dockerfile文件所在路径
            dockerfile: Dockerfile             # 指定Dockerfile文件名
        ports: ["8000:8042"]
        image: orthanc-dev                     # 有build了，image为构建镜像的名字
        container_name: orthanc
        environment:
            ORTHANC__NAME: "orthanc"
            VERBOSE_ENABLED: "false"
            VERBOSE_STARTUP: "false"
            PYTHON_PLUGIN_ENABLED: "true"
            ORTHANC__PYTHON_SCRIPT: "/etc/orthanc/python/test.py"
            ORTHANC__PYTHON_VERBOSE: "false"
            # ORTHANC__LUA_SCRIPYS: "/etc/orthanc/python/test.lua"
            ORTHANC__AUTHENTICATION_ENABLED: "false"
        volumes:
            - ./orthanc/python:/etc/orthanc/python
            - ./orthanc/orthanc-db:/var/lib/orthanc/db
```



