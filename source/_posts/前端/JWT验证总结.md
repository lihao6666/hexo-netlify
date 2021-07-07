---
title: JWT验证总结
date: 2021-06-28 16:32:02
tags: 原理
categories: 
- 前端
- 其它
---

## 简介

JSON Web Token说到底也是一个token字符串,它由三部分组成，分别是头部、载荷与签名。

## 组成

### 1、header（头部）

header包含两部分信息

- 类型

- 加密算法

完整的如下图:

```json
{
  'typ': 'JWT',
  'alg': 'HS256'
}
```

然后对头部使用base64进行加密，组成了token的第一部分

### 2、playload（载荷）

载荷就是存放有效信息的地方，标准的声明如下:

- iss: jwt签发者
- sub: jwt所面向的用户
- aud: 接收jwt的一方
- exp: jwt的过期时间，这个过期时间必须要大于签发时间
- nbf: 定义在什么时间之前，该jwt都是不可用的
- iat: jwt的签发时间
- jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击

例如:

```json
{
  "sub": "fqing",
  "name": "lihao",
}
```

然后对载荷使用base64进行加密

### 3、signature（签名）

jwt的第三部分是一个签证信息，这个签证信息由三部分组成：

- header (base64后的)
- payload (base64后的)
- secret (在服务器端定义的私钥)

加密过程下：
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```


## 应用

python基于JWT有个库叫做PyJwt，可以安装后使用,基础使用方法如下:

```python
# -*- coding: utf-8 -*-

import jwt

playload = {
  "sub": "fqing",
  "name": "lihao",
}
secret = "test"
# secret 相当于服务器密钥，用来定义加密签名

# 加密
encoded = jwt.encode(playload, secret, algorithm='HS256')
print(encoded.decode())
# 解密
print(jwt.decode(encoded, secret, algorithms=['HS256']))

```

增加过期验证：

```python
payload = {
    'exp': datetime.now() + timedelta(minutes=30),  # 令牌过期时间
    'username': 'BigFish' # 想要传递的信息,如用户名ID
}

# 在playload中增加exp字段，然后在解析token的时候捕获异常，如果出错，就是说明过期了，具体的异常是`jwt.exceptions.ExpiredSignatureError`
```



