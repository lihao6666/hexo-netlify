---
title: Python设计模式4
date: 2019-10-18 09:17:15
tags: 设计模式
categories:
- Python设计模式
- 创建型
---
***

## Python设计模式4(建造模式)

> 我们想要创建一个由多个部分构成的对象，而且它的构成需要一步接一步地完成。 只有当各个部分都创建好，这个对象才算是完整的。这正是建造者设计模式。

>在建造模式中，主要有两个角色，一个是指挥者(Director)，一个是建造者(Builder),指挥者指挥建造者建造产品

### 1 引入

> 假如要组装一台电脑，将主板，CPU，内存等部件按照某个稳定的步骤组合，基本过程是不变的，而组成电脑的各个部件却可以是不同性能的，不同价位，或者是不同版本的，当组成电脑的时只需要选择不同的组件就可以按照基本相同的过程造出不同配置的电脑。也就是说建造者模式的意图是将一个复杂对象的构建过程与表示分离，它使用相同的构建步骤作用于不同的子对象以构建出不同表现形式的“复杂对象”

```python
class Computer:
    def __init__(self, serial_number):
        self.serial = serial_number
        self.memory = None
        self.hdd = None
        self.gpu = None

    def __str__(self):
        info = ('Model: {}'.format(self.serial),
                'Memory: {}GB'.format(self.memory),
                'Hard Disk: {}GB'.format(self.hdd),
                'Graphics Card: {}'.format(self.gpu))

        return '\n'.join(info)


class ComputerBuilder:
    def __init__(self):
        self.computer = Computer('AG23385193')

    def configure_memory(self, amount):
        self.computer.memory = amount

    def configure_hdd(self, amount):
        self.computer.hdd = amount

    def configure_gpu(self, gpu_model):
        self.computer.gpu = gpu_model


class HardwareEngineer:
    def __init__(self):
        self.builder = None

    def construct_computer(self, memory, hdd, gpu):
        self.builder = ComputerBuilder()
        self.builder.configure_memory(memory),
        self.builder.configure_hdd(hdd),
        self.builder.configure_gpu(gpu)

    @property
    def computer(self):
        return self.builder.computer

    """
def main():
    engineer = HardwareEngineer()
    engineer.construct_computer(hdd=500, memory=8, gpu='GeForce GTX 650 Ti')
    computer = engineer.computer
    print(computer)
    
    Out:
    Model: AG23385193
    Memory: 8GB
    Hard Disk: 500GB
    Graphics Card: GeForce GTX 650 T
    """
```

>从上面代码可以看出建造者模式对于产品建造的细节都在Director(HardwareEngineer)中定义，这里可以控制产品的细节

### 2 和工厂模式的区别

> 工厂模式注重的是产品产生的结果，也就是类别上的产生模式，如上一篇文章中的支付方式，而建造模式更注重的是产品的创建方式，如这里面电脑配件的型号等等


### 3 实际应用场景

> 比如网页中组件的构成，这里面需要考虑各个小组件的构成和使用，这里就可以使用建造者模式
