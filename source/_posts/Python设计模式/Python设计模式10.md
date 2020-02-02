---
title: Python设计模式10
date: 2019-12-13 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 结构型
---

## Python设计模式10(代理模式-结构型)

> 在某些应用中，我们想要在访问某个对象之前执行一个或者多个重要的操作，例如，访问敏感信息 -- 在允许用户访问敏感信息之前，我们希望确保用户具备足够的去权限。同时在网络访问时，限制某些网络的访问等操作。

- 真实的对象（执行业务逻辑，被代理的对象）

- 代理类（用户请求的一个接口，对真实目标的保护）

- 用户（获取任务的用户请求）

#### 1、实例

例子：

```python

## 以下是来自于github的代码：

#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time


class SalesManager:
    def talk(self):
        print("Sales Manager ready to talk")


class Proxy:
    def __init__(self):
        self.busy = 'No'
        self.sales = None

    def talk(self):
        print("Proxy checking for Sales Manager availability")
        if self.busy == 'No':
            self.sales = SalesManager()
            time.sleep(0.1)
            self.sales.talk()
        else:
            time.sleep(0.1)
            print("Sales Manager is busy")


class NoTalkProxy(Proxy):
    def talk(self):
        print("Proxy checking for Sales Manager availability")
        time.sleep(0.1)
        print("This Sales Manager will not talk to you whether he/she is busy or not")


if __name__ == '__main__':
    p = Proxy()
    p.talk()
    p.busy = 'Yes'
    p.talk()
    p = NoTalkProxy()
    p.talk()
    p.busy = 'Yes'
    p.talk()

### OUTPUT ###
# Proxy checking for Sales Manager availability
# Sales Manager ready to talk
# Proxy checking for Sales Manager availability
# Sales Manager is busy
# Proxy checking for Sales Manager availability
# This Sales Manager will not talk to you whether he/she is busy or not
# Proxy checking for Sales Manager availability
# This Sales Manager will not talk to you whether he/she is busy or not

```

#### 2、应用场景

- 远程代理，也就是为一个对象在不同的地址空间提供局部代表。这样可以隐藏一个对象存在于不同地址空间的事实。

- 虚拟代理，是根据需要创建开销大的对象。通过它来存放实例化需要很长时间的真是对象。用于惰性求值，将一个大计算量对象的创建延迟到真正需要的时候进行。例如html中，图片需要load很久，所以通过虚拟代理来代替真实的图片

- 安全代理，或叫保护/防护代理：控制对敏感对象的访问。用来控制真实对象访问时的权限

- 智能（引用）代理：在对象被访问时执行额外的动作。此类代理的例子包括引用计数和线程安全检查。是指当调用真实的对象时，代理处理另外一些事