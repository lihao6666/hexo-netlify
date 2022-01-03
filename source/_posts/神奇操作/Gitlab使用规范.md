---
title: Gitlab使用规范
date: 2019-12-20 18:39:12
tags: git
categories: 神奇操作
---

## Gitlab使用规范

### 一、Git和Github关联
```

# ①查看本地是否有id_rsa和id_rsa.pub文件
# ②如果没有，运行下面命令
ssh-keygen  -t rsa –C "邮箱"
# ③ 打开id_rsa.pub(公钥)，复制内容，进入github添加ssh keys,将公匙内容复制到Key中

```

### 二、Git基本使用

#### 1、简单配置及命令

```

# 配置用户名和邮箱

git  config --global  user.email lh
git  config --global  user.name 1956413161@qq.com

# 初始化本地仓库(当前文件夹下会产生.git文件夹为本地代码仓库)

git init

# 克隆仓库

git clone http://.....
git clone -b [分支名] http...


# 将文件添加到暂存区

git add [文件名]

# 将暂存区文件提交到仓库

git commit -m "备注信息"
git commit -a -m "备注信息" #将所有已跟踪文件中的执行修改或删除操作的文件都提交到本地仓库，不需要add
git commit --amend # 将修改合并到上一次提交中，就是不增加commit记录


# 检查是否有文件未提交

git status

# 查看修改未提交文件的差异

git diff [文件名] #默认是工作区与暂存区
git diff 

# 查看提交历史

git log
git log --pretty=oneline #显示主要内容

```
#### 2、Git版本回退

```
# 获取历史版本号

git reflog

# 回退到上一版本

git reset --hard HEAD^

# 回退指定版本号

git reset --hard [版本号] #版本号可以使用上面的命令查看

```

#### 3、分支管理

```

# 创建分支

git branch [分支名]

# 切换分支

git checkout [分支名]
git checkout -b [分支名] #创建并切换

# 分支合并

git merge [分支]

# 删除分支

git branch -d [分支名]

```
#### 4、文件推送到Github

```

# 关联Github仓库

git remote add origin [github仓库]

# 提交到Github仓库主分支

git push origin master # origin表示远程主机，master表示主分支

```

### Git进阶使用

#### 1、git stash

如果当前分支开发过程中，想切换到另一个分支，但是不想commit到仓库，可以先运行`git stash`进行储藏 ，然后可以切换到另一个分支，如果切换回来后，可以运行`git stash apply`恢复分支存储

#### 2、修改已经push的commit message

修改最近的几个commit message,其中HEAD后面的数字表示修改最近的几个commit message

```Shell
git rebase -i HEAD~5
```

接下来会显示如下这样的界面，需要你使用VIM的编辑方式将你需要修改的commit messsage前面的`pick`改成`edit`

```Shell
pick 1d316b0 1 ->改为 edit 1d316b0 1
pick f429786 2
pick 880cfbc 3
pick c55cf56 4
pick d10fd07 5
```

保存后先使用amend命令修改commit message

```Shell
git commit --amend
```

修改message后运行rebase命令保存修改

```Shell
git rebase --continue
```

根据上面选择修改的commit进行多次重复操作，修改完全后，使用push -f 命令强制更新远程commit

```Shell
git push -f origin [分支名]
```
