---
title: Cookie爬取Ajax数据
date: 2019-11-27 17:27:11
tags: 爬虫
categories: 爬虫
---

## 纪念一次心血来潮的爬虫测试

>上次做完行政，心里真的是很不爽，一方面学校网站不给力，一方面那个题也是很难受的，虽然后来发现了懵搜小助手，但还是效率很慢，想着自己可以不可以搞得快一点，当时第一想法就是把题爬出来，然后发给萌搜小助手，到时候自己对着消息写答案不是美滋滋，哈哈哈，下面记录一下自己的这次心血来潮。


#### 1、网站分析

>之前爬过学校的图书馆，因为为了实现自动化所以用的selenium(一个webdriver测试工具)，也是为了用来解决验证码问题和js渲染，这里分析了一下两个网站登录的区别，发现学堂云的网站基本上所有数据都是基于js渲染的。这样的话想要直接获取数据是比较困难的

网站截图(已经进入课程):
![学堂云](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_17-50-32.jpg)

这是我直接get网站的结果:

![get结果](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_17-41-30.jpg)

> 所以接下来的问题就在于如何获取js渲染的数据呢，我们知道很多时候为了实现数据的及时刷新，都会使用Ajax，那我们展示的数据就会存放在ajax的数据中，所以接下来我们的目标就是找到带题目数据的ajax数据

<!--more-->
#### 2、ajax数据定位

- **查找ajax数据**
我们可以在谷歌浏览器的开发工具中找到network中xhr数据
如下图：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_17-52-47.jpg)

- **查看所有数据中，是否有包含题目信息的ajax**
下图是ajax数据表：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_17-54-50.jpg)
这里有两个技巧，一个是直接看大小，因为这里题目比较多，所以储存的data一定很大，就直接可以定位了，还有一个方法是对于动态刷新的就直接下拉，看哪个数据变化，经验啊哈哈哈哈

#### 3、ajax数据获取

- **cookie获取**
因为是要登录才能查看，所以先构造header，加入cookie
这是cookie位置：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_18-05-58.jpg)

- **payload数据添加**
这里通过cookie访问网页，发现查不到网页，会等到error页面，然后思考，正常的ajax会加入页面信息，这里没有，所以发送post请求时，还需要其他参数来控制subject信息，查看header发现提交需要额外的json数据。
如下图：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_18-06-17.jpg)
因为json要指示格式，所以需要在header中加入**content-type: 'application/json'**

#### 4、批量爬取思考

>这里要回想一下爬取ajax用到的payload，分析发现class_id指示课程，homework_id就是产品id加上题的id，在这个基础上通过修改homework_id就可以爬取其它测试的题目了

#### 5、fildder使用技巧

- **url过滤**
如下设置:
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_22-43-41.jpg)
- **命令**
如下图：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/Snipaste_2019-11-27_22-46-29.jpg)

#### 6、源码
```python
import requests
import json

url = 'https://hfut.xuetangx.com/inner_api/homework/paper/subject/'

js = {
    'product_id': '20760', 
    'homework_id': 'H+20760+002', 
    'class_id': '37429',
}

data = json.dumps(js)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36',
    'content-type': 'application/json',
    'Cookie': 'UM_distinctid=16e7d6678b1646-00a194cda2b2cd-67e153a-1fa400-16e7d6678b2647; _log_user_id=2734764cb98e751f2fe903147269e33b; sharesessionid=b866b1c1a9dfefbf725810f324321dfe; frontendUserReferrer=http://www.xuetangx.com/cloud; frontendUserTrack=12298; frontendUserTrackPrev=12298; plat_id=369; org_id=503; mode=1; xt=gAAAAABd3fHjlrtKBB0j0ErFWIcCenWz7RgdyMeF1B1DRIk_z8DNkmhOVqHC8SxVw7JtnGMdkw4QHUP645TKkWJq-yYEJxzKuUGZYrWieH1Z25jvN-fozTU; xt_expires_in=604800; identity=1; CNZZDATA1273255756=947970158-1574057096-%7C1574845704; access_token=gAAAAABd3kdpfWD8-X_bmzP-Uvgde_xTX4tOyXLNzks4SmSyb0a_T5M30bFKGhs_cr0EPf0VuN7PCk6Lnl6k4nc-TyJG0ekvWnbWALxqLUsJcQnTgtaMT0g'
}


def get_json(data,index):
    res = requests.post(url,data = data,headers = headers).json()
    path = str(index+1)+".json"
    with open(path,'w',encoding = 'utf-8') as f:
            json.dump(res,f,indent = 2,ensure_ascii=False)


if __name__ == "__main__":   
     for i in range(13):
        id = js["homework_id"]
        id = id.split("+")
        if i<=7:
            id[-1] = str(0)+str(0)+str(i+2)
        else:
            id[-1] = str(0)+str(i+2)
        id = "+".join(id)
        js["homework_id"] = id
        data = json.dumps(js)
        get_json(data,i)
```

#### 7、小计

> 本来想利用itchat实现答案获取，但是网页版被封了就暂时到这了，欢迎大家留言讨论










