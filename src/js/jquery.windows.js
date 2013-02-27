(function($, undefined) {

$.widget('win.window', {
    _create: function () {
        this.element.draggable({ handle: '.title-bar' });
    },
});

}(jQuery));
