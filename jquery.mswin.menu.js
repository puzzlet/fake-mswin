(function( $, undefined ) {

$.widget( "mswin.menubar", $.ui.menu, {
    delay: 0,
    zIndex: 100,
    options: $.extend({
        position_toplevel: {
            my: "left top",
            at: "left bottom",
        },
    }, $.ui.menu.options),

    _create: function() {
        $.ui.menu.prototype._create.call(this);
        this._off(this.element, "blur");
        this.element.undelegate(".ui-menu-item", "mouseenter");  // TODO: report jQuery UI's bug in $.widget._off()
        this._on({
            "mousedown .ui-menu-item": function( event ) {
                var target = $( event.currentTarget );
                target.siblings().children( ".ui-state-active" ).removeClass( "ui-state-active" );
                this.focus( event, target );
            },
            "mouseenter .ui-menu-item": function( event ) {
                var target = $( event.currentTarget );
                if (target.is(this.element.find("> li")) && target.siblings( ".ui-state-open" ).length < 1 ) {
                    return;
                }
                target.siblings().children( ".ui-state-active" ).removeClass( "ui-state-active" );
                target.siblings( ".ui-state-open" ).removeClass( "ui-state-open" );
                this.focus( event, target );
            },
            blur: function( event ) {
                if ( !$.contains( this.element[0], this.document[0].activeElement ) ) {
                    this.element.find( ".ui-state-open" ).removeClass( "ui-state-open" );
                    this.collapseAll( event );
                }
            },
        });
    },

    refresh: function() {
        $.ui.menu.prototype.refresh.call(this);
        this.element.find( ".ui-menu-item:has(ul.ui-menu):not(:has(.arrow-wrapper))" )
            .each(function () {
                var menu = $( this );
                menu.prepend($( "<div class='arrow-wrapper'><div class='arrow'></div></div>" ));
            });
    },

    focus: function( event, item ) {
        $.ui.menu.prototype.focus.call( this, event, item );
        if (item.is(this.element.find("> li"))) {
            item.addClass( "ui-state-open" );
        }
    },

    _open: function( submenu ) {
        var position, zIndex;

        if (submenu.is(this.element.find("ul ul"))) {
            position = $.extend({
                of: this.active
            }, this.options.position );
            var supermenu = this.active.parent("ul");
            zIndex = 1 + supermenu.css("z-index");
        }
        else {
            // top-level menu
            zIndex = this.zIndex;
            position = $.extend({
                of: this.active
            }, this.options.position_toplevel );
        }

        clearTimeout( this.timer );
        this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )
            .hide()
            .attr( "aria-hidden", "true" );

        submenu
            .show() // "slide", { direction: "up" }, 300 )
            .removeAttr( "aria-hidden" )
            .attr( "aria-expanded", "true" )
            .position( position )
            .css( "z-index", zIndex );
    },

});

}( jQuery ));
