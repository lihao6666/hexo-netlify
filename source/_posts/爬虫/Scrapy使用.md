---
title: Scrapy使用
date: 2021-01-06 09:04:34
tags: 爬虫
categories: 爬虫
---

## 一、简单使用

### 1、项目概览

```cmd
scrapy startproject tutorial //可以创建一个项目
```

项目目录如下:
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/scrapy%E6%A1%86%E6%9E%B6%E7%9B%AE%E5%BD%95.png)

* spiders文件夹是自己爬虫任务的文件夹，其它是项目配置文件

### 2、创建爬虫任务

```cmd
scrapy gensipder [任务名] [默认网址]
```

① 在项目`item.py`文件中修改要爬取的信息

```python

import scrapy

class WeiboTopItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    ranking = scrapy.Field()
    content = scrapy.Field()
    count = scrapy.Field()
    desc = scrapy.Field()

```

② 在spider中的任务中修改爬取目标如下


```python
import scrapy
from weibo.items import WeiboTopItem


class HotSpider(scrapy.Spider):
    name = 'hot'
    allowed_domains = ['https://s.weibo.com/top/summary/']
    start_urls = ['https://s.weibo.com/top/summary/']

    def parse(self, response):
        try:
            hots = response.xpath("//tr")
            for hot in hots:
                item = WeiboTopItem()
                item['ranking'] = hot.xpath('td[@class="td-01 ranktop"]/text()').extract_first()
                item['content'] = hot.xpath('td[@class="td-02"]/a/text()').extract_first()
                item['count'] = hot.xpath('td[@class="td-02"]/span/text()').extract_first()
                item['desc'] = hot.xpath('td[@class="td-03"]/i/text()').extract_first()
                yield item

        except:
            print("出错了")
            return 
```
③ 运行运行命令

```cmd
    scrapy crawl [任务名] 
    scrapy crawl [任务名] -O res.json //保存结果为json文件，-O是覆盖，-o是文件追加
```
④ 注意


注意如果结果有中文，要在项目的setting文件中添加`FEED_EXPORT_ENCODING = 'UTF8'`,这样才能正确保存

### 3、批量爬取(链接追踪)

① 默认爬取链接设置
在`def start_requests(self):`中设置默认的爬取url列表
如下：
```python
def start_requests(self):
        tweet_ids = ['IDl56i8av', 'IDkNerVCG', 'IDkJ83QaY']
        urls = [f"{self.base_url}/comment/hot/{tweet_id}?rl=1&page=1" for tweet_id in tweet_ids]
        for url in urls:
            yield Request(url, callback=self.parse) # 将下一步要爬取页面的url进行加入
```

② 爬取过程中链接加入

在`def parse(self,response):`中根据爬取的内容，再讲url进行返回，注意这里每调用一次`scrapy.Request(url,callback=self.parse)`都会调用一次parse，所以这里添加的url是接着start_requests()中的第一个url添加的

例如:
```python
def parse(self, response):
        if response.url.endswith('page=1'):
            all_page = re.search(r'/>&nbsp;1/(\d+)页</div>', response.text)
            if all_page:
                all_page = all_page.group(1)
                all_page = int(all_page)
                all_page = all_page if all_page <= 50 else 50
                for page_num in range(2, all_page + 1):
                    page_url = response.url.replace('page=1', 'page={}'.format(page_num))
                    yield Request(page_url, self.parse, dont_filter=True, meta=response.meta)
```

③ 链接拼接

如果下一个url和默认地址`start_url`有参数的关系，可以直接使用如下进行url拼接

```python
    url = response.urljoin(next)
    yield scrapy.Request(url = url,callback = self.parse,dont_filter=True)
```

### 4、使用header和cookie

#### 在setting修改
在项目的`setting`文件中注释`COOKIES_ENABLED = False`和`DEFAULT_REQUEST_HEADERS`，并在其中添加如下:

```python
DEFAULT_REQUEST_HEADERS = {
    'User-Agent': '',
    'Cookie': ''
}
```

#### 在start_request()重写
百度





## 二、进阶使用

### 1、MiddleWare使用

> 有spider中间件和download中间件，可以用来配置更换代理IP，更换Cookies，更换User-Agent，自动重试等

#### 简介
如果没有中间件，爬虫流程如下：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/20210415131447.png)

