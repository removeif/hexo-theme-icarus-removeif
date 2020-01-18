/**
* Helper functions for page/post.
*
* @example
*     <%- is_categories(page) %>
*     <%- is_tags(page) %>
*/
module.exports = function(hexo) {
    hexo.extend.helper.register('is_categories', function(page = null) {
        return (page === null ? this.page : page).__categories === true;
    });

    hexo.extend.helper.register('is_tags', function(page = null) {
        return (page === null ? this.page : page).__tags === true;
    });

    // 获取路劲中最后一个字符串，针对于后面调整分类和链接格式时，id不受影响
    hexo.extend.helper.register('get_path_end_str',function (path) {
        let pathArr = path.split("/");
        let pathArrEndIndex = pathArr.length-1;
        // 对于页的处理
        if(pathArr[pathArrEndIndex] == "index.html"){
            return (pathArr[pathArrEndIndex-1]+"/"+pathArr[pathArrEndIndex]).toLocaleLowerCase();
        }else{
            return pathArr[pathArrEndIndex].toLocaleLowerCase();
        }
    })
};
