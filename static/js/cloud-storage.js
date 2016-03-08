(function($){

var makeUrl = function(responseObject) {
  return 'http://static.rutherford-nj.com/' + responseObject['name'];
};

var itemsCompare = function (a, b) {
  if (a['updated'] < b['updated'])
    return -1;
  else if (a['updated'] > b['updated'])
    return 1;
  else 
    return 0;
}

var success = function(response, elt) {
  var urls = [];
  var items = response['items'];
  items.sort(itemsCompare);
  items.reverse();
  $.each(items, function(i, val) {
    if (val['size'] != '0') {
      urls.push(makeUrl(val));
    }
  })
  
  $.each(urls, function(i, val){
    var filename = val.split('/').pop();
    var newElt = '<div><a href="' + val + '">' + filename + '</a></div>';
    elt.append(newElt)
  });
}

var possibleElements = $('.gcs-file-list');
$.each(possibleElements, function(i, elt) {
  elt = $(elt);
  var prefix = elt.data('prefix');
  
  if (prefix) {
    var apiKey = 'AIzaSyBTr1HBPcDTODuO0uMfdMDjswzChn4gN1E';
    var contentUrl = 'https://www.googleapis.com/storage/v1/b/' +
      'static.rutherford-nj.com/o' +
      '?prefix=' + encodeURIComponent(prefix) +
      '&key=' + apiKey;
    
    $.getJSON(contentUrl, function(response) {
      success(response, elt);
    });
  };
});

})(jQuery);
