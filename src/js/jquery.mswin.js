(function($, undefined) {

$.widget( "mswin.window", {
    _create: function() {
        var _this = this;
        this.taskbar = $( ".taskbar" );  // TODO: specify as an argument
        this.element.resizable({
            handles: "all",
            alsoResize: this.element.find( ".window-content" ),
        });
        this.element.draggable({
            handle: ".title",
            start: function( event ) {
                // XXX: should bring the window to front on mousedown, not just dragstart
                _this.select();
            },
        });
        this._on({
            "click": function( event ) {
                if ($( event.target ).is( ".title-button" )) {
                    return;
                }
                this.select();
            },
            "click .title-button.minimize": function( event ) {
                this.element.hide();
                this.unselect();
            },
            "click .title-button.maximize": function( event ) {
                this.maximize();
            },
            "click .title-button.restore": function( event ) {
                this.restore();
            },
            "click .title-button.close": function( event ) {
                this.element.hide();  // XXX: should it be really closed or what
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

        var title_icon = this.element.find(".title-icon");
        var title_icon_clone = title_icon.clone();
        var p = 'background-image';
        title_icon_clone.css(p, title_icon.css(p));
        p = 'background-position';
        title_icon_clone.css(p, title_icon.css(p));

        this.task_element
            .append(title_icon_clone)
            .append($("<div class='title-wrapper'><span>" + this.element.find(".title").text() + "</span></div>"))
            .on("click", $.proxy( this.taskClick, this ));
        this.select();
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

    select: function() {
        $( ":mswin-window .title-bar.ui-selected" ).removeClass( "ui-selected" );
        this.element.find( ".title-bar" ).addClass( "ui-selected" );
        if (!this.element.is( ":visible" )) {
            this.element.show();
        }
        // taskbar
        $( ":mswin-window" ).each( function() {
            $( this ).data( "mswin-window" ).unselect();
        });
        this.task_element.addClass( "selected" );
        // bring window to the front
        this.element.css({ "z-index": 1000 });  // TODO: should be less than taskbar
    },

    unselect: function() {
        this.task_element.removeClass( "selected" );
        this.element.css({ "z-index": 0 });
    },

    taskClick: function() {
        if (this.task_element.is( ".selected" )) {
            this.unselect();
            this.element.hide();
        }
        else {
            this.select();
        }
    },
});

}(jQuery));
