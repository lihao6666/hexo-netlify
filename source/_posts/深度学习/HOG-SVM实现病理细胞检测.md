---
title: HOG+SVM实现病理细胞检测
date: 2019-11-01 21:54:06
tags: 目标检测
categories: 深度学习
top: 99
---
## HOG+SVM实现病理细胞检测

#### 1 数据分析与处理

> 这里获取到的数据有两部分，一部分是带标注xml的正样本，一部分是不带xml的负样本，这里感觉负样本和正样本差别有点大，后面处理需要注意一下

> 这里处理数据主要有两个部分，一个部分是获取用于训练的正样本，需要通过xml从大图中提取出来，另一部分是用于训练的负样本，因为没有提供xml文件，需要我们自己分割出来用于训练，我这里采用随机分割的方法，选取一部分负样本，每张图片随机分割出来一部分图片用于训练

分割正样本代码:

```python

from skimage.feature import hog  
from sklearn.externals import joblib  
import xml.dom.minidom as xdm  
import numpy as np  
from PIL import Image 
import cv2  
import os  
import time
from config import *
  

train_xml_filePath = './sig-pos/sig-train-pos-xml/'
# xml path
train_pos_restPath = './sig-pos/sig-train-pos-rest/'
# save path


def getBox(object):  
    groupId = str(object.getElementsByTagName("name")[0].firstChild.data)  # 细胞类别
    bndbox = object.getElementsByTagName("bndbox")[0]
    xmin = int(bndbox.childNodes[1].firstChild.data)
    ymin = int(bndbox.childNodes[3].firstChild.data)
    xmax = int(bndbox.childNodes[5].firstChild.data)
    ymax = int(bndbox.childNodes[7].firstChild.data)  
    box = (xmin,ymin,xmax,ymax)   
    return box  
  
def save_image_pos(filePath):  
    Data = []  
    num = 0  
    for childDir in os.listdir(filePath):  
        f_im = os.path.join(filePath, childDir)  
        f_xml = os.path.join(train_xml_filePath, '%s.xml' %childDir.split('.')[0])
        dom = xdm.parse(f_xml)
        root = dom.documentElement
        objects = root.getElementsByTagName("object")
        image = Image.open(f_im) # open the image
        for object in objects:
            box = getBox(object)  
            region = image.crop(box) # 分割图片
            data = np.asarray(region) # 数据转换  
            data = cv2.resize(data,save_image_size,interpolation=cv2.INTER_CUBIC) # 插值方法
            save_name = os.path.join(train_pos_restPath,"%s.jpg" %str(num))
            cv2.imwrite(save_name,data)
            num += 1  
        print("%d processing: %s" %(num,childDir))

if __name__ == "__main__":
    save_image_pos("./sig-pos/sig-train-pos")
# 正样本提取了大概4500张左右(100,100)尺寸的患病细胞图片
```
<!--more-->

分割负样本代码：

```python

train_neg_restPath = './sig-neg/sig-train-neg-rest/'
crop_image_size = (100,100)
save_image_size = (100,100)


def save_image_neg(filePath,per_image_amount):
    random.seed(1)
    num = 0
    pic_num = 0
    crop_width,crop_height = crop_image_size
    for childDir in tqdm(os.listdir(filePath)):
        f_im = os.path.join(filePath, childDir)  
        image = Image.open(f_im)
        width,height = image.size
        for i in range(per_image_amount):
            x = random.randint(0,width-crop_width-1)
            y = random.randint(0,height-crop_height-1)
            box = (x,y,x+crop_width,y+crop_height)
            region = image.crop(box)
            data = np.asarray(region)
            data = cv2.resize(data,save_image_size,interpolation=cv2.INTER_CUBIC)
            save_name = os.path.join(train_neg_restPath,"%s.jpg" %str(num))
            cv2.imwrite(save_name,data)
            num += 1
        pic_num += 1
        # if pic_num >= 10:
        #     break
if __name__ == "__main__":
    save_image_neg("./sig-neg/sig-train-neg",300)
#负样本自己只选了部分大图分割，每张大图300张小图，总共10800张小图负样本
```

补：
>因为后面自己感觉随机切割可能无法提取过多的信息，后面尝试了平均切割和在正样本中随机切割一些样本作为负样本，下面是平均切割代码

