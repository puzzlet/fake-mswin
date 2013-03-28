(function($, undefined) {

$.widget( "mswin.window", {
    _create: function() {
        this.taskbar = $( ".taskbar" );  // TODO: specify as an argument
        this.element.resizable({
            handles: "all",
            alsoResize: ".window-content"
        });
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
        $( window ).resize($.proxy(function() {
            this.resize();
        }, this));
        if (this.element.hasClass( "maximized" )) {
            this.maximize();
        }
        else {
            this.restore();
        }
        this.task_element = $("<div class='task'></div>");
        var tasks = this.taskbar.find(".tasks");
        tasks.append(this.task_element);
        this.task_element
            .append(this.element.find(".title-icon").clone())
            .append($("<span>" + this.element.find(".title").text() + "</span>"));
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
            this.element.css({
                bottom: this.taskbar.height() + "px",
            });
        }
    },
});

}(jQuery));
