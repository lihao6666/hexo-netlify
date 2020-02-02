---
title: Python设计模式8
date: 2019-12-13 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 结构型
---

## Python设计模8(外观模式-结构型)

> 外部与一个子系统的通信必须通过一个统一的外观对象进行，为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。外观模式又称为门面模式，它是一种对象结构型模式.

> 比如你回家呼唤小爱同学。窗帘、灯、空气净化器就都开了，这就是一种外观模式应用

#### 1、实例

例子：

```python

class AlarmSensor:
    def run(self):
        print("Alarm Ring...")
class WaterSprinker:
    def run(self):
        print("Spray Water...")
class EmergencyDialer:
    def run(self):
        print("Dial 119...")

class EmergencyFacade:
    """
    外观类中封装了对子系统的操作
    """
    def __init__(self):
        self.alarm_sensor=AlarmSensor()
        self.water_sprinker=WaterSprinker()
        self.emergency_dialer=EmergencyDialer()
    def runAll(self):
        self.alarm_sensor.run()
        self.water_sprinker.run()
        self.emergency_dialer.run()

if __name__=="__main__":
    emergency_facade=EmergencyFacade()
    emergency_facade.runAll()
```

> 这样封装通过客户端直接操作对象，可以与复杂的子系统隔离开

#### 2、应用场景

待补充




