---
title: Python设计模式7
date: 2019-12-13 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 结构型
---

## Python设计模式7(桥接模式-结构型)

> 桥接（Bridge）是用于把抽象化与实现化解耦，使得二者可以独立变化。这种类型的设计模式属于结构型模式，它通过提供抽象化和实现化之间的桥接结构，来实现二者的解耦.

> 这种模式涉及到一个作为桥接的接口，使得实体类的功能独立于接口实现类。这两种类型的类可被结构化改变而互不影响.

#### 1、实例

例子：

```python

class A:

    def run(self, name):
        print("my name is :{}".format(name))


class B:

    def run(self, name):
        print("我的名字是：{}".format(name))


class Bridge:

    def __init__(self, ager, classname):
        self.ager = ager
        self.classname = classname

    def bridge_run(self):
        self.classname.run(self.ager)


if __name__ == '__main__':
    test = Bridge('李华', A())
    test.bridge_run()
    test.ager = 'Tome'
    test.bridge_run()
    test.classname = B()
    test.bridge_run()
    test.ager = '李华'
    test.bridge_run()
```

> 从上面代码可以看出来抽象的两个A、B类和实例类在桥接后可以实现独立的控制变化，这样实现了代码的脱耦。

#### 2、应用场景

待补充

