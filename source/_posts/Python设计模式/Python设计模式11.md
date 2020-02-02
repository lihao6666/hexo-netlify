---
title: Python设计模式11
date: 2019-12-13 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 行为型
---


## Python设计模式11(观察者模式-行为型)

> 观察者模式是一种行为型模式，在观察者模式当中，主题维护了一个依赖（观察者）列表，以便主题可以使用观察者定义的任何方法通知所有观察者它所发生的变化。

> 简单理解：观察者模式即为许多对象等待着某个主题对象的新消息，当主题对象有了新消息的时候，它就会通知所有的观察着它的对象，就像是很多的用户都订阅了一位新闻发布者，当新闻发布者发布了一个新的新闻后，他就会通知它的所有订阅者，就像是手机上一些应用的通知栏通知.

#### 1、实例

例子：

```python
# 观察者
class Observer:
    def update(self):
        pass
class AlarmSensor(Observer):
    def update(self,action):
        print("Alarm Got: %s" % action)
        self.runAlarm()
    def runAlarm(self):
        print("Alarm Ring...")
class WaterSprinker(Observer):
    def update(self,action):
        print("Sprinker Got: %s" % action)
        self.runSprinker()
    def runSprinker(self):
        print("Spray Water...")
class EmergencyDialer(Observer):
    def update(self,action):
        print("Dialer Got: %s"%action)
        self.runDialer()
    def runDialer(self):
        print("Dial 119...")

# 被观察者

class Observed:
    observers=[]
    action=""
    def addObserver(self,observer):
        self.observers.append(observer)
    def notifyAll(self):
        for obs in self.observers:
            obs.update(self.action)
class smokeSensor(Observed):
    def setAction(self,action):
        self.action=action
    def isFire(self):
        return True

# 业务代码

if __name__=="__main__":
    alarm=AlarmSensor()
    sprinker=WaterSprinker()
    dialer=EmergencyDialer()

    smoke_sensor=smokeSensor()
    smoke_sensor.addObserver(alarm)
    smoke_sensor.addObserver(sprinker)
    smoke_sensor.addObserver(dialer)


    if smoke_sensor.isFire():
        smoke_sensor.setAction("On Fire!")
        smoke_sensor.notifyAll()

```

#### 2、应用场景

- 消息监听更新
- 多级触发的场景
