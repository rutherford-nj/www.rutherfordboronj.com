(function($){

if (!$('#community-outreach-toc').length) {
  return;
}

var lastElementType;
var tocHtml = '<ol>';

$('.interior-page-content > h2, h3').each(function() {
	var elt = $(this);
	if (!elt.attr('id')) {
		return;
	}
	if (elt.is('h3')) {
		if (lastElementType === 'h2') {
			tocHtml += '<ol>';
		}
		lastElementType = 'h3';
	}
	if (elt.is('h2')) {
		if (lastElementType === 'h3') {
			tocHtml += '</ol>';
		}
		lastElementType = 'h2';
	}
	tocHtml += '<li><a href="#' + elt.attr('id') + '">' + elt.text() + '</a></li>';
});

tocHtml += "</ol></ol>";
console.log(tocHtml);

$(tocHtml).appendTo($('#community-outreach-toc'));

})(jQuery);
