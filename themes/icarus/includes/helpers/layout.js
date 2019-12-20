/**
 * Helper functions for controlling layout.
 *
* @example
*     <%- get_widgets(position) %>
*     <%- has_column() %>
*     <%- column_count() %>
 */
module.exports = function (hexo) {
    hexo.extend.helper.register('has_widget', function (type) {
        const hasWidgets = hexo.extend.helper.get('has_config').bind(this)('widgets');
        if (!hasWidgets) {
            return false;
        }
        const widgets = hexo.extend.helper.get('get_config').bind(this)('widgets');
        return widgets.some(widget => widget.hasOwnProperty('type') && widget.type === type);
    });

    hexo.extend.helper.register('get_widgets', function (position) {
        const hasWidgets = hexo.extend.helper.get('has_config').bind(this)('widgets');
        if (!hasWidgets) {
            return [];
        }
        const widgets = hexo.extend.helper.get('get_config').bind(this)('widgets');
        return widgets.filter(widget => widget.hasOwnProperty('position') && widget.position === position);
    });

    hexo.extend.helper.register('has_column', function (position) {
        const getWidgets = hexo.extend.helper.get('get_widgets').bind(this);
        return getWidgets(position).length > 0;
    });

    hexo.extend.helper.register('column_count', function () {
        let columns = 1;
        if (this.page.__post === true || this.page.__page === true) {
            return 2;
        }
        const hasColumn = hexo.extend.helper.get('has_column').bind(this);
        columns += hasColumn('left') ? 1 : 0;
        columns += hasColumn('right') ? 1 : 0;
        return columns;
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
}