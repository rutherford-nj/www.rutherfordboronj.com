(function($){

if (!$('#community-outreach-toc').length) {
  return;
}

var tocHtml = '<ol>';

$('.interior-page-content > h2').each(function() {
  var elt = $(this);
  if (!elt.attr('id')) {
    return;
  }
  if (elt.is('h2')) {
    tocHtml += '<li><a href="#' + elt.attr('id') + '">' + elt.text() + '</a></li>';
  }
});

tocHtml += "</ol>";

$(tocHtml).appendTo($('#community-outreach-toc'));

})(jQuery);
