---
title: opencv学习笔记1之基础操作(图片操作)
date: 2020-02-28 08:41:52
tags: opencv
categories: 深度学习
---

## 图片操作

### 1.图像视频读取

#### 1.1图像读取

```python
img = cv2.imread(path,parameter)
#第二个参数可以是cv2.IMREAD_COLOR(彩色读取，忽略透明度，默认的)
#cv2.IMREAD_GRAYSCALE：以灰度模式读入图像
#cv2.IMREAD_UNCHANGED：读入一幅图像，并且包括图像的 alpha 通道
#注意读取路径错误opencv不会报错，结果是None
```

#### 1.2图像显示

```python
 cv2.imshow('image',img)
```

#### 1.3图像保存

```python
cv2.imwrite('messigray.png',img)
```

#### 1.4视频读取

```python
import numpy as np
import cv2

cap = cv2.VideoCapture(0)#获取设备
while(True):
     ret, frame = cap.read()#检查读取帧数是否正确，返回boolean值，查看视频是否结尾
     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
     cv2.imshow('frame',gray)
     if cv2.waitKey(1) & 0xFF == ord('q'):
     break
     cap.release()
     cv2.destroyAllWindows()
```

### 2.opencv绘图函数

#### 2.1画线

```python
img = np.zeros((512,512,3),np.uint8)
cv2.line(img,(0,0),(511,511),(255,0,0),5)
cv2.imshow("line",img)
cv2.waitKey (10000) # 显示 10000 ms 即 10s 后消失
cv2.destroyAllWindows()
```

#### 2.2画矩形

```	python
cv2.rectangle(img,(384,0),(510,128),(0,255,0),3)#左上角点和右下角点
```

#### 2.3画圆

```python
cv2.circle(img,(447,63), 63, (0,0,255), -1)#圆心和半径
```

### 2.4画椭圆

```python
cv2.ellipse(img,(256,256),(100,50),0,0,180,255,-1)#第一个参数是圆心，第二个是长轴和短轴长度，第三个是椭圆沿逆时针旋转的角度，第四五个是椭圆弧的顺时针起始角度和结束角度
```

#### 2.5画多边形

```python
img = np.zeros((512,512,3), np.uint8)
pts = np.array([[10,5],[20,30],[70,20],[50,10]], np.int32)
pts = pts.reshape((-1,1,2))
cv2.polylines(img,[pts],True,(0,255,255))	
```

#### 2.6图像添加文字

```python
#cv2.putText(img, text, org, fontFace, fontScale, color[, thickness[, lineType[, bottomLeftOrigin]]])
img = np.zeros((512,512,3), np.uint8)
font = cv2.FONT_HERSHEY_SIMPLEX
cv2.putText(img,'OpenCV',(10,500), font, 4,(255,255,255),2,cv2.LINE_AA)
```

### 3.opencv鼠标控制

#### 3.1事件

```python
event：
EVENT_LBUTTONDBLCLK = 7         左键双击
EVENT_LBUTTONDOWN = 1           左键点击
EVENT_LBUTTONUP = 4             左键释放
EVENT_MBUTTONDBLCLK = 9         中间释放
EVENT_MBUTTONDOWN = 3           中间点击
EVENT_MBUTTONUP = 6             中间释放
EVENT_MOUSEHWHEEL = 11          滚轮事件
EVENT_MOUSEMOVE = 0             滑动
EVENT_MOUSEWHEEL = 10           滚轮事件
EVENT_RBUTTONDBLCLK = 8         右键双击
EVENT_RBUTTONDOWN = 2           右键点击
EVENT_RBUTTONUP = 5             右键释放


flags:
EVENT_FLAG_ALTKEY = 32          按Alt不放事件
EVENT_FLAG_CTRLKEY = 8          按Ctrl不放事件
EVENT_FLAG_LBUTTON = 1          左键拖拽
EVENT_FLAG_MBUTTON = 4          中键拖拽
EVENT_FLAG_RBUTTON = 2          右键拖拽
EVENT_FLAG_SHIFTKEY = 16        按Shift不放事件
```

#### 3.2样例

```python
import cv2
def draw_rectangle(event,x,y,flags,param):
    global ix, iy
    if event==cv2.EVENT_LBUTTONDOWN:
        ix, iy = x, y
        print("point1:=", x, y)
    elif event==cv2.EVENT_LBUTTONUP:
        print("point2:=", x, y)
        print("width=",x-ix)
        print("height=", y - iy)
        cv2.rectangle(img, (ix, iy), (x, y), (0, 255, 0), 2)

img = cv2.imread("max.png")  #加载图片
cv2.namedWindow('image')
cv2.setMouseCallback('image', draw_rectangle)
while(1):
    cv2.imshow('image', img)
    if cv2.waitKey(20) & 0xFF == 27:
        break
cv2.destroyAllWindows()
```

