export function applySearchHandlers() {
  let runSearch = function () {
    let searchBox = <HTMLInputElement>document.getElementById('search-box');
    window.location.replace(`/search/#${searchBox.value}`);
  };

  var btn = document.getElementById('search-button')
  if (btn) {
    btn.addEventListener('click', runSearch);
  }

  var box = document.getElementById('search-box');
  if (box) {
    box.addEventListener('keydown', (evt: KeyboardEvent) => {
      var code = (evt.keyCode ? evt.keyCode : evt.which);
      if (code == 13) {
        runSearch();
      }
    });
  }
}
