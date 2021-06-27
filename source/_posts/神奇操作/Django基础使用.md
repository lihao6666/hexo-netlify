---
title: Django基础使用
date: 2021-04-05 14:06:06
tags: django
categories: 神奇操作
---

## 一、项目初始化

### 1、环境安装

```cmd
conda install django
``` 

### 2、项目初始化

```cmd
django-admin startproject 项目名
```

### 3、项目调试运行

```cmd
cd 项目名
python manage.py runserver 

```

### 4、数据库映射

```cmd
python manage.py makemigrations
python manage.py migrate
```

### 5、 创建app

```cmd
python manage.py startapp [app名字]
```

## 二、项目逻辑介绍

Django基于MTV开发模型，所以在使用的过程中需要根据具体需求进行配置，

## 三、进阶用法



