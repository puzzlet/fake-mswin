(function($, undefined) {

$.widget( "mswin.listview", {
    _create: function() {
        this.refresh();
        this._on({
            "mousedown .ui-listview-item": function( event ) {
                this.select( event.currentTarget );
            },
            "mousedown td": function( event ) {
                this.select( event.currentTarget );
            },
            "blur .ui-listview-item": function( event ) {
                $( event.currentTarget ).removeClass( "ui-focused" );
            },
        });
    },

    refresh: function() {
        if (this.element.is( ".listview-largeicon" )) {
            this.items = this.element.find( "li" );
            this.items
                .addClass( "ui-listview-item" )
                .each(function() {
                    var elem = $( this ).children( "span" );
                    elem.css({
                        width: elem.width() + 2 + "px",
                        display: "inline-block",
                    });
                });
        }
        else if (this.element.is( ".listview-report-icon" )) {
            this.items = this.element.find( "td" );
            this.items.addClass( "ui-listview-item" );
        }
    },

    select: function( item ) {
        // assumes the item is in this.items
        $( ".ui-focused" ).removeClass( "ui-focused" );
        this.items.removeClass( "ui-selected" );
        $( item )
            .addClass( "ui-focused" )
            .addClass( "ui-selected" );
    },
});

}(jQuery));

