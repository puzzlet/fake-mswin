(function($, undefined) {

$.widget("win.window", {
    _create: function() {
        if (! this.element.hasClass("maximized")) {
            this.element.draggable({ handle: ".title-bar" });
        }
    },
});

}(jQuery));
