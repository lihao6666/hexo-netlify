---
title: Python设计模式2
date: 2019-10-16 18:57:20
tags: 设计模式
categories: 
- Python设计模式
- 创建型
---

## Python设计模式2(原型模式)

> 原型模式关注的是大量相同对象或相似对象的创建问题，意图在于通过复制一个已经存在的实例来获得一个新的实例，以避免重复创建此类实例带来的开销。被复制的实例就是这个“原型”，这个原型是可定制的。

### 一 浅拷贝与深拷贝

> 在浅拷贝时，拷贝出来的新对象的地址和原对象是不一样的，但是新对象里面的可变元素（如列表）的地址和原对象里的可变元素的地址是相同的，也就是说浅拷贝它拷贝的是浅层次的数据结构（不可变元素），对象里的可变元素作为深层次的数据结构并没有被拷贝到新地址里面去，而是和原对象里的可变元素指向同一个地址，所以在新对象或原对象里对这个可变元素做修改时，两个对象是同时改变的，但是深拷贝不会这样，这个是浅拷贝相对于深拷贝最根本的区别。

```python
import copy
a=[1,2,3,4,5,['a','b']]
#原始对象
b=a#赋值，传对象的引用
c=copy.copy(a)#对象拷贝，浅拷贝
d=copy.deepcopy(a)#对象拷贝，深拷贝

a.append(6)#修改对象a
a[5].append('c')#修改对象a中的['a','b']数组对象

```

> b = a是赋值操作符，所以a和b都是同一块地址的不同引用，无论a怎么变b和a的对象地址和元素地址始终指相同；
c = c=copy.copy(a)是浅拷贝，只拷贝可变元素的地址如这里的a[5],所以是浅层的拷贝，如果深层的数据变化 ，因为地址指向一样，所以也会发生变化；
d=copy.deepcopy(a) 是深拷贝，会递归拷贝所有对象(这里的拷贝意思是放入新的地址)，所以地址都不一样
补充：1、列表切片拷贝属于浅拷贝 2、字典中的copy也是浅拷贝 3、列表作为函数参数传递也是浅拷贝

### 二、原型模式的实现

#### 1 简单类图

![undefined](http://ww1.sinaimg.cn/large/006QuJaKly1g80a4ow12mj30cw05rgm8.jpg)

> 原型模式的核心就是clone()函数，

#### 2 使用举例

例子：
```python
import copy
#步骤1: 定义object复制类Prototype
class Prototype(object):
    def __init__(self):
        self._objects = {}
 
    def register_object(self, name, obj):
        """
        注册对象实例
        :param name: obj_name -> str
        :param obj: object -> object
        """
        self._objects[name] = obj
 
    def unregister_object(self, name):
        """
        删除对象
        :param name: object_name -> str
        """
        del self._objects[name]
 
    def clone(self, name, **attrs):
        """
        从已存在的实例深拷贝一个新实例
        :param name: 被copy的实例
        :param attrs: 新对象属性
        :return: 新对象
        """
        old_obj = self._objects.get(name)
        obj_new = copy.deepcopy(old_obj)
        obj_new.__dict__.update(attrs)
        return obj_new
 
#步骤2: 定义产品类
class Demo(object):
    value = "Default"
 
 
def run():
    instance_a = Demo()
    prototype = Prototype()
    prototype.register_object('instance_a', instance_a)
    instance_b = prototype.clone('instance_a', value="Hello", test="demo")
    print(instance_a.value)
    print(instance_b.value, instance_b.test)
 
if __name__ == "__main__":
    run()
```

运行结果：

```python
Default
Hello demo
```

#### 3 实际应用

>很多畅销书籍会经历多个版本的迭代。
有变化的信息：价格、长度(页数)以及出版日期。
但也有很多相似之处：作者、出版商以及描述该书的标签/关键词都是完全一样的。这表明从头创建一版新书并不总是最佳方式。
如果知道两个版本之间的诸多相似之处，则可以先克隆一份，然后仅修改新版本与旧版本之间的不同之处

```python
import copy
from collections import OrderedDict
 
class Prototype(object):
    def __init__(self):
        self._objects = {}
 
    def register_object(self, name, obj):
        """
        注册对象实例
        :param name: obj_name -> str
        :param obj: object -> object
        """
        self._objects[name] = obj
 
    def unregister_object(self, name):
        """
        删除对象
        :param name: object_name -> str
        """
        del self._objects[name]
 
    def clone(self, id, **attrs):
        """
        从已存在的实例深拷贝一个新实例
        :param name: 被copy的实例
        :param attrs: 新对象属性
        :return: 新对象
        """
        old_obj = self._objects.get(id)
        if not old_obj:
            raise ValueError("Incorrect object name")
        obj_new = copy.deepcopy(old_obj)
        obj_new.__dict__.update(attrs)
        return obj_new
 
class Book(object):
    def __init__(self, name, authors, price, **kwargs):
        """
        初始化书籍公用信息
        :param name: 书名
        :param authors: 作者
        :param price: 价格
        :param kwargs: 其他信息
        """
        self.name = name
        self.authors = authors
        self.price = price
        self.__dict__.update(kwargs)
 
    def __str__(self):
        """
        调用print()时自动打印书籍信息
        """
        mylist = []
        ordered = OrderedDict(sorted(self.__dict__.items()))
        for i in ordered.keys():
            mylist.append('{}: {}'.format(i, ordered[i]))
            if i == 'price':
                mylist.append('$')
            mylist.append('\n')
        return ''.join(mylist)
 
def run():
 
    book_1 = Book("Python核心编程（第一版）", "宋吉广", "45.9", publisher="邮电出版社", length="350页")
    prototype = Prototype()
    prototype.register_object('book_1', book_1)
    book_2 = prototype.clone('book_1', name="Python核心编程（第二版）", authors="宋吉广",
                             price="75.9", publisher="邮电出版社", length="550页")
    print(book_1)
    print(book_2)
 
if __name__ == "__main__":
    run()
```

### 三、总结

> 原型模式多用于对象创建比较麻烦的，且需要大量创建，但是对象属性只有一部分改变的类中，但是每个类都要有clone方法，如果项目过大就要在设计之前优先考虑了

### 四、参考文章

```
https://blog.csdn.net/biheyu828/article/details/92798805
```