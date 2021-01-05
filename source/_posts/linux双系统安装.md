---
title: linux双系统安装
date: 2019-09-29 17:40:27
tags: linux
categories: linux
---

# Linux Mint 配置1（GRUB）
***
## 1. 删除原来的Linux
### 一 修复MBR（主引导记录）
	1. 下载MbrFix软件，下载地址为http://www.sysint.no/mbrfix（注意64位）
	2. 先右键打开软件以管理员运行，然后cmd进入文件夹输入
	3. 输入：32位：MbrFix/drive 0 fixmbr
		    64位：MbrFix64/drive 0 fixmbr
	4. 输入Y， OK！！！
### 二 删除数据（Ubuntu）
	1. 进入磁盘管理
	2. 点击没有名字的分区，删除（就是没有像D：这样的盘符）
	3. 重启

	
## 2. 下载需要安装的Linux，使用软件做启动盘（略）
## 3. GRUB引导（双显卡）
	1. 开机bios先选择u盘启动，然后F10保存进入Linux引导界面
	2. 按e编辑grub，到quiet splash 一行，在后面加上nouveau.modeset=0（禁用n卡），然后F10进入安装（也可以删除quiet splash，这样很装逼，你可以看见电脑进程启动记录）
	3. 到了分配空间最好选择自动分配，会自动选择你删除的那个盘，然后分区
## 4. 修改GRUB
	
	1. sudo vi /etc/default/grub
	2. 在quiet splash后面加入nouveau.modeset=0，保存
	3. sudo update-grub
