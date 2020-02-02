---
title: Python设计模式6
date: 2019-11-19 10:37:42
tags: 设计模式
categories: 
- Python设计模式
- 结构型
---

## Python设计模式6(装饰器模式)

### 一、python闭包

>在一个外函数中定义了一个内函数，内函数里运用了外函数的临时变量，并且外函数的返回值是内函数的引用。这样就构成了一个闭包

举例：

```python

# print_msg是外围函数
def print_msg():
    msg = "I'm closure"

    # printer是嵌套函数
    def printer():
        print(msg)

    return printer


# 这里获得的就是一个闭包
closure = print_msg()
#外函数结束的时候发现内部函数将会用到自己的临时变量，这两个临时变量就不会释放，会绑定给这个内部函数
print(123)
#先输出123
# 输出 I'm closure
closure()

```
> 闭包的作用就是保存上下文内容，脱离了原本的作用域，可以用于装饰器的构建

### 二、python装饰器

#### 1、引入

> 当我们想统计一段代码的运行时间时，很多时候我们需要侵入到代码内部去修改，，就像下面一样

```python

import time
def f():
    start_time = time.time()
    print("hello")
    time.sleep(1)
    print("world")
    end_time = time.time()

    execution_time = (end_time - start_time)*1000
    print("time is %d ms" %execution_time)

```
> 这样往往会很不规范，python可以实现函数的传参，所以我们可以再定义一个函数去调用，如下


```python

import time

def deco(func):
    start_time = time.time()
    f()
    end_time = time.time()
    execution_time = (end_time - start_time)*1000
    print("time is %d ms" %execution_time)

def f():
    print("hello")
    time.sleep(1)
    print("world")

if __name__ == '__main__':

    deco(f)

```
> 这样每次都要调用deco(),如果使用过多会很麻烦。这样装饰器就出现了

#### 2、简单装饰器

例子:

```python
import time

def deco(f):
    def wrapper():
        start_time = time.time()
        f()
        end_time = time.time()
        execution_time = (end_time - start_time)*1000
        print("time is %d ms" %execution_time )
    return wrapper

@deco
def f():
    print("hello")
    time.sleep(1)
    print("world")

if __name__ == '__main__':
    f()

```

> 这里面使用了闭包的方法，外部函数传入要装饰函数名，内部函数返回装饰函数的名字，这里没有对被装饰的函数进行任何修改，其实加入@desc很像java中的注解方法，这里相当于不用再调用deco(f())了，可以直接调用要被装饰的函数

#### 3、带固定参装饰器
例子：
```python
import time

def deco(f):
    def wrapper(a,b):
        start_time = time.time()
        f(a,b)
        end_time = time.time()
        execution_time = (end_time - start_time)*1000
        print("time is %d ms" % execution_time)
    return wrapper

@deco
def f(a,b):
    print("be on")
    time.sleep(1)
    print("result is %d" %(a+b))

if __name__ == '__main__':
    f(3,4)
```

#### 4、无固定参数传递

例子：
```python

import time

def deco(f):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        f(*args, **kwargs)
        end_time = time.time()
        execution_time_ = (end_time - start_time)*1000
        print("time is %d ms" %execution_time)
    return wrapper


@deco
def f(a,b):
    print("be on")
    time.sleep(1)
    print("result is %d" %(a+b))

@deco
def f2(a,b,c):
    print("be on")
    time.sleep(1)
    print("result is %d" %(a+b+c))


if __name__ == '__main__':
    f2(3,4,5)
    f(3,4)
```

#### 5、多个装饰器装饰一个函数

