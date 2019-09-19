$(document).ready(function () { // 加载页面时同步加载
    $("#poetry-container").html("loading...please wait a moment!");
    $.post("https://api.gushi.ci/all.json", {}, function (data, status) {
        var htmlC = "<blockquote>《" + data.origin + "》<br>-" + data.author + "<br>\"" + data.content + "\"</blockquote>";
        $("#poetry-container").html(htmlC);
    })
    // $.ajax({
    //     crossDomain: true,
    //     url:"http://dict-co.iciba.com/api/dictionary.php?w=go&type=json&key=52519173ADEE894E8934A115E883CBF7",
    //     type:"get",
    //     async:false,
    //     dataType: "json",
    //     contentType: "application/json; charset=UTF-8",
    //     success:function (data) {
    //         console.log(data);
    //     }
    // })

    // $.ajax({
    //     type: "post",
    //     url: "http://dict-co.iciba.com/api/dictionary.php?type=xml&key=52519173ADEE894E8934A115E883CBF7&w=go",
    //     dataType: 'xml',
    //     success: function (result) {
    //         console.log(result)
    //         alert(result.word_name);
    //     },
    //     error: function (e) {
    //         console(e);
    //         alert("dd")},
    //     async: true,
    //     cache: false
    // });
})