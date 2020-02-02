---
title: Python设计模式12
date: 2019-12-13 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 行为型
---


## Python设计模式12(策略模式-行为型)

> 策略指的就是为了达到某一目的而采取的手段或者方法。为了实现软件设计，对象可能会用到多种多样的算法。这些算法甚至会经常改变。如果将这些算法都硬编码到对象中，将会使得对象本身变得臃肿不堪，而且有时候支持不同的算法也是一个性能负担。策略模式很好的实现了在运行时根据需要透明的更改对象的算法和将算法与本身对象解耦，从而避免出现上述两个问题.

> 因此策略模式可以定义为：　定义一系列算法，将每一个算法封装起来，并让它们可以相互替换。策略模式让算法可以独立于使用它的客户变化。每一个封装算法的类称之为策略(Strategy)类，策略模式提供了一种可插入式(Pluggable)算法的实现方案

#### 1、实例

例子：

```python

class customer:
    customer_name=""
    snd_way=""
    info=""
    phone=""
    email=""
    def setPhone(self,phone):
        self.phone=phone
    def setEmail(self,mail):
        self.email=mail
    def getPhone(self):
        return self.phone
    def getEmail(self):
        return self.email
    def setInfo(self,info):
        self.info=info
    def setName(self,name):
        self.customer_name=name
    def setBrdWay(self,snd_way):
        self.snd_way=snd_way
    def sndMsg(self):
        self.snd_way.send(self.info)

#snd_way向客户发送信息的方式，该方式置为可设，即可根据业务来进行策略的选择。
#发送方式构建如下：
class msgSender:
    dst_code=""
    def setCode(self,code):
        self.dst_code=code
    def send(self,info):
        pass

class emailSender(msgSender):
    def send(self,info):
        print("EMAIL_ADDRESS:%s EMAIL:%s"%(self.dst_code,info))

class textSender(msgSender):
    def send(self,info):
        print("TEXT_CODE:%s EMAIL:%s"%(self.dst_code,info))

#业务场景中将发送方式作为策略
if  __name__=="__main__":
    customer_x=customer()
    customer_x.setName("CUSTOMER_X")
    customer_x.setPhone("10023456789")
    customer_x.setEmail("customer_x@xmail.com")
    customer_x.setInfo("Welcome to our new party!")
    text_sender=textSender()
    text_sender.setCode(customer_x.getPhone())
    customer_x.setBrdWay(text_sender)
    customer_x.sndMsg()
    mail_sender=emailSender()
    mail_sender.setCode(customer_x.getEmail())
    customer_x.setBrdWay(mail_sender)
    customer_x.sndMsg()
```

#### 2、应用场景

