---
title: opencv学习笔记1之基础操作(像素操作)
date: 2020-02-28 09:08:06
tags: opencv
categories: 深度学习
top: 95
---
## 像素操作

### 1.图像基本操作(像素操作)

#### 1.1获取并修改像素值

```python
import cv2
import numpy as np
img=cv2.imread('/home/duan/workspace/opencv/images/roi.jpg')
print(img.item(10,10,2))
img.itemset((10,10,2),100)
print(img.item(10,10,2))
## 50
## 100
# 使用numpy的item获取像素，可以优化，使用itemset可以修改像素

```

#### 1.2获取图像属性

```python
img.shape #返回图像的形状
img.size #返回图像的像素个数
img.dtype #返回图像的数据类型

```

#### 1.3图像ROI(特定区域操作)

```python
#通过切片操作指定区域
ball=img[280:340,330:390]
img[273:333,100:160]=bal
```

#### 1.4拆分合并通道

```python
b,g,r=cv2.split(img) #拆分图像，或者直接切片操作
img=cv2.merge(b,g,r) #合并新的通道
```

#### 1.5图像扩边

```python
cv2.copyMakeBorder(img,top,bottom.left,right,borderType)#第一个参数为图像，第二个为四个方向扩充长度，第三个为便捷类型
#cv2.BORDER_REPLICATE 重复最后一个元素
#cv2.BORDER_CONSTANT 添加有颜色的常数值边界，还需要下一个参数为颜色填充类型
#cv2.BORDER_REFLECT 边界元素的镜像
```

#### 1.6图像运算

```python
cv2.add(x,y) #实现图像像素加，但是会饱和，numpy中的加法是取模操作
dst=cv2.addWeighted(img1,0.7,img2,0.3,0) #图像按权重混合
```

```python
#不规则图形获取
import cv2
import numpy as np
# 加载图像
img1 = cv2.imread('roi.jpg')
img2 = cv2.imread('opencv_logo.png')
# I want to put logo on top-left corner, So I create a ROI
rows,cols,channels = img2.shape
roi = img1[0:rows, 0:cols ]
# Now create a mask of logo and create its inverse mask also
img2gray = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)
ret, mask = cv2.threshold(img2gray, 175, 255, cv2.THRESH_BINARY)
mask_inv = cv2.bitwise_not(mask)
# Now black-out the area of logo in ROI
# 取 roi 中与 mask 中不为零的值对应的像素的值，其他值为 0
# 注意这里必须有 mask=mask 或者 mask=mask_inv, 其中的 mask= 不能忽略
img1_bg = cv2.bitwise_and(roi,roi,mask = mask)
# 取 roi 中与 mask_inv 中不为零的值对应的像素的值，其他值为 0。
# Take only region of logo from logo image.
img2_fg = cv2.bitwise_and(img2,img2,mask = mask_inv)
# Put logo in ROI and modify the main image
dst = cv2.add(img1_bg,img2_fg)
img1[0:rows, 0:cols ] = dst
cv2.imshow('res',img1)
cv2.waitKey(0)
cv2.destroyAllWindows()
```



### 2. opencv中的图像处理

#### 2.1颜色空间转换

```python
cv2.cvtColor(input_image，flag) #第一个参数是图像，第二个参数是转换类型
#  cv2.COLOR_BGR2GRAY
#  cv2.COLOR_BGR2RGB
#  cv2.COLOR_BGR2HSV ...
```

```python
#实现颜色追踪
import cv2
import numpy as np
cap=cv2.VideoCapture(0)
while(1):
# 获取每一帧
ret,frame=cap.read()
# 转换到 HSV
hsv=cv2.cvtColor(frame,cv2.COLOR_BGR2HSV)
# 设定蓝色的阈值
lower_blue=np.array([110,50,50])
upper_blue=np.array([130,255,255])
# 根据阈值构建掩模
mask=cv2.inRange(hsv,lower_blue,upper_blue)
# 对原图像和掩模进行位运算
res=cv2.bitwise_and(frame,frame,mask=mask)
# 显示图像
cv2.imshow('frame',frame)
cv2.imshow('mask',mask)
cv2.imshow('res',res)
k=cv2.waitKey(5)&0xFF
if k==27:
break
# 关闭窗口
cv2.destroyAllWindows()
```

### 3.opencv几何变换

#### 3.1 扩展缩放

```python
img=cv2.imread('messi5.jpg')
# 下面的 None 本应该是输出图像的尺寸，但是因为后边我们设置了缩放因子
# 因此这里为 None
res=cv2.resize(img,None,fx=2,fy=2,interpolation=cv2.INTER_CUBIC)
#OR
# 这里呢，我们直接设置输出图像的尺寸，所以不用设置缩放因子
height,width=img.shape[:2]
res=cv2.resize(img,(2*width,2*height),interpolation=cv2.INTER_CUBIC)
```

#### 3.2平移

```python
import cv2
import numpy as np
 
 
img1 = cv2.imread('./Image/reba_color.jpg',cv2.IMREAD_COLOR)
 
 
tx = 20
ty = 20
 
affine_arr = np.float32([[1,0,tx],[0,1,ty]])# tx,ty正负表示平移的方向
 
res = cv2.warpAffine(img1,affine_arr,(img1.shape[1],img1.shape[0]))
 
cv2.imshow('img',img1)
cv2.imshow('res',res)
 
cv2.waitkey(0)
```

#### 3.3旋转

```python
# 这里的第一个参数为旋转中心，第二个为旋转角度，第三个为旋转后的缩放因子
# 可以通过设置旋转中心，缩放因子，以及窗口大小来防止旋转后超出边界的问题
M=cv2.getRotationMatrix2D((cols/2,rows/2),45,0.6)
# 第三个参数是输出图像的尺寸中心
dst=cv2.warpAffine(img,M,(2*cols,2*rows))
```


