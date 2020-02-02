---
title: Python魔术方法
date: 2019-11-04 19:25:51
tags: 技巧
categories: Python基础
top: 82
---

## Python魔术方法

在Python中，所有以“__”双下划线包起来的方法，都统称为“Magic Method”,这里对一些常用的魔术方法进行总结

### 1、特殊的一些通用属性

魔术方法 | 功能
-|-|
__name__| 类、函数、方法等的名字
__module__ | 类定义所在的模块
__class__ |对象或类所属的类
__bases__ |当前类的基类(父类)
__doc__ |类、函数的文档帮助，没有定义为None
__mro__ |Method Resolution Order 方法解析顺序 
__dict__ |类或实例的属性，可写的字典,包含一个类的各种属性方法
__dir__ | 返回类或者对象的所有成员名称列表

### 2、 对象的创建、初始化、销毁

魔术方法 | 功能
-|-|
__new__ | 对象创建
__init__ | 对象初始化
__del__ | 对象的销毁

<!--more-->

> 当生成对象之前先调用的是__new__方法，接受的参数是cls类，然后返回类的实例，
当对象创建完成后，接受self参数需要对对象进行初始化，调用的就是__init__方法，
当对象的生命周期调用结束时，调用的是__del__析构方法,进行对象的删除，释放变量信息

示例代码：

```python
class Student(object):
    def __new__(cls, name):
        print('正在new.....')
        # 不知道new方法是做什么的, 那么就直接返回父类的new方法
        return  super(Student, cls).__new__(cls)
 
    # 初始化(构造)方法: 创建对象时自动执行
    def __init__(self, name):
        print("正在初始化对象.....")
        self.name = name
 
    # 析构方法: 对象删除时自动调用
    def __del__(self):
        print("正在删除对象.....")
 
# 当程序运行结束之后, 会自动释放变量信息. 会自动调用析构方法;
s = Student('张三')
print(s.name)

```
>回想一下之前写过的单例模式中实现的一个方法，就是在__init__之前先在__new__方法中判断实例是否存在，如果存在，就返回已经存在的实例，如果不存在再创建新的实例

### 3、 属性控制访问

```python
__getattr__(self, name):
# 该方法定义了你试图访问一个不存在的属性时的行为。
# 因此，重载该方法可以实现捕获错误拼写然后进行重定向, 或者对一些废弃的属性进行警告。
```
```python
__setattr__(self, name, value)
#与__getattr__(self, name)不同，__setattr__ 是一个封装的解决方案。无论属性是否存在，它都允许你定义对对属性的赋值行为，以为这你可以对属性的值进行个性定制。实现__setattr__时要避免"无限递归"的错误
```
```python
__delattr__:
# 与 __setattr__ 相同，但是功能是删除一个属性而不是设置他们。实现时也要防止无限递归现象发生
```
```python
__getattribute__(self, name):
# __getattribute__定义了你的属性被访问时的行为，相比较，__getattr__只有该属性不存在时才会起作用。
# 因此，在支持__getattribute__的Python版本,调用__getattr__前必定会调用 __getattribute__。__getattribute__同样要避免"无限递归"的错误。
# 需要提醒的是，最好不要尝试去实现__getattribute__,因为很少见到这种做法，而且很容易出bug。
```

实例代码:
```python
class Access(object):

    def __getattr__(self, name):
        print('__getattr__')
        return super(Access, self).__getattr__(name)

    def __setattr__(self, name, value):
        print('__setattr__')
        return super(Access, self).__setattr__(name, value)

    def __delattr__(self, name):
        print('__delattr__')
        return super(Access, self).__delattr__(name)

    def __getattribute__(self, name):
        print('__getattribute__')
        return super(Access, self).__getattribute__(name)

access = Access()
access.attr1 = True  # __setattr__调用
access.attr1  # 属性存在,只有__getattribute__调用
try:
    access.attr2  # 属性不存在, 先调用__getattribute__, 后调用__getattr__
except AttributeError:
    pass
del access.attr1  # __delattr__调用
```

### 4、自定义容器的方法

> 可以利用 __setitem__ 、__getitem__、 __iter__ 等等实现可变容器和不可变的容器，例如可变(list.dict),不可变(string,tuple).