有中间件，爬虫流程如下：
![](https://blog-1257711631.cos.ap-nanjing.myqcloud.com/markdownpic/20210415131623.png)

#### 使用

在scrapy中集成selenium

- 先在setting中取消注释如下
```python
DOWNLOADER_MIDDLEWARES = {
   'weibo.middlewares.WeiboDownloaderMiddleware': 543,
}
```
- 在middlewares.py文件中编写如下代码

```python

class WeiboDownloaderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.
    def __init__(self, ):
        chrome_options= webdriver.ChromeOptions()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        mobileEmulation = {'deviceName' :'iPhone 6'}
        chrome_options.add_experimental_option('mobileEmulation',mobileEmulation)
        self.browser = webdriver.Chrome(chrome_options=chrome_options)
        # browser.set_window_size(1920, 1080)
        self.wait = WebDriverWait(self.browser,2)

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        if request.meta.get('mid_url'):
            self.content = request.meta.get('content')
            self.headers = request.meta.get('headers')
            self.mid_url = request.meta.get('mid_url')
            
            self.browser.get(request.url)
            self.browser.find_element_by_class_name('m-search').click()
            input = self.wait.until(EC.presence_of_element_located((By.XPATH, '//input')))
            input.send_keys(self.content)
            input.send_keys(Keys.ENTER)
            # self.wait.until(EC.presence_of_element_located((By.XPATH,'//li/span[contains(text(),"热门")]'))).click()
            more = self.wait.until(EC.presence_of_element_located((By.XPATH,'//*[contains(text(),"更多热门微博")]')))
            self.browser.execute_script("arguments[0].click()",more)
            sp = self.browser.current_url.find("index")
            self.target_url = self.mid_url+self.browser.current_url[sp+6:-1]
            # print(self.target_url)
            self.browser.quit()


            response = requests.get(url=self.target_url,headers = self.headers)

            #注意这里要返回HtmlResponse类型给spider，这里返回给parse的数据是网页返回的数据所以使用response.text
            # 如果返回给网页html请使用self.browser.page_source
            return HtmlResponse(url = self.target_url,body=response.text,encoding="utf-8",request=request,status=200)
        else:
            return None

```


在scrapy中构造请求头和代理等等

我会，但我就不写，就是玩



### 2、Pipeline使用

> 主要用于爬取后数据处理，包括数据清洗和存储等

#### 修改配置

在setting.py文件中添加pipeline文件中对应的类

```python
ITEM_PIPELINES = {
   'weibo.pipelines.SpiderPipeline': 300,
#    'weibo.pipelines.ZhihuPipeline': 300,
}
```


#### pipeline.py文件修改

```python
class SpiderPipeline(object):
    def __init__(self):
        client = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
        db = client['parse'] # 选择数据库
        self.Weibo = db["Weibo"]  #选择collection
        self.Zhihu = db["Zhihu"]
        self.WeiboHot = db["WeiboHot"]
        self.ZhihuHot = db["ZhihuHot"]
        self.Search = db["Search"]
        self.WeiboHot.remove({}) #数据库表清空
        self.ZhihuHot.remove({})
        self.set = False #设置第几轮读取
        self.patch = 0
    # 读取当前爬取批次
    def set_patch(self):
        search = self.Search.find_one({"search_content":self.search_content})
        if search:
            self.patch = search["patch"]+1
            self.Search.update_one({"search_content":self.search_content},{"$set": { "patch": self.patch }})
        else:
            self.patch = 1
            self.insert_item(self.Search,{"search_content":self.search_content,"patch":1})
        self.set = True


    # 爬虫处理
    def process_item(self, item, spider):
        # print(spider.name)
        if spider.name == 'hot':
            if isinstance(item, WeiboTopItem):
                self.insert_item(self.WeiboHot, item)
            else:
                self.insert_item(self.ZhihuHot, item)
        elif spider.name == 'zhihu' or spider.name == 'weibo':
            # print(item["content"])
            if not self.set:
                self.search_content = item["search_content"]
                self.set_patch()
            else:
                pass
            item["search_patch"] = self.patch
            if spider.name == 'zhihu':
                self.insert_item(self.Zhihu, item)
            else:
                self.insert_item(self.Weibo, item)
        return item

    @staticmethod
    def insert_item(collection, item):
        try:
            collection.insert(dict(item))
        except DuplicateKeyError:
            print("pipe error")
            pass
```



### 3、Scrapyd使用

#### 安装

```cmd
pip install scrapyd
pip install scrapyd-client

```

#### 启动scrapyd

在命令行中输入`scrapyd`

#### 部署爬虫

进入到爬虫项目文件夹中，也就是有scrapy.cfg的文件夹中，修改scrapy.cfg文件如下

```python

[settings]
default = parse.settings

[deploy:parse] # deploy后表示项目
url = http://localhost:6800/
project = parse

···

然后运行命令如下,可以在http://localhost:6800/下查看部署的爬虫

```cmd
scrapyd-deploy parse -p parse
```

#### 运行爬虫

project 后为爬虫名字也就是前面部署时候`-p`后面的名字

```cmd
curl http://localhost:6800/schedule.json -d project=default -d spider=hot 
```

#### 请求运行爬虫

为了调用爬虫，也可以通过请求加参数来实现爬虫调用，具体调用如下:

```python
import requests

url = 'http://localhost:6800/schedule.json
data = {'project':'parse','spider':'hot','keyword':'京东'}

requests.post(url,data = data)
```