```python

import time

def deco01(f):
    def wrapper(*args, **kwargs):
        print("this is deco01")
        start_time = time.time()
        f(*args, **kwargs)
        end_time = time.time()
        execution_time = (end_time - start_time)*1000
        print("time is %d ms" % execution_time)
        print("deco01 end here")
    return wrapper

def deco02(f):
    def wrapper(*args, **kwargs):
        print("this is deco02")
        f(*args, **kwargs)

        print("deco02 end here")
    return wrapper

@deco01
@deco02
def f(a,b):
    print("be on")
    time.sleep(1)
    print("result is %d" %(a+b))


if __name__ == '__main__':
    f(3,4)


# result:
this is deco01
this is deco02
be on
result is 7
deco02 end here
time is 1001 ms
deco01 end here

```
> 从上面结果可以看出来多个装饰器的执行是有顺序的，相当于执行deco01(deco02(f(3,4)))

#### 6、类装饰器

> 装饰器不仅可以是函数，还可以是类，相比函数装饰器，类装饰器具有灵活度大、高内聚、封装性等优点。使用类装饰器主要依靠类的__call__方法

例子：
```python
class Foo(object):
    def __init__(self, func):
        self._func = func

    def __call__(self):
        print('class decorator runing')
        self._func()
        print('class decorator ending')


@Foo　　# bar = Foo(bar)
def bar():
    print('bar')


bar()　　# Foo(bar)()

# 结果
# class decorator runing
# bar
# class decorator ending
```
> 这里的__call__魔术方法，相当于实现闭包功能，可以参照之前魔术方法那一篇文章

### 三、python内置装饰器

#### 1、property

> property可以将python定义的函数当做属性访问，从而提供更加友好访问方式，但是有时候setter/deleter也是需要的
只有@property表示只读。
同时有@property和@x.setter表示可读可写。
同时有@property和@x.setter和@x.deleter表示可读可写可删除。

例子：

```python
class Foo:
    def __init__(self, name):
        self.__name = name
    @property
    def name(self):
        return self.__name
    @name.setter
    def name(self, value):
        if not isinstance(value, str):
            raise TypeError('name must be str')
        self.__name = value
    @name.deleter
    def name(self):
        raise TypeError('can not delete')
f = Foo('jack')
print(f.name)  # jack
f.name = 'hanmeimei'
print(f.name)  # hanmeimei
# del f.name  # TypeError: can not delete
```

#### 2、类方法

> 仅仅与类交互而不和实例交互，类在使用时会将类本身当做参数传给类方法的第一个参数

例子：

```python
class Car:
    car = 'audi'

    @classmethod
    def value(cls, category):
        print('%s is the %s' % (category, cls.car))


class Bmw(Car):
    car = 'Bmw'


class Benz(Car):
    car = 'Benz'


print('通过实例进行调用')
b = Bmw()
b.value('normal')
print('直接用类名进行调用')
Benz.value('NOnormal')
```

#### 3、静态方法

> 将类中的方法设置为静态方法，就是在不需要创建实例对象的情况下，可以通过类名来进行直接引用，来达到将函数功能与实例解绑的效果

例子：
```python
class Test:

    @staticmethod
    def index(x, y):
        print('x + y = %s' % (x+y))


cls = Test()
print('可以通过实例对象来引用')
cls.index(1, 2)
print('通过类名直接引用静态方法')
Test.index(1, 2)


'''
可以通过实例对象来引用
x + y = 3
通过类名直接引用静态方法
x + y = 3

'''
```

#### 4、实例方法、类方法、和静态方法区别

> 实例方法调用时有一个隐含参数self，实例调用时可以不传self，self是实例本身 
类方法调用时有一个隐含参数cls，类调用时可以不传cls，cls是实例本身
静态方法没有隐含参数
类方法和静态方法可以通过函数名直接调用方法，实例方法必须通过实例


### 四、装饰器模式

> 在面向对象中，装饰模式指：动态地给一个对象添加一些额外的职责。就增加一些功能来说，装饰模式比生成子类更为灵活。
装饰器模式就是利用装饰器实现对一些对象功能扩展，例如在django项目登录模块中对一些需要登录功能的限制就使用到了这个模式，通过添加装饰器对功能限制，这样一方面实现了功能扩展，也让代码更加规范易懂











