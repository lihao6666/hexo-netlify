---
title: Python设计模式3
date: 2019-10-17 08:41:30
tags: 设计模式
categories: 
- Python设计模式
- 创建型
---
***
## Python设计模式3(工厂模式)

### 1 引入

> 当实际应用，比如数据库连接是，我们输入mysql，就可以实现mysql连接，输入sqlserver就可以创建sqlserver的连接，这样我们只需要输入参数就可以创建相应的对象，实际的创建方法我们并不可见的模式就是工厂模式

### 2 简单工厂模式

> 在简单工厂模式中，只提供了一个工厂类，该工厂类处于对产品类进行实例化的中心位置，它知道每一个产品对象的创建细节，并决定何时实例化哪一个产品类

例如：

```python
#coding=utf-8
class Fruit:
    def __init__(self,name,weight):
        self.name = name
        self.weight = weight

    def product(self):
        print("这是{},重量是{}吨，用来生产混合果汁的".format(self.name, self.weight))

class Apple(Fruit):
    def __init__(self,name,weight):
        super(Apple, self).__init__(name,weight)

    def product(self):
        print("这是{},重量是{}吨，用来生产{}罐头的".format(self.name, self.weight, self.name))

class Peer(Fruit):
    def __init__(self,name,weight):
        super(Peer, self).__init__(name, weight)

    def product(self):
        print("这是{},重量是{}吨，用来生产{}罐头的".format(self.name, self.weight, self.name))


class FruitFactory():
    def __init__(self):
        pass
    def make_apple(self):
        pass
    def make_peer(self):
        pass
```
 
问题：
> 简单工厂模式最大的缺点是当有新产品要加入到系统中时，必须修改工厂类，加入必要的处理逻辑，这违背了“开闭原则”。在简单工厂模式中，所有的产品都是由同一个工厂创建，工厂类职责较重，业务逻辑较为复杂，具体产品与工厂类之间的耦合度高，严重影响了系统的灵活性和扩展性，而工厂方法模式则可以很好地解决这一问题。

### 3工厂方法

> 工厂方法模式就是简单工厂模式的进一步抽像。由于面向对象多态性，工厂方法模式保持了简单工厂的有点同时克服了他的缺点。工厂方法模式中，核心的工厂被提升为一个抽象类，将具体的创建工作交给他的子类完成。这个抽象的工厂类仅规定具体工厂实现的接口，而不明确指出如何实例化一个产品类，这使得工厂方法模式允许系统在不修改原有产品结构的情况下轻松的引进新产品。

例如：

```python
# 1. 先定义不同的支付方式（对应工厂里具体的产品），及每个产品具体的生产细节

class BigCat():
    # 关于传参的处理方式一： 有构造函数
    def __init__(self,money):
        self.money = money
    def pay(self):
        print("收到大猫金融的支付金额{0}".format(self.money))

class WeChat():
    def __init__(self, money):
        self.money = money

    def pay(self, money):
        print("收到微信支付的金额{0}".format(money))

class ZhiFuBao():
    def __init__(self, money):
        self.money = money

    def pay(self):
        print("收到支付宝支付的金额{0}".format(self.money))

# 2. 为每个支付方式(每个产品）定义特定的工厂,每个工厂都有具体的工厂方法函数，负责返回
# 具体的工厂方法函数，其实就是对每个产品具体的生产细节进行了包装，让外部使用者只能用，却不知道具体的生产过程细节

# 3. 对外只提供这些特定的工厂（接口）
class BigCatFactory():
    def create(self,money):
        return  BigCat(money)

class WeChatFactory():
    def create(self):
        return  WeChat()

class ZhiFuBaoFactory():
    def create(self, money):
        return  ZhiFuBao(money)


### 4 抽象工厂模式

>抽象工厂模式是所有形式的工厂模式中最为抽象和最具一般性的一种形式。当系统所提供的工厂生产的具体产品并不是一个简单的对象，而是多个位于不同产品等级结构、属于不同类型的具体产品时就可以使用抽象工厂模式 ，抽象工厂模式中的具体工厂不只是创建一种产品，它负责创建一族产品 当一个工厂等级结构可以创建出分属于不同产品等级结构的一个产品族中的所有对象时，抽象工厂模式比工厂方法模式更为简单、更有效率

基于工厂方法的例子：

```python

class FactoryProducer:
    def get_factory(self,name):
        if name == "BigCat":
            return BigCatFactory()
        elif name == "WeChat"
            return WeChatFactory()
        else:
            return ZhiFuBaoFactory()
# 相对于工厂方法，抽象工厂方法具体创建了一个接口来访问整个工厂，这样更加具有封装性
```

### 5总结

> 上面这些工厂方法的封装性都不断增强，这样符合开闭原则，但是会对底层修改带来很大麻烦。

适用场景：

>一个系统不应当依赖于产品类实例如何被创建、组合和表达的细节 系统中有多于一个的产品族，但每次只使用其中某一产品族 属于同一个产品族的产品将在一起使用，这一约束必须在系统的设计中体现出来 产品等级结构稳定，设计完成之后，不会向系统中增加新的产品等级结构或者删除已有的产品等级结构








