(function($, undefined) {

$.widget( "mswin.taskbar", {
    _create: function() {
        this.element.css({ "z-index": 2000 });
        this.clock = this.element.find( ".clock" );
        window.setTimeout( $.proxy( this.tick, this ), 100 );
    },

    tick: function() {
        // TODO: improve
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        this.clock.text( h + ":" + m );
    },
});

}(jQuery));

