---
title: Python设计模式1
date: 2019-10-15 21:57:58
tags: 设计模式
categories: 
- Python设计模式
- 创建型
---

***

## Python设计模式1(单例模式)

***

## 单例模式

> 单例模式就是确保一个类只有一个实例.当你希望整个系统中,某个类只有一个实例时,单例模式就派上了用场。比如,某个服务器的配置信息存在在一个文件中,客户端通过AppConfig类来读取配置文件的信息.如果程序的运行的过程中,很多地方都会用到配置文件信息,则就需要创建很多的AppConfig实例,这样就导致内存中有很多AppConfig对象的实例,造成资源的浪费.其实这个时候AppConfig我们希望它只有一份,就可以使用单例模式.

### 单例模式实现

#### 1 使用模块

> python模块就是单例模式的一个体现、因为第一次导入模块的时候会生成.pyc文件，第二次导入时就会加载.pyc文件

```python
# test.py
class Singleton(object):
    def foo(self):
        pass
singleton = Singleton()
```

```python
# 通过模块调用
from test import singleton
```

#### 2 装饰器

> 装饰器里面的外层变量定义一个字典,里面存放这个类的实例.当第一次创建的收,就将这个实例保存到这个字典中.然后以后每次创建对象的时候,都去这个字典中判断一下,如果已经被实例化,就直接取这个实例对象.如果不存在就保存到字典中.

```python
def Singleton(cls):
    _instance = {}

    def _singleton(*args, **kargs):
        if cls not in _instance:
            _instance[cls] = cls(*args, **kargs)
        return _instance[cls]

    return _singleton


@Singleton
class A(object):
    a = 1

    def __init__(self, a):
        self.a = a

a1 = A(2)
a2 = A(3)
```



#### 3 加锁类方法

> 多线程调用如果出现堵塞，单纯的类方法无法实现单例模式，这里需要加锁

```python
import time
import threading

class Singleton(object):
    _instance_lock = threading.Lock()

    def __init__(self,*args,**kwargs):
        time.sleep(1)

    @classmethod
    def get_instance(cls,*args,**kwargs):
        if not hasattr(Singleton,'_instance'):
            with Singleton._instance_lock:
                if not hasattr(Singleton,'_instance'):
                    Singleton._instance = Singleton(*args,**kwargs)

        return Singleton._instance

def task(arg):
    obj = Singleton.get_instance(arg)
    print(obj)

for i in range(10):
    t = threading.Thread(target=task,args=[i,])
    t.start()

obj = Singleton.get_instance()
print(obj)
```

#### 4 基于__new__方法实现的单例模式

>一个对象的实例化过程是先执行类的__new__方法,如果我们没有写,默认会调用object的__new__方法,返回一个实例化对象,然后再调用__init__方法,对这个对象进行初始化,我们可以根据这个实现单例.在一个类的__new__方法中先判断是不是存在实例,如果存在实例,就直接返回,如果不存在实例就创建.

```python
import threading
class Singleton(object):
    _instance_lock = threading.Lock()

    def __init__(self):
        pass


    def __new__(cls, *args, **kwargs):
        if not hasattr(Singleton, "_instance"):
            with Singleton._instance_lock:
                if not hasattr(Singleton, "_instance"):
                    Singleton._instance = object.__new__(cls)  
        return Singleton._instance

obj1 = Singleton()
obj2 = Singleton()
print(obj1,obj2)

def task(arg):
    obj = Singleton()
    print(obj)

for i in range(10):
    t = threading.Thread(target=task,args=[i,])
    t.start()
```
