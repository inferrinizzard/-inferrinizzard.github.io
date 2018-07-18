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
    document.querySelector('.is-checked').classList.remove('is-checked');
    event.currentTarget.classList.add('is-checked');

  }, true);
}
