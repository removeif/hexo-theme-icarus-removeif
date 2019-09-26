### 写在前面

博客源码包括两个主题[icarus](http://github.com/ppoffice/hexo-theme-icarus)和[next](https://github.com/iissnan/hexo-theme-next)，在主题基础之上参照各网友博客，以及自己的一些想法做出的一些修改以及增加部分新元素。  
因为修改了原作者源码，有什么问题请先联系我，不要去麻烦原作者了，能自己解决的问题就不要麻烦别人了，每个人的时间都很宝贵。  
膜拜和感谢所有模块的原作者,orz👻,辛苦了。  


线上博客：[欢迎围观](https://removeif.github.io/)

### 一、icarus主题之上主要改动
+ 新增gitalk最新评论widget
+ 首页增加热门推荐
+ 增加弹性配置影音（可加音乐、视频）模块
+ 丰富弹性配置about页面
+ 新增弹性配置友链模块
+ 整体布局左右拉伸了一点，紧凑一些
+ 引入可配置看板娘
+ 归档页加入了一个文章贡献概览
+ 置顶文章的设置

### 二、部分配置说明：

#### 本机环境：
```jshelllanguage
192:hexo-theme-icarus-removeif xx$ node -v
v11.1.0
192:hexo-theme-icarus-removeif xx$ npm -v
6.4.1
```  
#### 克隆博客代码到本地
```jshelllanguage
git clone https://github.com/removeif/hexo-theme-icarus-removeif.git
```
#### 开始部分配置：
**敲黑板！！！！首先全局以及主题中的`_config.yml`配置成自己的对应参数。**
#### 1.热门推荐，最新评论：
文件路径：themes/icarus/source/js/global-hot-data.js
```yaml
 22行 https://api.github.com/repos/removeif/blog_comment/issues/comments?sort=created&direction=desc&per_page=10&page=1
 ```
改成自己对于的博客评论的issues的仓库。
对应主题中要开启gitalk评论，如下配置xxx换成自己的，否则无效。
```yaml
comment:
    type: gitalk
    owner: xxx         # (required) GitHub user name
    repo: blog_comment          # (required) GitHub repository name
    client_id: xxx     # (required) OAuth application client id
    client_secret: xxx # (required) OAuth application client secret
    admin: xxx
    createIssueManually: true
```
说明：热门推荐数据为评论数最多的文章，🔥后面的数字：根据文章的评论数*101 。  
最新评论：为该仓库下，所有issue中的最新评论。  
如果不使用热门推荐，删掉themes/icarus/layout/index.ejs中以下代码
```js
<% if (page.path == 'index.html') { %>
<div class="tag is-white" style="font-size:15px;">热门推荐：</div>
<br>
<br>
<div class="tags hot-tags" id = "index_hot_div">
加载中，稍等几秒...
</div>
<% } %>
```
如果不使用最新评论，删掉themes/icarus/_config.yml中中以下代码
```yaml
widgets:
    -
        # Widget name
        type: hot_comment
        # Where should the widget be placed, left or right
        position: right
```

#### 2.友链数据文件：
文件路径：themes/icarus/source/js/friend.js  
相应格式配置就好。


#### 3.影音数据文件：
文件路径： 
音乐：themes/icarus/source/json_data/music.json  
视频：themes/icarus/source/json_data/video.json    
相应格式配置就好。     
        
#### 4.关于页面时间轴记录数据文件：
文件路径：themes/icarus/source/json_data/record.json   
相应格式配置就好。
相关的js在各自页面的.md文件中可以找到。

#### 5.看板娘配置
具体文件引用位置：themes/icarus/layout/layout.ejs  
 ```java
 39行 <script type="text/javascript" async="" src="/live2d/autoload.js"></script>
```
不喜欢的可以直接删了，就不显示了。  
themes/icarus/source/live2d/waifu-tips.js  
themes/icarus/source/live2d/autoload.js   
上面两个位置可以配置相关的显示，以及模型。

#### 6.置顶设置：
.md文章文件中头部加入了top字段，初始值是100，如果要置顶，需要设置为大于100的值，值越大越靠前。相等时，根据时间降序。

#### 7.以上配置好后
```yaml
$ npm install hexo --save #安装依赖包（只需要执行一次）
$ hexo clear #清除缓存
$ hexo g #编译 
$ hexo s #启动服务 
$ hexo d #推到远程 
```
安装依赖包（只需要执行一次），以后修改了代码 只需要执行后面几条就好。

enjoy！！！！👏👏👏👏👏👏👏

### 写在后面
如果你有问题请反馈: [issues](https://github.com/removeif/hexo-theme-icarus-removeif/issues) （请务必先于issues中寻找答案）  
如果你喜欢该主题: [star](https://github.com/removeif/hexo-theme-icarus-removeif)  
如果你想定制主题: [fork](https://github.com/removeif/hexo-theme-icarus-removeif) 

### License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/removeif/hexo-theme-icarus-removeif/master/LICENSE) file for details.

### 博客快照：
+ 主页
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221347.png)
+ 归档
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221733.png)
+ 留言
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221820.png)
+ 友链
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221917.png)
+ 美图
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221949.png)
+ 影音
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919222030.png)
+ 关于
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919222131.png)
