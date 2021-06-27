---
title: Orthanc
date: 2021-06-02 16:14:53
tags: 研究生
categories: 福晴科技
---

## docker下搭建Orthanc

拉取orthanc:

```cmd
sudo docker pull jodogne/orthanc
sudo docker pull jodogne/orthanc:[版本号]
```

运行orthanc:

```cmd
sudo docker run -p 4242:4242 -p 8042:8042 jodogne/orthanc

```
将配置文件拷贝到电脑本地：

```cmd
sudo docker run --rm --entrypoint=cat jodogne/orthanc /etc/orthanc/orthanc.json > /tmp/orthanc.json
<!-- --rm表示退出容器后销毁容器 -->
```
本地修改配置文件后挂载本地文件到docker中：

```cmd
sudo docker run -itd --name orthanc -p 4242:4242 -p 8042:8042 -v /tmp/orthanc.json:/etc/orthanc/orthanc.json jodogne/orthanc
<!-- 这样修改本地配置文件后重启容器即可 -->
```
本地数据库挂载到docker中：
```cmd
sudo docker run -p 4242:4242 -p 8042:8042 -v /tmp/orthanc-db/:/var/lib/orthanc/db/ jodogne/orthanc
```

集合配置命令：
```cmd
sudo docker run -itd --name orthanc -p 4242:4242 -p 8042:8042 -v /Users/lh/Documents/orthanc/orthanc.json:/etc/orthanc/orthanc.json -v /Users/lh/Documents/orthanc/python/:/etc/orthanc/python/ -v /Users/lh/Documents/orthanc/orthanc-db/:/var/lib/orthanc/db/ jodogne/orthanc
```
docker下一些配置：

- docker下配置文件路径为`etc/orthanc/orthanc.json`
- docker下数据存储的路径为`var/lib/orthanc/db`

## orthanc的restapi


### 访问基础内容

[orthanc文档](https://book.orthanc-server.com/users/rest-cheatsheet.html)

上传DICOM:
```cmd
curl -X POST http://localhost:8042/instances --data-binary @CT.X.1.2.276.0.7230010.dcm
# 实际的应用场景应该结合具体操作，二进制读取dcm文件，然后通过post请求发送，可以参考ImportDicomFiles文件
```

获得所有病人、研究、序列、实例的ID：
```cmd
curl http://localhost:8042/patients
curl http://localhost:8042/studies
curl http://localhost:8042/series
curl http://localhost:8042/instances
```
根据相应ID读取详细信息：
```
curl http://localhost:8042/patients/[ID]
# 下同
```
实例转DCOM到本地：
```cmd
curl http://localhost:8042/instances/[ID]/file > Instance.dcm
```
实例转PNG到本地：
```cmd
curl http://localhost:8042/instances/[ID]/preview > Instance.png
```
查看实例的元数据：
```cmd
http://localhost:8042/instances/[ID]/simplified-tags
```

### 复杂查询详细内容

find查找：

```cmd
curl --request POST --url http://localhost:8042/tools/find --data '{"Level":"Instance","Query":{"Modality":"CR","StudyDate":"20180323-","PatientID":"*"}}'
# 这里--data相当于post中raw的json参数
```

### 查看变化日志

```cmd
curl http://localhost:8042/changes?limit=100
```

### 资源删除

```cmd
curl -X DELETE http://localhost:8042/patients/[ID]
$ curl -X DELETE http://localhost:8042/studies/[ID]
$ curl -X DELETE http://localhost:8042/series/[ID]
$ curl -X DELETE http://localhost:8042/instances/[ID]
```
### 匿名化修改

[orthanc匿名化修改](http://www.orthanc.cn/users/anonymization.html)

## orthanc之lua脚本

[orthanc服务端脚本lua](http://www.orthanc.cn/users/lua.html)

## orthanc之python脚本的使用

[orthanc之python脚本使用](https://book.orthanc-server.com/plugins/python.html)

- orthanc.RegisterRestCallback('/tata', OnRest) 注册回调函数
- orthanc.RegisterOnChangeCallback(OnChange) 注册状态变化函数(用于自动控制)
- 调用orthanc请求的函数
    - RestApiGet(uri, builtin, headers)
    - RestApiPost(uri, body, builtin, headers)
    - RestApiPut(uri, body, builtin, headers)
    - RestApiDelete(uri, builtin, headers)
- orthanc.RegisterOnStoredInstanceCallback(OnStoredInstance) 装载实例调用的函数
- orthanc.RegisterIncomingHttpRequestFilter(Filter) 用来管理url请求，权限验证之类

## 问题

- Modality目标模式的应用场景
- orthanc客户端和服务端如何通信
- osimis的docker镜像是否可以使用
