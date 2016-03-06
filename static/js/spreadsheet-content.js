(function($){

var workbookId = '16Y8NNYSn0yBWrtK3lStuFxJCxg7PThJpmBBxhUFsWvw';
var sheetId = 'od6';
var url = 'https://spreadsheets.google.com/feeds/cells/' +
    workbookId + '/' + sheetId + '/public/basic?alt=json';

var getSpreadsheetAsTable = function(responseJson) {
  var table = {'rows': []};
  for (var i=0; i<responseJson['feed']['entry'].length; i++) {
    var entry = responseJson['feed']['entry'][i];
    var cell = entry['title']['$t'];
    var rowNum = cell.replace(/[A-Za-z]/g, '');

    if (!table[rowNum]) {
      table[rowNum] = [];
      table['rows'].push(rowNum);
    }
    table[rowNum].push(entry['content']['$t']);
  }
  return table;
};

var handleCells = function(a1, b1){
  if (a1 == 'off' || !b1) {
    return;
  }

  $('#dynamic-field').
    append(b1).
    removeClass('dynamic-message-hidden').
    addClass('dynamic-message-' + a1);
};

var success = function(response) {
  var table = getSpreadsheetAsTable(response);
  handleCells(table[1][0], table[1][1]);
};

$.getJSON(url, success);

})(jQuery);
