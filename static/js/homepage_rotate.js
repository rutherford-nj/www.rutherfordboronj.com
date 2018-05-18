(function($){

if (!$('.homepage-images').length) {
  return;
}

var srcs = [];
var alts = [];

{% for image in site.data.homepage_images %}
  srcs.push('{{ image.src }}');
  alts.push('{{ image.alt }}');
{% endfor %}

var indexKey = 'currentHomepageImageIndex';
var currentIndex = window.localStorage.getItem(indexKey) || 0;
currentIndex = parseInt(currentIndex, 10);
var nextIndex = currentIndex + 1;
nextIndex = nextIndex % srcs.length;
window.localStorage.setItem(indexKey, nextIndex);

$('.homepage-images').empty();
$('.homepage-images').append('<div><img src="'+srcs[currentIndex]+'" alt="'+alts[currentIndex]+'"></div>');

})(jQuery);
