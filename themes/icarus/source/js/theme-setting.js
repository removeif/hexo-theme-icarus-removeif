// 是否为黑夜
var expireTime1H = 1000 * 60 * 60; // 1小时过期
var isNightRange = function (beginTime, endTime) {
    let nowDate = new Date();
    var nowTime = nowDate.getHours() + ":" + nowDate.getMinutes();
    var strb = beginTime.split(":");
    if (strb.length != 2) {
        return false;
    }

    var stre = endTime.split(":");
    if (stre.length != 2) {
        return false;
    }

    var strn = nowTime.split(":");
    if (stre.length != 2) {
        return false;
    }

    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    n.setHours(strn[0]);
    n.setMinutes(strn[1]);

    console.log(n.getTime());
    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        console.log("now Date is：" + n.getHours() + ":" + n.getMinutes() + "，is not Night！");
        return false;
    }
}


var isNight = localStorage.getExpire('night');

// 第一次进来判断是白天还是晚上
if (isNight == null || isNight == undefined) {
    if (isNightRange("19:00", "23:59") || isNightRange("00:00", "07:00")) {
        isNight = 'true';
    } else {
        isNight = 'false';
    }
    localStorage.setExpire("night", isNight, expireTime1H);
}

// 参考自 https://www.imaegoo.com/
var nightNav;
var nightIcon;

function applyNight(value) {
    if (value == 'true') {
        document.body.className += ' night'
        if (nightIcon) {
            nightIcon.className = nightIcon.className.replace(/ fa-moon/g, '') + ' fa-lightbulb'
        }
    } else {
        document.body.className = document.body.className.replace(/ night/g, '')
        if (nightIcon) {
            nightIcon.className = nightIcon.className.replace(/ fa-lightbulb/g, '') + ' fa-moon'
        }
    }
}

function findNightIcon() {
    nightNav = document.getElementById('night-nav');
    nightIcon = document.getElementById('night-icon');
    if (!nightNav || !nightIcon) {
        setTimeout(findNightIcon, 100);
    } else {
        nightNav.addEventListener('click', switchNight);
        if (isNight) {
            nightIcon.className = nightIcon.className.replace(/ fa-moon/g, '') + ' fa-lightbulb'
        } else {
            nightIcon.className = nightIcon.className.replace(/ fa-lightbulb/g, '') + ' fa-moon'
        }
    }
}

function switchNight() {

    if (isNight == 'false') {
        isNight = 'true';
    } else {
        isNight = 'false';
    }

    applyNight(isNight);
    localStorage.setExpire('night', isNight, expireTime1H);
}

findNightIcon();
applyNight(isNight);