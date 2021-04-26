(function () {
  let runSearch = function (evt) {
    document.querySelectorAll('.mobile-menu-toggle input:checked').forEach(e => e.checked = false);
    let searchBox = evt.target.parentNode.querySelector('.search-box');
    window.location.replace(`/search/#${searchBox.value}`);
  }

  document.querySelectorAll('.search-button').forEach(elt => elt.addEventListener('click', runSearch));

  document.querySelectorAll('.search-box').forEach((elt) => {
    elt.addEventListener('keydown', evt => {
      var code = (evt.keyCode ? evt.keyCode : evt.which);
      if (code == 13) {
        runSearch(evt);
      }
    });
  });
})();
