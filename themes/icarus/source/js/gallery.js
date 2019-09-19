document.addEventListener('DOMContentLoaded', function () {
    if (typeof ($.fn.lightGallery) === 'function') {
        $('.article').lightGallery({ selector: '.gallery-item', loop: true, escKey: true, keyPress: true});
    }
    if (typeof ($.fn.justifiedGallery) === 'function') {
        $('.justified-gallery').justifiedGallery({rowHeight:220, margins:4});
    }
});