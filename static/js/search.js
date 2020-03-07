(function($){

var runSearch = function(e) {
  var searchBox = $(e.target).parent().children(".search-box");
  $('#menuToggle > input:checked').prop('checked', false);
  window.location.replace('/search/#' + searchBox.val());
}

$('.search-button').click(runSearch);

$('.search-box').on('keydown', function(event) {
  if (event.which == 13) {
    runSearch(event);
  }
});

})(jQuery);
