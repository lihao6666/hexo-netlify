---
title: Python设计模式5
date: 2019-11-03 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 结构型
---

## Python设计模式5(适配器模式-结构型)

> 当我们希望把一个老组件用于一个新组系统或者把一个新组件应用于老系统中，同时在代码无法修改的，或者说无法访问这些代码时（在实际开发中，旧系统的代码修改后牵一而动全身，很容易引起系统的崩溃。）。这时候，我们可以编写一个额外的代码层，该代码层包含让这两个接口之间能够通信需要进行的所有修改,通俗的来讲就是构建一个适配器可以将一个类接口转换为需要的一个接口

### 1 简单举例


```python
class Target(object):
  def request(self):
    print("普通请求")
class Adaptee(object):
  def specific_request(self):
    print("特殊请求")
class Adapter(Target):
  def __init__(self):
    self.adaptee = Adaptee()
  def request(self):
    self.adaptee.specific_request()
if __name__ == "__main__":
  target = Adapter()
  target.request()
```
> 从上面的例子中可以看出来两个类有不同的print需求，通过建立一个适配器Adapter类,将下一个类的print功能和Target类相契合

### 2 复杂一点的举例

增加类：

```python
class Synthesizer:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return 'the {} synthesizer'.format(self.name)

    def play(self):
        return 'is playing an electronic song'

class Human:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return '{} the human'.format(self.name)

    def speak(self):
        return 'says hello'

```

原有类：

```python
class Computer:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return 'the {} computer'.format(self.name)

    def execute(self):
        return 'executes a program'
```

> 从上面可以看出来，新增加的类主要在执行类play()和speak()和原始类不一样，而对于执行系统来说，都要使用obj.excute()来执行，这样就需要构建一个适配器来实现来设计类调用

增加适配器:

```python
class Adapter:
    def __init__(self, obj, adapted_methods):
        self.obj = obj
        self.__dict__.update(adapted_methods)

    def __str__(self):
        return str(self.obj)
def new_main():
    objects = [Computer('Asus')]
    synth = Synthesizer('moog')
    objects.append(Adapter(synth, dict(execute=synth.play)))
    human = Human('Bob')
    objects.append(Adapter(human, dict(execute=human.speak)))

    for i in objects:
        print('{} {}'.format(str(i), i.execute()))
        print('type is {}'.format(type(i)))

```

输出：

```python

the Asus computer executes a program
type is <class '__main__.Computer'>
the moog synthesizer is playing an electronic song
type is <class '__main__.Adapter'>
Bob the human says hello
type is <class '__main__.Adapter'>

```

> 这里用到了python魔术方法中的__dict__,具体可参考我的文章。。。，这里主要的实现功能和上一个例子，就是只改适配器中内容而改变其它两个类中的功能函数

### 3 实际应用

> 比如电商平台中，货币的支持这个功能，可能刚开始只支持pay一种货币，后面需要支持别的货币，这时候就需要针对不同货币的付款金额，实现pay的接口适配



