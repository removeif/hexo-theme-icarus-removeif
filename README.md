# 话不多说，先看两张图
## 首页
![首页](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191104185039.png)
## night模式
![night模式](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191216235632.png)
## 文章
![文章](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191104185116.png)
### 写在前面

博客源码包括两个主题[icarus](http://github.com/ppoffice/hexo-theme-icarus)和[next](https://github.com/iissnan/hexo-theme-next)，在主题基础之上参照各网友博客，以及自己的一些想法做出的一些修改以及增加部分新元素。  
因为修改了原作者源码，有什么问题请先联系我，不要去麻烦原作者了，能自己解决的问题就不要麻烦别人了，每个人的时间都很宝贵。  
膜拜和感谢所有模块的原作者,orz👻,辛苦了。  


线上博客：[欢迎围观](https://removeif.github.io/)，[博客源码Live Demo](https://removeif.github.io/removeif-demo/)

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
+ 文章列表评论数显示
+ 文章中推荐文章模块配置 
+ 增加深色主题切换
+ 加入加密文章
+ 碎碎念功能
+ 透明无界样式

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
#### 1.热门推荐，最新评论，文章评论数：
**仅针对gitalk评论有效，如果配置完后显示[本博客](https://removeif.github.io/)相关评论、推荐，请详细阅读这一条**  
文件路径：themes/icarus/source/js/comment-issue-data.js  
以下引号里的地址改成自己对应的博客评论的issues的仓库相关的值。
```yaml
// 评论issues仓库 by.removeif https://removeif.github.io/
var repoIssuesUrl = "https://api.github.com/repos/removeif/blog_comment/issues"; // removeif：用户名，blog_comment：评论的issue仓库
// 评论issues仓库 clientId、clientSecret怎么申请自行搜索，关于这暴露两个参数的安全问题，查看 https://removeif.github.io/2019/09/19/博客源码分享.html#1-热门推荐，最新评论：
var clientId = "46a9f3481b46ea0129d8";
var clientSecret = "79c7c9cb847e141757d7864453bcbf89f0655b24";
```
github api 详情可以参照[官方api说明](https://developer.github.com/v3/#rate-limiting)  
关于配置暴露client_id和client_secret安全性问题，gitalk作者有[解释](https://github.com/gitalk/gitalk/issues/150)  
+ 获取或修改 GitHub 用户数据，需要 token，为了拿到 token，除了需要 OAuth App 的 client_id 和 client_secret 外，还需要一个 Authorization Code。
+ 这个 code 是 GitHub 登录授权完成时，在跳转回 redirect_uri 的查询参数拿到的， redirect_uri 必须是在 OAuth App 配置的 callback URL 域名下。
+ 这样即使别人用了你的 client_id 和 client_secret ，跳转之后也拿不到 code，所以，有 client_id 和 client_secret 也做不了什么。

对应主题中要开启`gitalk评论，相应的最新评论、热门推荐、文章中评论数都需要依靠gitalk评论，如果使用主题中其他评论请删掉(2019.10.17已加上判断逻辑不用删掉了)此三个模块，以免出错`，如下配置xxx换成自己的，否则无效。
```yaml
comment:
    type: gitalk
    owner: xxx         # (required) GitHub user name
    repo: xxx          # (required) GitHub repository name
    client_id: xxx     # (required) OAuth application client id
    client_secret: xxx # (required) OAuth application client secret
    admin: xxx  #此账户一般为用户名 GitHub user name 文章中能创建issue需要此用户登录才可以，点了创建issue后刷新一遍才能看到！！！！
    create_issue_manually: true
    distraction_free_mode: true
```
说明：
+ 热门推荐数据为评论数最多的文章，🔥后面的数字：根据文章的评论数*101 。  
+ 最新评论：为该仓库下，所有issue中的最新评论。  
+ 目前的最新评论有10分钟的本地缓存，评论后可能10分钟后才能看见最新评论，出于性能优化，每次请求接口处理还是挺耗时，comment-issue-data.js中可以自己去掉。  

文章评论数图标对应的文件为：themes/icarus/layout/common/article.ejs，不需要的自行删掉以下两行
```yaml
<span class="display-none-class"><%- md5(post.path) %></span>
<img class="not-gallery-item" src="/images/chat.svg">&nbsp;<span class="level-item has-text-grey" id=<%- md5(post.path) %>>99+</span></img>           
```  

如果不使用热门推荐，删掉themes/icarus/layout/index.ejs中以下代码
```js
<% if (page.path == 'index.html' && get_config('comment.type') !== undefined && get_config('comment.type') == 'gitalk'){ %>
    <div class="card widget">
        <div class="card-content">
        <h3 class="menu-label">热门推荐</h3><span class="menu-label1" id="index_hot_div">加载中，稍等几秒...</span>
        </div>
    </div>
<% } %>
```
如果不使用最新评论，删掉themes/icarus/_config.yml中widgets:节点下代码
```yaml
    -
        # Widget name
        type: latest_comment
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
 ```js
<script type="text/javascript" async="" src="/live2d/autoload.js"></script>
```
不喜欢的可以直接删了，就不显示了。  
themes/icarus/source/live2d/waifu-tips.js  
themes/icarus/source/live2d/autoload.js   
上面两个位置可以配置相关的显示，以及模型。
`2.0版本之后只需要在_config.yml配置即可`
```text
live2Dswitch: off #live2D开关 on为打开,off为关闭
```

#### 6.置顶设置：
.md文章文件中头部加入了top字段，初始值是100，如果要置顶，需要设置为大于100的值，值越大越靠前。相等时，根据时间降序。(v2.0之前)  
`v2.0之后，默认不加入top,top值越大越靠前，大于0显示置顶图标。`
**v2.0之后**修改依赖包中文件removeif/node_modules/hexo-generator-index/lib/generator.js如下：
```js 
'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals){
    var config = this.config;
    var posts = locals.posts;
    posts.data = posts.data.sort(function(a, b) {


        if(a.top == undefined){
            a.top = 0;
        }
        if(b.top == undefined){
            b.top = 0;
        }

        if(a.top == b.top){
            return b.date - a.date;
        }else{
           return b.top - a.top;
        }
        //
        // console.log("a.top="+a.top+",b.top="+b.top)
        //
        // if(a.top && b.top) { // 两篇文章top都有定义
        //     if(a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
        //     else return b.top - a.top; // 否则按照top值降序排
        // }
        // else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
        //     return -1;
        // }
        // else if(!a.top && b.top) {
        //     return 1;
        // }
        // else return b.date - a.date; // 都没定义按照文章日期降序排
    });
    var paginationDir = config.pagination_dir || 'page';
    return pagination('', posts, {
        perPage: config.index_generator.per_page,
        layout: ['index', 'archive'],
        format: paginationDir + '/%d/',
        data: {
            __index: true
        }
    });
};
```
#### 7.配置文章中推荐文章模块  
根据配置的recommend值（必须大于0），越大越靠前，相等取最新的，最多取5条。recommend配置在.md文章头中，如下  
```yaml
title: 博客源码分享
top: 102
toc: true
recommend: 1 
keywords: categories-github
date: 2019-09-19 22:10:43
thumbnail: https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221611.png
tags: 工具教程
categories: [工具教程,主题工具]
```
#### 8.文章中某个代码块折叠的方法
代码块头部加入标记 "`>folded`"，如下。
```java main.java >folded
    // 使用示例，.md 文件中头行标记">folded"
    // ```java main.java >folded
    // import main.java
    // private static void main(){
    //     // test
    //     int i = 0;
    //     return i;
    // }
    // \\``` 
import main.java
private static void main(){
  // test
    int i = 0;
    return i;
}
```
#### 9.加入加密文章
如下需要加密的文章头部加入以下代码
```text

---
title: 2019成长记01
top: -1
toc: true
keywords: categories-java

#以下为文章加密信息
encrypt: true
password: 123456 #此处为文章密码
abstract: 咦，这是一篇加密文章，好像需要输入密码才能查看呢！
message: 嗨，请准确无误地输入密码查看哟！
wrong_pass_message: 不好意思，密码没对哦，在检查检查呢！
wrong_hash_message: 不好意思，信息无法验证！
---
```
#### 10.碎碎念的使用
在github中，创建碎碎念issue，并且打上对应的label（`eg:666666`），填写到source/self-talking/index.md文件中如下,
```js
<script>
    var gitalk = new Gitalk({
        clientID: '46a9f3481b46ea0129d8',
        clientSecret: '79c7c9cb847e141757d7864453bcbf89f0655b24',
        id: '666666',
        repo: 'issue_database',
        owner: 'removeif',
        admin: "removeif",
        createIssueManually: true,
        distractionFreeMode: false
    })
    gitalk.render('comment-container1')
</script>
```
#### 11.本博客样式（透明无界）
只需要放开themes/icarus/source/css/base.styl文件中以下样式代码注释即可，默认是注释的没启用
```css 
//=================本博客使用样式   start

// 首页去图
.body_hot_comment .comment-content .card-comment-item .ava, .media-left, .is-6-widescreen .card-image {
    display: none;
}

hover-color = #deeafb;
// 去card
.card {
    background-color: unset;
    box-shadow: unset;
}

.navbar, footer.footer {
    background-color: unset;
}

body:not(.night) .navbar:hover,
body:not(.night) .footer:hover,
body:not(.night) .card:hover,
body:not(.night) .pagination:hover,
body:not(.night) .post-navigation:hover{
    background-color: hover-color;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05),0 0 1px rgba(0,0,0,0.1);
}

.pagination, .post-navigation{
    padding: 10px;
}

.pagination .pagination-link:not(.is-current), .pagination .pagination-previous, .pagination .pagination-next {
    background-color:rgba(255,255,255,0);
}

.timeline .media:last-child:after {
    background: unset;
}
.content .gt-container .gt-comment-admin .gt-comment-content {
    border: 2px solid #deeafb;
}

//=================本博客使用样式   end
```
#### 以上配置好后
```yaml
$ npm install hexo --save #安装依赖包（只需要执行一次）
$ hexo clean #清除缓存
$ hexo g #编译 
$ hexo s #启动服务 
$ hexo d #推到远程 
```
安装依赖包（只需要执行一次），以后修改了代码 只需要执行后面几条就好。  
原来已有博客文章的迁移，只需要把原来对应的文章放到source/_posts里即可。然后去对应文章下面创建评论issue。  
widget中的归档和分类精简了，分别展示6条和21条。

enjoy！！！！👏👏👏👏👏👏👏

### 写在后面
如果你有问题请反馈: [issues](https://github.com/removeif/hexo-theme-icarus-removeif/issues) （请务必先于issues中寻找答案）  
如果你喜欢该主题: [star](https://github.com/removeif/hexo-theme-icarus-removeif)  
如果你想定制主题: [fork](https://github.com/removeif/hexo-theme-icarus-removeif) 

### 文章中横竖图demo；对于横竖图推荐分开使用，且长宽一致的，如统一手机拍照、电脑截图
使用方法：md文章中放入以下代码
```html

+ 横竖图

<div class="justified-gallery">

![张芷溪](http://wx1.sinaimg.cn/large/b5d1b710ly1g6bz7n92s7j212w0nr1kx.jpg) ![李一桐](http://wx2.sinaimg.cn/mw1024/005RAHfgly1fvfc4f19qfj33402c0qv9.jpg) ![gakki](http://wx1.sinaimg.cn/mw1024/70396e5agy1g5qe457i6yj21660ogtap.jpg) ![李一桐](http://wx1.sinaimg.cn/mw1024/005RAHfgly1fuzz17s2q3j32e43cku0x.jpg) ![彭小苒](http://wx1.sinaimg.cn/mw1024/d79c9b94ly1g1pb1uthr5j21f02iox6t.jpg)</div>

+ 横图4

<div class="img-x">

![v4](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191022182226.png) ![v3](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191018114126.png) ![v4](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191022182226.png) ![v3](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191018114126.png)</div>

+ 竖图5

<div class="img-y">

![电池](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191024145940.jpg) ![打王者荣耀](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191024141906.jpg) ![支付宝付款](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191024141926.jpg) ![锤子便签](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191024145956.jpg) ![电池](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191024145940.jpg)</div>

```
#### 效果如下（多图左右拉查看）
[查看效果](https://removeif.github.io/theme/%E5%8D%9A%E5%AE%A2%E6%BA%90%E7%A0%81%E5%88%86%E4%BA%AB.html#效果如下（多图左右拉查看）)

### License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/removeif/hexo-theme-icarus-removeif/blob/master/LICENSE) file for details.

### 博客快照：
+ 主页
![v4](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191022182226.png)
![v3](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191018114126.png)
![v2](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191014183620.png)
![v1](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221347.png)
+ 置顶
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190926210437.png)
+ 文章评论数
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191016133335.png)
+ 推荐文章模块
![](https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20191107131513.png)
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
