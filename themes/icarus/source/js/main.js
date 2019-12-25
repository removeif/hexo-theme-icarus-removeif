(function ($) {
    $('.article img:not(".not-gallery-item")').each(function () {
        // wrap images with link and add caption if possible
        if ($(this).parent('a').length === 0) {
            $(this).wrap('<a class="gallery-item" href="' + $(this).attr('src') + '"></a>');
            if (this.alt) {
                $(this).after('<div class="has-text-centered is-size-6 has-text-grey caption">' + this.alt + '</div>');
            }
        }
    });

    if (typeof (moment) === 'function') {
        $('.article-meta time').each(function () {
            $(this).text(moment($(this).attr('datetime')).fromNow());
        });
    }

    $('.article > .content > table').each(function () {
        if ($(this).width() > $(this).parent().width()) {
            $(this).wrap('<div class="table-overflow"></div>');
        }
    });

    function adjustNavbar() {
        const navbarWidth = $('.navbar-main .navbar-start').outerWidth() + $('.navbar-main .navbar-end').outerWidth();
        if ($(document).outerWidth() < navbarWidth) {
            $('.navbar-main .navbar-menu').addClass('is-flex-start');
        } else {
            $('.navbar-main .navbar-menu').removeClass('is-flex-start');
        }
    }
    adjustNavbar();
    $(window).resize(adjustNavbar);

    $('figure.highlight table').wrap('<div class="highlight-body">');
    if (typeof (IcarusThemeSettings) !== 'undefined' &&
        typeof (IcarusThemeSettings.article) !== 'undefined' &&
        typeof (IcarusThemeSettings.article.highlight) !== 'undefined') {
        if (typeof (ClipboardJS) !== 'undefined' && IcarusThemeSettings.article.highlight.clipboard) {
            $('figure.highlight').each(function () {
                var id = 'code-' + Date.now() + (Math.random() * 1000 | 0);
                var button = '<a href="javascript:;" class="copy" title="Copy" data-clipboard-target="#' + id + ' .code"><i class="fas fa-copy"></i></a>';
                $(this).attr('id', id);
                if ($(this).find('figcaption').length) {
                    $(this).find('figcaption').prepend(button);
                } else {
                    $(this).prepend('<figcaption>' + button + '</figcaption>');
                }
            });
            new ClipboardJS('.highlight .copy');
        }
        var fold = IcarusThemeSettings.article.highlight.fold;
        if (fold.trim()) {
            var button = '<span class="fold">' + (fold === 'unfolded' ? '<i class="fas fa-angle-down"></i>' : '<i class="fas fa-angle-right"></i>') + '</span>';
            $('figure.highlight').each(function () {
                if ($(this).find('figcaption').length) {

                    // 此处find span,如果有自定义code 头，会找出 并且判断是否有folded
                    // 使用示例，.md 文件中头行标记">folded"
                    // ```java main.java >folded
                    // import main.java
                    // private static void main(){
                    //     // test
                    //     int i = 0;
                    //     return i;
                    // }
                    // ```
                    if ($(this).find('figcaption').find('span').length > 0) {
                        let spanArr = $(this).find('figcaption').find('span');
                        if (spanArr[0].innerText.indexOf(">folded") > -1) {
                            // 去掉folded
                            spanArr[0].innerText = spanArr[0].innerText.replace(">folded", "")
                            button = '<span class="fold"><i class="fas fa-angle-right"></i></span>';
                            $(this).find('figcaption').prepend(button);

                            // 收叠代码块
                            toggleFold(this, true);
                            return;
                        }
                    }
                    $(this).find('figcaption').prepend(button);
                } else {
                    $(this).prepend('<figcaption>' + button + '</figcaption>');
                }
                toggleFold(this, fold === 'folded');
            });

            function toggleFold(codeBlock, isFolded) {
                var $toggle = $(codeBlock).find('.fold i');
                !isFolded ? $(codeBlock).removeClass('folded') : $(codeBlock).addClass('folded');
                !isFolded ? $toggle.removeClass('fa-angle-right') : $toggle.removeClass('fa-angle-down');
                !isFolded ? $toggle.addClass('fa-angle-down') : $toggle.addClass('fa-angle-right');
            }

            // 上面已经设置
            // $('figure.highlight').each(function () {
            //     toggleFold(this, fold === 'folded');
            // });

            $('figure.highlight figcaption .fold').click(function () {
                var $code = $(this).closest('figure.highlight');
                toggleFold($code.eq(0), !$code.hasClass('folded'));
            });
        }
    }

    var $toc = $('#toc');
    if ($toc.length > 0) {
        var $mask = $('<div>');
        $mask.attr('id', 'toc-mask');

        $('body').append($mask);

        function toggleToc() {
            $toc.toggleClass('is-active');
            $mask.toggleClass('is-active');
        }

        $toc.on('click', toggleToc);
        $mask.on('click', toggleToc);
        $('.navbar-main .catalogue').on('click', toggleToc);
    }
})(jQuery);