```python
__len__(self):
#返回容器长度，对于可变和不可变都是其中的一部分
__getitem__(self,key):
# 定义当某一项被访问时，使用self[key]所产生的行为。这也是不可变容器和可变容器协议的一部分。
# 如果键的类型错误将产生TypeError；如果key没有合适的值则产生KeyError
__setitem__(self,key,value):
# 当你执行self[key] = value时，调用的是该方法。
__delitem__(self,key):
# 定义当一个项目被删除时的行为(比如 del self[key])。这只是可变容器协议中的一部分。
# 当使用一个无效的键时应该抛出适当的异常
__reversed__(self):
# 实现当reversed()被调用时的行为。应该返回序列反转后的版本。仅当序列可以是有序的时候实现它，例如对于列表或者元组。
__contains__(self, item):
# 定义了调用in和not in来测试成员是否存在的时候所产生的行为。
# 你可能会问为什么这个不是序列协议的一部分？因为当__contains__没有被定义的时候，如果没有定义，那么Python会迭代容器中的元素来一个一个比较，从而决定返回True或者False。
__missing__(self, key):
# dict字典类型会有该方法，它定义了key如果在容器中找不到时触发的行为。
# 比如d = {'a': 1}, 当你执行d[notexist]时，d.__missing__['notexist']就会被调用。
```

### 5、反射

```python
__instancecheck__(self, instance):
# 检查一个实例是不是你定义的类的实例
__subclasscheck__(self, subclass):
# 检查一个类是不是你定义的类的子类
```

### 6、可调用对象

> 在Python中，一个特殊的魔术方法可以让类的实例的行为表现的像函数一样，你可以调用它们，将一个函数当做一个参数传到另外一个函数中等等。这是一个非常强大的特性。

```python
__call__(self, [args...]):
# 允许一个类的实例像函数一样被调用。实质上说，这意味着 x() 与 x.__call__() 是相同的。
# 注意 __call__ 的参数可变。这意味着你可以定义 __call__ 为其他你想要的函数，无论有多少个参数。
```

应用实例:

```python

class Entity: 
    """ 
    调用实体来改变实体的位置 
    """
    def __init__(self, x, y): 
        self.x, self.y = x, y 
    def __call__(self, x, y): 
        """ 
        改变实体的位置 
        """
        self.x, self.y = x, y

e = Entity(3,5)
e(5,6)
print(e.x,e.y)

'''output:

5 6

'''

```

### 7、上下文管理

> 还记得在打开文件的with语句吗，在with声明的代码段中，我们可以做一些对象的开始操作和退出操作,还能对异常进行处理。这需要实现两个魔术方法: __enter__ 和 __exit__。

```python

__enter__(self):
# 定义了当使用with语句的时候，会话管理器在块被初始创建时要产生的行为。
# 请注意，__enter__的返回值与with语句的目标或者as后的名字绑定。
__exit__(self, exception_type, exception_value, traceback):
# 定义了当一个代码块被执行或者终止后，会话管理器应该做什么。它可以被用来处理异常、执行清理工作或做一些代码块执行完毕之后的日常工作。如果代码块执行成功，exception_type，exception_value，和traceback将会为None。否则，你可以选择处理这个异常或者是直接交给用户处理。如果你想处理这个异常的话，请确保__exit__在所有语句结束之后返回True。如果你想让异常被会话管理器处理的话，那么就让其产生该异常。
```
例如：

```python
with open('foo.txt') as bar: 
    # do something with bar
# 当使用with语句时先调用__enter__返回bar对象，然后使用bar对象处理上下文，最后代码执行完后再调用__exit__,处理上下文结果
```

### 8、复制

```python
__copy__(self):
# 实现复制中的浅拷贝
__deepcopy__(self, memodict={}):
# 定义了当对你的类的实例调用copy.deepcopy()时所产生的行为。
# copy.deepcopy()返回了你的对象的一个深拷贝——对象和其数据都被拷贝了。
# memodict是对之前被拷贝的对象的一个缓存——这优化了拷贝过程并且阻止了对递归数据结构拷贝时的无限递归。
```

### 9、总结

> 学习魔术方法，会让我们对于平时调用函数或者使用一些内置方法时更明白其原理，在后面的学习中我也会尝试使用魔术方法来实现一些基础的类作为实践

### 10、参考文章

> https://www.cnblogs.com/pyxiaomangshe/p/7927540.html
