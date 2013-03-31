(function($, undefined) {

$.widget( "mswin.listview", {
    _create: function() {
        this.refresh();
        this._on({
            "mousedown .ui-listview-item": function( event ) {
                this.select( event.currentTarget );
            },
            "blur .ui-listview-item": function( event ) {
                target.removeClass( "ui-focused" );
            },
        });
    },

    refresh: function() {
        this.items = this.element.find( "li" );
        this.items
            .addClass( "ui-listview-item" )
            .each(function() {
                var elem = $( this ).children( "span" );
                elem.css({
                    width: elem.width(),
                    display: "inline-block",
                });
            });
    },

    select: function( item ) {
        // assumes the item is in this.items
        $( ".ui-focused" ).removeClass( "ui-focused" );
        $( item ).addClass( "ui-focused" );
    },
});

}(jQuery));