```python
def save_image_neg2(filePath): # 平均切割
    num = 0
    pic_num = 0
    crop_width,crop_height = crop_image_size
    for childDir in tqdm(os.listdir(filePath)):
        f_im = os.path.join(filePath, childDir)  
        image = Image.open(f_im)
        width,height = image.size 
        for x in range(0, width-save_image_size[0],slid_step_size2[0]):
            for y in range(0, height-save_image_size[1],slid_step_size2[1]):
                box = (x,y,x+save_image_size[0],y+save_image_size[1])
                region = image.crop(box)
                data = np.asarray(region)
                data = cv2.resize(data,save_image_size,interpolation=cv2.INTER_CUBIC)
                save_name = os.path.join(train_neg_restPath,"%s.jpg" %str(num))
                cv2.imwrite(save_name,data)
                num += 1
                if num > 20000:
                    return
        pic_num += 1
```

#### 2 HOG特征提取

> HOG，也即方向梯度直方图（Histogram of Oriented Gradient），采用了统计的方式(直方图)进行提取. 其基本思路是将图像局部的梯度统计特征拼接起来作为总特征. 局部特征在这里指的是将图像划分为多个Block, 每个Block内的特征进行联合以形成最终的特征

> 这里详细的就不解释了，HOG提取特征主要有以下几个方面

- Gamma归一化(目的是调节图像的对比度，降低图像局部的阴影和光照变化所造成的影响，同时可以抑制噪音的干扰,相当于灰度化特征一样，如果读入图片时就已经转灰度，可以不用)
- 计算图像每个像素的梯度（捕获轮廓信息）
- 为每个细胞单元构建梯度方向直方图
- 细胞单元组成块，然后归一化(有向量标准，这里使用的L2-Hys)
- 计算特征数

下面举例说明：
> 我第一次提取特征，每个细胞像素(10,10),每块(4,4)个细胞,图片大小(100,100),然后每个细胞直方图设置为9个

