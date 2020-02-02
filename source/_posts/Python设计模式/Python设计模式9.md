---
title: Python设计模式9
date: 2019-12-13 15:54:13
tags: 设计模式
categories: 
- Python设计模式
- 结构型
---

## Python设计模式9(组合模式-结构型)

> 将对象组合成树状结构，来表示业务逻辑上的[部分-整体]层次，这种组合使单个对象和组合对象的使用方法一样

#### 1、实例

例子:

```python

class ComponentBases:
    """部门抽象出来的基类"""
    def __init__(self, name):
        slef.name = name
 
    def add(self, obj):
        pass
 
    def remove(self, obj):
        pass
 
    def display(self, number):
        pass
 
 
class Node(ComponentBases):
 
    def __init__(self, name, duty):
        self.name = name
        self.duty = duty
        self.children = []
 
    def add(self, obj):
        self.children.append(obj)
 
    def remove(self, obj):
        self.children.remove(obj)
 
    def display(self, number=1):
        print("部门：{} 级别：{} 职责：{}".format(self.name, number, self.duty))
        n = number+1
        for obj in self.children:
            obj.display(n)
 
 
if __name__ == '__main__':
    root = Node("总经理办公室", "总负责人")
    node1 = Node("财务部门", "公司财务管理")
    root.add(node1)
    node2 = Node("业务部门", "销售产品")
    root.add(node2)
    node3 = Node("生产部门", "生产产品")
    root.add(node3)
    node4 = Node("销售事业一部门", "A产品销售")
    node2.add(node4)
    node5 = Node("销售事业二部门", "B产品销售")
    node2.add(node5)
    root.display()
 
----------输出-----------
部门：总经理办公室 级别：1 职责：总负责人
部门：财务部门 级别：2 职责：公司财务管理
部门：业务部门 级别：2 职责：销售产品
部门：销售事业一部门 级别：3 职责：A产品销售
部门：销售事业二部门 级别：3 职责：B产品销售
部门：生产部门 级别：2 职责：生产产品
 

```
> 就是建立节点的方法，用于树状分支

#### 2、应用实例

待补充
