---
title: mongodb使用详解
date: 2021-04-13 16:50:41
tags: 神奇操作
categories: 神奇操作
---

## 一、基础使用

### 1、shell使用

- show dbs 查看数据库
- show collections 查看集合
- us [db] 连接到指定数据库(没有默认创建数据库)
- db.dropDatabase() #删除数据库
- db.collection.drop() #删除集合
- db.createCollection(name, options) # 创建集合
- db.collection.insert() #插入文档
    - db.collection.insertOne()
    - db.collection.insertMany()
- db.collection.update() #更新数据
- db.collection.find() #查找内容
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/mongo.png)
    - db.col.find({key1:value1, key2:value2}) # and条件
    - db.col.find({$or: [{key1: value1}, {key2:value2}]}) # or条件
- db.COLLECTION_NAME.find().limit(NUMBER) # 读取指定数目的记录
- db.COLLECTION_NAME.find().sort({KEY:1}) #按照key排序。1是正序，-1是倒序
- db.col.createIndex({"title":1,"description":-1}) #创建索引



### 2、数据类型

![数据类型](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/mongodb_type.png)

### 3、

## 二、进阶使用

### 1、scrapy中mongodb的使用

就是使用pymongo的语法即可