如下图：
![1.png](http://ww1.sinaimg.cn/large/006QuJaKly1g8iz5t30x4j33402c0x6p.jpg)
效果如下图:
![Figure_1.png](http://ww1.sinaimg.cn/large/006QuJaKly1g8iz6pbmxzj30hs0dcq3d.jpg) ![Figure_2.png](http://ww1.sinaimg.cn/large/006QuJaKly1g8iz714jfoj30hs0dcaaq.jpg)

sklearn中提取hog特征关键代码：
```python
im = cv2.cvtColor(cv2.imread(im_path), cv2.COLOR_BGR2GRAY)     
if des_type == "HOG":
    fd = hog(im,orientations, pixels_per_cell, cells_per_block,block_norm,visualise)
```

#### 3 模型训练
> 这里是二分类问题，所以通过构建线性SVM进行分类，在读取特征后，需要根据类别在label中加入相应的标签后再进行训练

代码如下：

```python

def train_svm():

    # Classifiers supported
    clf_type = 'LIN_SVM'

    fds = []
    labels = []
    # Load the positive features
    for feat_path in glob.glob(os.path.join(pos_feat_ph,"*.feat")):
        fd = joblib.load(feat_path)
        fds.append(fd)
        labels.append(1)
    print("Pos features read over!")
    # Load the negative features
    for feat_path in glob.glob(os.path.join(neg_feat_ph,"*.feat")):
        fd = joblib.load(feat_path)
        fds.append(fd)
        labels.append(0)
    print("Neg features read over!")
    if clf_type is "LIN_SVM":
        clf = LinearSVC(max_iter = 1000)
        print("Training a Linear SVM Classifier")
        clf.fit(fds, labels)
        # If feature directories don't exist, create them
        if not os.path.isdir(os.path.split(model_path)[0]):
            os.makedirs(os.path.split(model_path)[0])
        joblib.dump(clf, model_path+model_name)
        print("Classifier saved to {}".format(model_path))
```
#### 4 滑窗预测

> 为了实现在大图上的细胞定位，我们需要对图片进行滑窗预测操作，这是比较简单的操作，但是问题来了？你送入模型训练的正样本都是形态大小不一的图片，如果单独的只滑一个大小的窗口预测的结果会差别很大，所以解决方法是什么?我第一次使用的是改变滑窗大小的方法，但是发现这样预测的结果会根据你变化的窗口重复很多，所以使用了不变滑窗大小，而是通过图片压缩预测，这里使用的是skimage的高斯金字塔，降低分辨率滑窗预测

代码如下：
```python
    image = cv2.imread(filename)
    # im = imutils.resize(im, width = min(400, im.shape[1]))

    clf = joblib.load(model_path+model_name)
    sum = 0
    #List to store the detections
    detections = []
    #The current scale of the image
    scale = 0

    for im_scaled in pyramid_gaussian(image, downscale = downscale):#downscale为缩小倍数，后面scale随着缩小倍数进行增加，便于后面回放大小
        # sum += 1
        # print(sum)
        if im_scaled.shape[0] < min_wdw_sz[1] or im_scaled.shape[1] < min_wdw_sz[0]:
            break
        for (x,y,window_image) in sliding_window(im_scaled,min_wdw_sz,slid_step_size):
            if window_image.shape[0] != min_wdw_sz[1] or window_image.shape[1] != min_wdw_sz[0]:
                continue
            window_image = cv2.resize(window_image,save_image_size,interpolation=cv2.INTER_CUBIC)        
            window_image = color.rgb2gray(window_image)
            fd = hog(window_image, orientations, pixels_per_cell, cells_per_block,block_norm,visualise)
            fd = fd.reshape(1,-1)
            pred = clf.predict(fd)

            if pred == 1: 
                if clf.decision_function(fd) > 0.5:
                    detections.append((int(x * (downscale**scale)), int(y * (downscale**scale)), clf.decision_function(fd), 
                    int(min_wdw_sz[0] * (downscale**scale)),
                    int(min_wdw_sz[1] * (downscale**scale))))
        scale += 1
```
#### 5 NMS
> 去掉detection任务重复的检测框,原理也就是基于上一步记录的decision_function(到决策边界的距离)，越大的score越高，然后根据score和交并比选择最合适的框

代码如下：

```python
rects = np.array([[x, y, x + w, y + h] for (x, y, _, w, h) in detections])
sc = [score[0] for (x, y, score, w, h) in detections]
# print("sc: ",sc)
sc = np.array(sc)
pick = non_max_suppression(rects, probs = sc, overlapThresh = 0.3)
# print("shape, ", pick.shape)

for(xA, yA, xB, yB) in pick:
    cv2.rectangle(clone, (xA, yA), (xB, yB), (0, 255, 0), 2)
# 这里的score获取的是上面预测时获取的离决策平面距离的值，做了归一化处理在0-1之间，这也是一个调参要点
```
#### 6 结果展示

测试下简单的feature预测：
![Snipaste_2019-11-19_16-59-39.jpg](https://ws1.sinaimg.cn/large/006QuJaKly1g93m5ce42oj30pm025wel.jpg)
小图滑窗预测：
![Snipaste_2019-11-19_17-01-13.jpg](https://ws1.sinaimg.cn/large/006QuJaKly1g93m5z1pcsj30dx0dz76c.jpg)
大图预测：
![Snipaste_2019-11-19_20-22-06.jpg](https://ws1.sinaimg.cn/large/006QuJaKly1g93m93mducj30fe0edq6l.jpg)


#### 6 改进方向

- 特征值提取，因为内存原因这里特征提的都比较小，但是训练的数据都比较多，过小的特征值和过多的样本在训练时尤其是负样本会出现很大的误差，这是一个优化方向
- 训练svm时候还没有考虑迭代次数问题，使用默认的迭代次数，这样过多的训练集过拟合现象为考虑，后面需要评估一下
- 滑窗，自己使用的高斯金字塔，缩放图片是否会造成过多的特征丢失问题，应该多考虑一下，和原始通过滑窗预测应该比较一下
- 。。。

#### 补：
①后面和同学试过了样本扩充，效果不是很好
②我自己简单的在正样本中随机划取了一些作为负样本，发现这样对正样本的预测产生了很大的影响，尤其是对于边缘特征提取来说，让正样本的预测效果也变得很差
③也通过对数据进行交叉验证