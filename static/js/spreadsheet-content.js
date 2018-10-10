/*globals lscache, jQuery */
(function($){

var key = 'dynamic-message';

var url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    '16Y8NNYSn0yBWrtK3lStuFxJCxg7PThJpmBBxhUFsWvw/values/Message!A1%3AB1?key=' +
    window._apiKey;

var handleCells = function(a1, b1){
  if (a1 == 'off' || !b1) {
    return;
  }

  $('#dynamic-field').
    text(b1).
    removeClass('dynamic-message-hidden').
    addClass('dynamic-message-' + a1);
};

var processResponse = function(response) {
  handleCells(response['values'][0][0], response['values'][0][1]);
};

var success = function(response) {
  lscache.set(key, response, 5);
  processResponse(response);
};

var response = lscache.get(key);
if (response){
  processResponse(response);
} else {
  $.getJSON(url, success);
}

})(jQuery);
