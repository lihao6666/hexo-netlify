---
title: linux下ss搭建
date: 2019-09-29 17:41:38
tags: linux-ss
categories: linux
---

# Linux Mint配置2（ss科学上网）
## 一 . 服务器的搭建（VPS）
### 1. 在合适的VPS网站上购买VPS（vultr推荐），记住ip，password
### 2. 进入服务器的控制面板（这里也建议通过ssh，因为浏览器进入控制面板的终端很low，曾经被虐的很惨）
	  命令格式：ssh root@ip（这里第一次登陆时可能会让你输入用户名和密码，需要你输入你买VPS注册得账号密码）
![ssh](https://cdn-images-1.medium.com/max/1600/0*VK1s3NgNSJKpbvUD.jpg)
### 3. 输入密码一路回车到出现root@···即可 
### 4. 部署服务器端（这里有代码）
	1. wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
	2. chmod +x shadowsocks.sh
	3. ./shadowsocks.sh 2>&1 | tee shadowsocks.log
	4.  剩下自己按照提示输入就行，结束后回到桌面会发现这个文件
## 二. Linux安装ss并配置开机启动
### 1. 下载ss
	1. sudo apt-get install python-pip //安装pip
	2. sudo apt-get install shadowsocks//安装ss
### 2. 修改配置文件
	1. 在/etc/下创建文件ss.json (名字随意路径也可以自己选择）
	2. 编辑配置文件sudo vim /etc/ss.json
```
	{
		"server":"my_server_ip",//代理ip
		"server_port":my_port,//代理端口
		"password":"passwd",//密码
		"method":"aes-256-cfb"//没有逗号
	}
```
	3. 打开终端输入sslocal -c /etc/ss.json（如果不报错打开google测试即可）
### 3. 可能出现问题
```
	运行sslocal 报错
	AttributeError: /usr/lib/x86_64-Linux-gnu/libcrypto.so.1.1: undefined symbol: EVP_CIPHER_CTX_cleanuphttp://www.cnblogs.com/lzhd24/p/6686803.html
```
	1. 用vi打开文件：vi /usr/local/lib/python2.7/dist-packages/shadowsocks/crypto/openssl.py
	2. 将第52行libcrypto.EVP_CIPHER_CTX_cleanup.argtypes = (c_void_p,) 改为libcrypto.EVP_CIPHER_CTX_reset.argtypes = (c_void_p,)
	3. 再次搜索cleanup（全文件共2处，此处位于111行），将libcrypto.EVP_CIPHER_CTX_cleanup(self._ctx) 改为libcrypto.EVP_CIPHER_CTX_reset(self._ctx)
	4.保存退出继续运行sslocal -c 命令
### 4.设置开机启动项
	系统有开机启动项设置，这里可以在开机启动项里设置加入启动命令即可（这里rc.local)出现问题，在新版本ubuntu中不执行
### 5.设置终端运行（前面设置的ss不是全局代理，终端无法ping 谷歌）
#### (1)安装polipo（支持socks6）
	sudo apt install polipo
#### (2) 编辑配置文件，保存到/etc/polipo/config
```
# This file only needs to list configuration variables that deviate
# from the default values.  See /usr/share/doc/polipo/examples/config.sample
# and "polipo -v" for variables you can tweak and further information.
 
logSyslog = true
logFile = /var/log/polipo/polipo.log
 
proxyAddress = "0.0.0.0"
 
socksParentProxy = "127.0.0.1:1080"
socksProxyType = socks5
 
chunkHighMark = 50331648
objectHighMark = 16384
 
serverMaxSlots = 64
serverSlots = 16
serverSlots1 = 32 
```
#### (3)重启polipo
	sudo service polipo restart
	curl google.com（看看是否有用）
#### (4)添加环境变量，要不然只能这一个终端可以使用（vim ～/.bashrc)(添加后source /etc/profile 让环境变量立即生效）

	export http_proxy="http://127.0.0.1:8123"
	export https_proxy="https://127.0.0.1:8123"
