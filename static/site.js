---
---

jQuery(function() {

window._apiKey = 'AIzaSyBARaTe_n1zU7TpeepIsFCBj_L4lfstP7w';
window._getCORS = function(url, success) {
  var xhr = new XMLHttpRequest();
  if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
  xhr.open('GET', url);
  xhr.onload = success;
  xhr.send();
  return xhr;
};

{% include_relative js/homepage-tabs.js %}

{% include_relative js/search.js %}

{% include_relative js/cloud-storage.js %}

{% include_relative js/spreadsheet-content.js %}

{% include_relative js/community-outreach-toc.js %}

{% include_relative js/twitter.js %}

{% include_relative js/covid-charts.js %}

});

