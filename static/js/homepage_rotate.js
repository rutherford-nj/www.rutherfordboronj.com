(function($){

if (!$('.homepage-images').length) {
  return;
}

var srcs = [];
var alts = [];

{% for image in site.data.homepage_images %}
  srcs.push('{{image.src}}');
  alts.push('{{image.alt}}');
{% endfor %}

var indexKey = 'currentHomepageImageIndex';
var currentIndex = window.localStorage.getItem(indexKey) || 0;
currentIndex = parseInt(currentIndex, 10);
console.log('c:' + currentIndex);
var nextIndex = currentIndex + 1;
nextIndex = nextIndex % srcs.length;
console.log('n:' + nextIndex);
window.localStorage.setItem(indexKey, nextIndex);

$('.homepage-images').append('<div><img src="'+srcs[currentIndex]+'" alt="'+alts[currentIndex]+'"></div>');

})(jQuery);
