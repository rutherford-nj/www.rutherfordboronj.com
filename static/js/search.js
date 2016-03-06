(function($){

var runSearch = function() {
  var searchBox = $('#search_box');
  var newUrl = window.location.protocol + '//' + window.location.hostname + '/search/#' + searchBox.val();
  window.location.href = newUrl;
}

$('#search_button').click(runSearch);

$('#search_box').on('keydown', function(event) {
  if (event.which == 13) {
    runSearch();
  }
});

})(jQuery);
