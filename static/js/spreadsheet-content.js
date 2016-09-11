(function($){

var url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    '16Y8NNYSn0yBWrtK3lStuFxJCxg7PThJpmBBxhUFsWvw/values/Message!A1%3AB1?key=' +
    'AIzaSyBTr1HBPcDTODuO0uMfdMDjswzChn4gN1E';

var handleCells = function(a1, b1){
  if (a1 == 'off' || !b1) {
    return;
  }

  $('#dynamic-field').
    text(b1).
    removeClass('dynamic-message-hidden').
    addClass('dynamic-message-' + a1);
};

var success = function(response) {
  cache.setItem('sheetData', response, {
    expirationAbsolute: new Date(new Date().getTime() + 10 * 60 * 1000)
  });
  handleCells(response['values'][0][0], response['values'][0][1]);
};

var cache = new Cache(-1, false, new Cache.LocalStorageCacheStorage());
var sheetData = cache.getItem('sheetData');
if (sheetData) {
  handleCells(sheetData['values'][0][0], sheetData['values'][0][1]);
} else {
  $.getJSON(url, success);
}

})(jQuery);
