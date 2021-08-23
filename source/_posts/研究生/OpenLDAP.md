---
title: OpenLDAP
date: 2021-06-04 10:04:57
tags: 研究生
categories: 福晴科技
---

## docker下安装OpenLDAP

拉取镜像：

```cmd
docker pull osixia/openldap:1.5.0
```
端口映射运行：

```cmd
docker run -p 389:389 -p 636:636 --name openldap -itd osixia/openldap:1.5.0
```

挂载数据卷和配置文件运行：

```cmd
docker cp openldap:/etc/ldap/slapd.d/ /tmp/ldap/config/ #将配置文件拷贝到本地
docker cp openldap:/var/lib/ldap /tmp/ldap/database/
docker run --name -p 389:389 -p 636:636 openldap -v /tmp/ldap/database/ldap:/var/lib/ldap -v /tmp/ldap/config/slapd.d:/etc/ldap/slapd.d -itd osixia/openldap:1.5.0
```

