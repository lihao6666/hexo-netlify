---
title: django后端构建
date: 2021-04-17 13:30:43
tags: 毕设
categories: 毕设
---

## 一、基础配置

### 数据库配置

因为使用mongodb数据库，在Django中没有相对应的数据引擎，所以需要配置下，详细请参考[django下优雅配置mongodb](https://cloud.tencent.com/developer/article/1541782)

- 安装djongo库

```cmd
pip install djongo
```

- setting数据库配置

```python
DATABASES = {
   'default': {
      'ENGINE': 'djongo',
      'ENFORCE_SCHEMA': True,
      'NAME': 'djongo_example', #数据库名字
      'HOST': '127.0.0.1',
      'PORT': 27017,
   }
}
```

### ORM映射
[djongo官网](https://www.djongomapper.com/)

#### 1、model定义

`使用EmbeddedField来描述Entry中包含Blog数据对象`
```python
   from djongo import models

   class Blog(models.Model):
      name = models.CharField(max_length=100)

      class Meta:
         abstract = True

   class Entry(models.Model):
      blog = models.EmbeddedField(
         model_container=Blog
      )    
      headline = models.CharField(max_length=255)    

   e = Entry()
   e.blog = {
      'name': 'Djongo'
   }
   e.headline = 'The Django MongoDB connector'
   e.save()
```

`使用ArrayField来描述多重包含关系`

```python
from djongo import models

class Entry(models.Model):
    blog = models.ArrayField(
        model_container=Blog
    )    
    headline = models.CharField(max_length=255)    

e = Entry()
e.blog = [
    {'name': 'Djongo'}, {'name': 'Django'}, {'name': 'MongoDB'}
]
e.headline = 'Djongo is the best Django and MongoDB connector'
e.save()
```








## 二、问题记录

### 1、后端跨域问题

使用第三方包

①安装`django-cors-headers`

```cmd
pip install django-cors-headers
```

②配置`settings.py`文件

- 在在INSTALLED_APPS里添加`corsheaders`

   ```python
   INSTALLED_APPS = [
      'corsheaders',
   ]
   ```
- 注释掉MIDDLEWARE_CLASSES中的`django.middleware.csrf.CsrfViewMiddleware`

- 在MIDDLEWARE_CLASSES添加配置

   ```python
   MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    )
   ```

- 在setting.py中增加如下配置

   ```python
   CORS_ALLOW_CREDENTIALS = True
   CORS_ORIGIN_ALLOW_ALL = True
   CORS_ORIGIN_WHITELIST = ()
   
   CORS_ALLOW_METHODS = (
      'DELETE',
      'GET',
      'OPTIONS',
      'PATCH',
      'POST',
      'PUT',
      'VIEW',
   )
   
   CORS_ALLOW_HEADERS = (
      'accept',
      'accept-encoding',
      'authorization',
      'content-type',
      'dnt',
      'origin',
      'user-agent',
      'x-csrftoken',
      'x-requested-with',
   )
   ```