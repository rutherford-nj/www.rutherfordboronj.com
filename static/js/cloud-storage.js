(function ($) {

  var makeUrl = function (responseObject) {
    return 'https://storage.googleapis.com/static.rutherford-nj.com/' + responseObject['name'];
  };

  var itemsCompare = function (a, b) {
    if (a['updated'] < b['updated'])
      return -1;
    else if (a['updated'] > b['updated'])
      return 1;
    else
      return 0;
  }

  var success = function (response, elt) {
    var urls = [];
    var items = response['items'];
    if (items.length === 1) {
      // Only the directory was returned, the directory is empty.
      elt.append($('<div>Content coming soon.</div>'));
      return;
    }
    items.sort(itemsCompare);
    items.reverse();
    $.each(items, function (i, val) {
      if (val['size'] != '0') {
        urls.push(makeUrl(val));
      }
    })

    var listElt = $('<ul></ul>');

    $.each(urls, function (i, val) {
      var filename = val.split('/').pop();
      if (filename) {
        var newElt = '<li><a href="' + val + '">' + filename + '</a></li>';
        listElt.append(newElt);
      }
    });

    elt.append(listElt);
  }

  var possibleElements = $('.gcs-file-list');
  $.each(possibleElements, function (i, elt) {
    elt = $(elt);
    var prefix = elt.data('prefix');

    if (prefix) {
      var contentUrl = 'https://www.googleapis.com/storage/v1/b/' +
        'static.rutherford-nj.com/o' +
        '?prefix=' + encodeURIComponent(prefix) +
        '&key=' + window._apiKey;

      $.getJSON(contentUrl, function (response) {
        success(response, elt);
      });
    };
  });

})(jQuery);
