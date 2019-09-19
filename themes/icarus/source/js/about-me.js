function createtime() {
    var n = new Date("11/11/2018 00:00:00");
    now.setTime(now.getTime() + 250),
        days = (now - n) / 1e3 / 60 / 60 / 24,
        dnum = Math.floor(days),
        hours = (now - n) / 1e3 / 60 / 60 - 24 * dnum,
        hnum = Math.floor(hours),
    1 == String(hnum).length && (hnum = "0" + hnum),
        minutes = (now - n) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
        mnum = Math.floor(minutes),
    1 == String(mnum).length && (mnum = "0" + mnum),
        seconds = (now - n) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
        snum = Math.round(seconds),
    1 == String(snum).length && (snum = "0" + snum),
        document.getElementById("timeDate").innerHTML = "自❤️2018.11.11❤️已运行<br/> " + dnum + " 天 ",
        document.getElementById("times").innerHTML = hnum + " 小时 " + mnum + " 分 " + snum + " 秒！"
}

var now = new Date;
setInterval("createtime()", 250);

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function () { // 获取一句诗
    $.post("https://api.gushi.ci/all.json", {}, function (data, status) {
        var htmlC = "<blockquote>" + data.origin + "<br>\"" + data.content + "\"<br>–" + data.author + "</blockquote>";
        $("#poetry-container-time").append("<p>" + new Date().Format("yyyy.MM.dd/hh:mm:ss") + "</p>" + htmlC);
    })
});

$(function () { // 获取记录数据
    $.getJSON("../json_data/record.json", function (data) {
        $.each(data, function (i, e) {
            var html = '<li class="time-axis-item">' +
                '<div class="time-axis-date">' + e.date + '<span></span></div>' +
                '<div class="time-axis-title">' + e.title + '</div>' +
                '<p class="time-axis-achievement">' + e.achievement + '</p>' +
                '</li>';
            $('.time-axis').append(html);
        });
    })
});

