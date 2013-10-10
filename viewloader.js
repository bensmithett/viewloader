window.viewloader = {
  execute: function( views, $scope ) {
    var $els = $scope ? $scope.find( "[data-view]" ) : $( "[data-view]" );
    
    $els.each( function( i, el ) {
      var $el = $( el );
      var view = $el.data( "view" );
      if ( view && views[ view ] ) {
        views[ view ]( $el, el );
      }
    });
  }
};
