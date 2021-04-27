export function applySearchHandlers() {
  let runSearch = function (evt: Event) {
    document.querySelectorAll<HTMLInputElement>('.mobile-menu-toggle input:checked').forEach((e) => {
      return e.checked = false;
    });
    let target = <HTMLElement>evt.target;
    let searchBox = <HTMLInputElement>target.parentNode.querySelector('.search-box');
    window.location.replace(`/search/#${searchBox.value}`);
  };

  document.querySelectorAll('.search-button').forEach(elt => elt.addEventListener('click', runSearch));

  document.querySelectorAll('.search-box').forEach((elt) => {
    elt.addEventListener('keydown', (evt: KeyboardEvent) => {
      var code = (evt.keyCode ? evt.keyCode : evt.which);
      if (code == 13) {
        runSearch(evt);
      }
    });
  });
}
