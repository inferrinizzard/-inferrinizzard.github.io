var grid = document.querySelector('.grid');
var iso;

imagesLoaded( grid, function() {
  // init Isotope after all images have loaded
  iso = new Isotope( grid, {
    itemSelector: '.grid-item',
    columnWidth: 'article',
    percentPosition: true
  });
});

var filtersElem = document.querySelectorAll('.button');
for(var i=0;i<filtersElem.length;i++){
  filtersElem[i].addEventListener( 'click', function( event ) {
    // only work with buttons
    
    // if ( !matchesSelector( event.currentarget, 'button' )) {
    //   return;
    // }

    if(!(matchesSelector(event.currentTarget, 'button') || matchesSelector(event.Target, 'btn-icon'))){
      return;
    }
    var filterValue = event.currentTarget.getAttribute('data-filter');

    // use matching filter function
    // filterValue = filterFns[ filterValue ] || filterValue;
    iso.arrange({ filter: filterValue });
  }, true);
}

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
  var buttonGroup = buttonGroups[i];
  radioButtonGroup( buttonGroup );
}

function radioButtonGroup( buttonGroup ) {
  buttonGroup.addEventListener( 'click', function( event ) {
    // only work with buttons
    if ( !matchesSelector( event.target, 'button' ) ) {
      return;
    }
    buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
    event.target.classList.add('is-checked');
  });
}