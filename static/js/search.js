(function($){

var runSearch = function(e) {
  var searchBox = $(e.target).parent().children(".search-box");
  //var newUrl = window.location.protocol + '//' + window.location.hostname + '/search/#' + searchBox.val();
  //window.location.href = newUrl;
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
