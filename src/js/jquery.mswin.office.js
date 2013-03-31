(function($, undefined) {

$.widget( "mswin.word", $.mswin.window, {
    _create: function() {
        $.mswin.window.prototype._create.apply(this);
        this.scrollArea = this.element.find(".stretch");
        this.topRuler = this.scrollArea.find(".top-ruler");
        this.scrollArea.scroll($.proxy(this.scroll, this)); // XXX
    },

    scroll: function() {
        this.topRuler.css({ top: this.scrollArea.scrollTop() });
    },
});

}(jQuery));
