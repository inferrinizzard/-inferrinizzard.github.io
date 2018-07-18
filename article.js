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

var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  var filterValue;
  if ( !matchesSelector( event.target, 'button' )) {
    return;
  }

  // if(matchesSelector(event.target, 'button')){
    filterValue = event.target.getAttribute('data-filter');
  // }
  // else if(matchesSelector(event.currentTarget, 'btn-info')){
  //   filterValue = event.target.p
  // }
  // else{
  //   return;
  // }
  // use matching filter function
  // filterValue = filterFns[ filterValue ] || filterValue;
  iso.arrange({ filter: filterValue });
}, true);

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