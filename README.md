**说在前面**
博客在icarus主题之上参照各网友博客，以及自己的一些想法做出的一些修改以及增加部分新元素。
膜拜和感谢所有模块的原作者,orz👻,辛苦了。
上线博客demo：[欢迎围观](https://removeif.github.io/)
### 部分配置说明：

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

#### 2.友链数据文件：
文件路径：themes/icarus/source/js/friend.js  
相应格式配置就好。


#### 3.影音数据文件：
文件路径：音乐：themes/icarus/source/json_data/music.json
        视频：themes/icarus/source/json_data/video.json
相应格式配置就好。     
        
#### 4.关于页面时间轴记录数据文件：
文件路径：themes/icarus/source/json_data/record.json   
相应格式配置就好。
相关的js在各自页面的.md文件中可以找到。

#### 5.看板娘配置
具体文章引用位置：   
 ```java
 39行 <script type="text/javascript" async="" src="/live2d/autoload.js"></script>
```
不喜欢的可以直接删了，就不显示了。
themes/icarus/source/live2d/waifu-tips.js 
themes/icarus/source/live2d/autoload.js
上面两个位置可以配置相关的显示，以及模型。

#### 6.以上配置好后
```yaml
#hexo clear 清除缓存 hc
#hexo g 编译 
#hexo s 启动服务 
#hexo d  推到远程 

enjoy！！！！👏👏👏👏👏👏👏

有什么问题，欢迎issue里讨论。


博客快照：
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919221347.png)
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919221733.png)
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919221820.png)
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919221917.png)
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919221949.png)
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919222030.png)
![](https://raw.githubusercontent.com/removeif/blog_image/master/img/2019/20190919222131.png)
