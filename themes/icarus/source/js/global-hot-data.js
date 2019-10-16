// 评论issues仓库 by.removeif https://removeif.github.io/
var repoIssuesUrl = "https://api.github.com/repos/removeif/blog_comment/issues";
// 对应仓库 clientId、clientSecret 关于这两个参数的安全问题，查看 https://removeif.github.io/2019/09/19/博客源码分享.html#1-热门推荐，最新评论：
var clientId = "46a9f3481b46ea0129d8";
var clientSecret = "79c7c9cb847e141757d7864453bcbf89f0655b24";

function getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}

$(document).ready(setTimeout(function () { // 延迟1s执行，保证其余的先加载

        var COMMENT_ARR = {};
        var COMMENT_COOKIE = document.cookie;
        var COMMENT = {};

        if (COMMENT_COOKIE != '') {
            console.log("load cache data...");
            // 异常不影响结果，继续往下执行
            try {
                COMMENT = JSON.parse(COMMENT_COOKIE.split("commentV=")[1]);
                COMMENT_ARR = COMMENT["data"];
            }catch (e) {
                COMMENT_COOKIE = '';
                console.error(e);
            }
        }


        if (COMMENT_COOKIE == '' || new Date().getTime() - COMMENT["date"] > 60 * 1000 * 10) { // request per 10 minutes
            console.log("load data...");
            var resultMap = {};
            var resultArr = [];
            $.ajaxSettings.async = false;
            // sort=comments可以按评论数排序，此处更适合按更新时间排序,可以根据updated排序，但是0条评论的也会出来，所以此处还是全部查出来，内存排序
            // per_page 每页数量，根据需求配置
            console.log("request url:" + "https://api.github.com/repos/removeif/blog_comment/issues/comments?sort=created&direction=desc&per_page=10&page=1");
            $.getJSON(repoIssuesUrl + "/comments?sort=created&direction=desc&per_page=10&page=1&client_id=" + clientId + "&client_secret=" + clientSecret, function (result) {
                $.each(result, function (i, item) {
                    var contentStr = item.body.trim();
                    if (contentStr.lastIndexOf(">") != -1) {
                        contentStr = contentStr.substr(contentStr.lastIndexOf(">") + 1);
                    }
                    // 替换图片
                    contentStr = contentStr.replace(/![\s\w\](?:http(s)?:\/\/)+[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+\)/g, "[图片]");

                    // 替换网址
                    contentStr = contentStr.replace(/(?:http(s)?:\/\/)+[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+/g, "[网址]");
                    if (contentStr.length > 50) {
                        contentStr = contentStr.substr(0, 60);
                        contentStr += "...";

                    }

                    // 获取跳转url
                    var itemUrl = "";
                    $.ajaxSettings.async = false;
                    $.getJSON(item.issue_url + "?client_id=" + clientId + "&client_secret=" + clientSecret, function (result) {
                        itemUrl = result.body.substr(0, result.body.indexOf("\n") - 1);
                    });
                    // 放入
                    resultArr.push({
                        "content": contentStr,
                        "date": item.created_at,
                        "userName": item["user"].login,
                        "userUrl": item["user"].html_url,
                        "userAvatar": item["user"].avatar_url,
                        "url": itemUrl
                    });
                });
            });

            resultMap["date"] = new Date().getTime();
            resultMap["data"] = resultArr;
            COMMENT_ARR = resultArr;
            if (COMMENT_ARR.length > 0) {
                document.cookie = "commentV=" + JSON.stringify(resultMap) + ";path=/";
            }
        }

        // 加载最新评论内容
        if (COMMENT_ARR.length > 0) {
            var htmlContentWidget = "<h3 class=\"menu-label\">" + "最新评论<br></h3>" + "<div class='comment-content'>";
            for (var i = 0; i < COMMENT_ARR.length; i++) {
                var item = COMMENT_ARR[i];
                var contentStr = item.content;
                htmlContentWidget +=
                    "<div class='card-comment-item'>"+"<a href=\"" + item.userUrl + "\"target=\"_blank\">"+"<img class='ava' src='" + item.userAvatar + "'>" +
                    "<div class=\"tag is-success item\">"  + item.userName + "</a>&nbsp;发表于" + getDateDiff(new Date(item.date).getTime()) + "<br>" + "<a href =\"" + item.url + '#comment-container' + "\"target=\"_blank\">" + contentStr + "</a></div>" +
                    "</div><br>";
            }
            htmlContentWidget += "</div>"
            $("#body_hot_comment").html(htmlContentWidget);
        }

        // 加载热门推荐
        var classDiv = "";
        var hotContent = "";
        if ($("#index_hot_div").length > 0) {
            var hotDiv = $("#index_hot_div");
            $.ajaxSettings.async = false;
            console.log("request url:" + "https://api.github.com/repos/removeif/blog_comment/issues?per_page=10&sort=comments");
            $.getJSON(repoIssuesUrl + "?per_page=10&sort=comments&client_id=" + clientId + "&client_secret=" + clientSecret, function (result) {
                $.each(result, function (i, item) {
                    // 标签配色
                    if (i >=0 & i<4) {
                        classDiv = "class=\"tag is-danger\"";
                    } else if (i >=4 & i<7) {
                        classDiv = "class=\"tag is-success\"";
                    } else if (i >=7 & i<9) {
                        classDiv = "class=\"tag is-warning\"";
                    } else {
                        classDiv = "class=\"tag is-white is-white1\"";
                    }
                    hotContent += "<a href =\"" + item.body.substr(0, item.body.indexOf("\n") - 1) + "\"target=\"_blank\"" + classDiv + ">" + item.title.substr(0, item.title.indexOf("-") - 1) + "&nbsp;🔥" + (item.comments*101) + "</a>&nbsp;&nbsp;"
                })
                hotDiv.html("");
                hotDiv.append(hotContent);
            });
        }

        // 装载评论数到文章对应位置
        var gitalkIdsArr = document.getElementsByClassName('display-none-class');
        if (gitalkIdsArr != undefined && gitalkIdsArr.length > 0) {
            for (i = 0; i < gitalkIdsArr.length; i++) {
                var id = gitalkIdsArr[i].innerText;
                var reqUrl = repoIssuesUrl + "?client_id=" + clientId + "&client_secret=" + clientSecret + "&labels=Gitalk," + id + "&t=" + new Date().getTime();
                $.getJSON(reqUrl, function (result) {
                    try {
                        $("#" + id).html(result[0].comments);
                    } catch (e) {
                        console.error(e);
                    }
                });
            }
        }

        console.clear();
        console.log("~~~~xiu xiu xiu 欢迎光临~~~");
        console.log("~~~~唉，控制台太多报错了，呜呜呜呜~~~");
        console.log("~~~~记得有时间多来看看哦，https://removeif.github.io/")
    }
    ,
    1000
))
;