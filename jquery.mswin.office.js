(function($, undefined) {

$.widget( "mswin.word", $.mswin.window, {
    _create: function() {
        $.mswin.window.prototype._create.apply(this);
        this._on({
/*
            "scroll .stretch": function( event ) {
                this.scroll();
            },
*/
        });
        this.scrollArea = this.element.find(".stretch");
        this.topRuler = this.scrollArea.find(".top-ruler");
        this.scrollArea.scroll($.proxy(this.scroll, this)); // XXX
    },

/*
    resize: function() {
        $.mswin.window.prototype.resize.apply(this);
        var height = this.element.innerHeight();
        this.element.children(".panel").each(function() {
            height -= $(this).outerHeight(true);
        });
        height -= this.element.children(".title-bar").outerHeight(true);
        height -= this.element.children(".pane").outerHeight(true);
        this.element.children(".body").height(height);
    },
*/

    scroll: function() {
        this.topRuler.css({ top: this.scrollArea.scrollTop() });
    },
});

}(jQuery));
