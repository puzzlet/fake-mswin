(function($, undefined) {

$.widget( "mswin.window", {
    _create: function() {
        this.element.draggable({ handle: ".title" });
        this._on({
            "click .title-button.maximize": function( event ) {
                this.maximize();
            },
            "click .title-button.restore": function( event ) {
                this.restore();
            },
            "click .title-button.close": function( event ) {
                this.element.hide();
            },
            "dblclick .title": function( event ) {
                if (this.element.hasClass( "maximized" )) {
                    this.restore();
                }
                else {
                    this.maximize();
                }
            },
        });
        $(window).resize(function() {
            this.resize();
        });
        if (this.element.hasClass( "maximized" )) {
            this.maximize();
        }
        else {
            this.restore();
        }
    },

    maximize: function() {
        // TODO: animation
        this._offset = this.element.offset();
        this._width = this.element.width();
        this._height = this.element.height();
        this.element
            .draggable( "disable" )
            .addClass( "maximized" )
            .css({
                left: "auto",
                top: "0",
                width: "100%",
                height: "auto",
            });
        this.element.find( ".title-button.maximize" )
            .removeClass( "maximize" )
            .addClass( "restore" );
        this.resize();
    },

    restore: function() {
        // TODO: animation
        this.element
            .removeClass( "maximized" )
            .draggable( "enable" )
            .css({ bottom: "auto" })
            .offset( this._offset )
            .width( this._width )
            .height( this._height );
        this.element.find( ".title-button.restore" )
            .removeClass( "restore" )
            .addClass( "maximize" );
    },

    resize: function() {
        if (this.element.hasClass( "maximized" )) {
            var taskbar_height = $( ".taskbar" ).height();
            this.element.css({
                bottom: taskbar_height + "px",
            });
        }
    },
});

}(jQuery));
