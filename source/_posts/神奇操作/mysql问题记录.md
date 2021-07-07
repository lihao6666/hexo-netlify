---
title: mysql问题记录
date: 2021-06-30 11:56:40
tags: 神奇操作
categories: 神奇操作
---


## mysql触发器

mysql触发器不能对本表触发insert、update、delete操作，update可以通过set实现，delete只能通过第二张表。

```sql
create trigger instancedelete after update on Patients for each row
begin
	delete from Patients where new.InstanceCount = 0 and PatientID = new.PatientID and DoctorID = new.DoctorID ;
end;
```

上面的触发器语句就会报错`Can't update table 'Patients' in stored function/trigger because it is already used by statement`

## mysql的锁机制问题



### mysql锁

[mysql锁机制](https://blog.csdn.net/qq_38238296/article/details/88362999)

#### 1、行锁、表锁、页锁

##### 行锁

行锁是对当前操作加锁，锁粒度最小，开销最大，分为共享锁和排他锁

**共享锁**

也叫做读锁，就是用于不会更改数据库数据的操作，如select等，如果事务T对数据A加上共享锁后，则其他事务只能对A再加共享锁，不能加排他锁。获准共享锁的事务只能读数据，不能修改数据。

**排它锁**

也叫做写锁，用于一些会改变数据库数据的操作，如insert、update等操作，如果事务T对数据A加上排他锁后，则其他事务不能再对A加任任何类型的封锁。获准排他锁的事务既能读数据，又能修改数据。

##### 表锁

表级锁是mysql锁中粒度最大的一种锁，表示当前的操作对整张表加锁，资源开销比行锁少，不会出现死锁的情况，但是发生锁冲突的概率很大。

##### 页锁

页级锁是MySQL中锁定粒度介于行级锁和表级锁中间的一种锁。表级锁速度快，但冲突多，行级冲突少，但速度慢。所以取了折衷的页级，一次锁定相邻的一组记录。

#### 2、乐观锁和悲观锁

##### 乐观锁

相对悲观锁而言，乐观锁假设认为数据一般情况下不会造成冲突，所以在数据进行提交更新的时候，才会正式对数据的冲突与否进行检测，如果发现冲突了，则让返回用户错误的信息，让用户决定如何去做。在对数据库进行处理的时候，乐观锁并不会使用数据库提供的锁机制。一般的实现乐观锁的方式就是记录数据版本。

但是如果当两个事务都修改了同一个记录的时候，在进行写入的时候就会出现冲突了。


##### 悲观锁

悲观锁，就是对所有操作都认为是会改变记录的，即如果一个事务执行的操作对某行数据应用了锁，那只有当这个事务把锁释放，其他事务才能够执行与该锁冲突的操作，相当于事务在访问记录的时候，都会先加上排他锁然后进行访问，访问结束后才会释放

#### 3、

### pymysql的线程安全问题

在多线程调用pymysql中的sql操作时，会报错如下:

```python

pymysql.err.InternalError: Packet sequence number wrong - got 0 expected 1

```
   
原因如下：pymysql的线程安全为1，参考[pymysql文档](https://www.python.org/dev/peps/pep-0249/#threadsafety),所以当使用多线程访问mysql时，不能共享使用一个连接，所以我们需要构建一个连接池，针对多线程的操作调用不同的连接。

```python
from dbutils.pooled_db import PooledDB
import pymysql

pool = PooledDB(pymysql,5,host='127.0.0.1',user='root',passwd='hhhhhh',db='orthanc2',port=3306,setsession=['SET AUTOCOMMIT = 1']) # 5为连接池里的最多连接数，setsession=['SET AUTOCOMMIT = 1']是用来设置线程池是否打开自动更新的配置，0为False，1为True

conn = pool.connection()  #以后每次需要数据库连接就是用connection获取连接
cur=conn.cursor()
SQL="select * from Doctors"
count=cur.execute(SQL)

results=cur.fetchall()
print(results)

cur.close()
conn.close()


```



