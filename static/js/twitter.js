(function () {
  var show = function () {
    document.querySelectorAll('a.twitter-timeline').forEach((elt) => {
      elt.style.display = 'block';
    });
  };

  window.setTimeout(show, 3000);
})();
