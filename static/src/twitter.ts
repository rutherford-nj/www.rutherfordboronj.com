export function showTwitterFallback() {
  var show = function () {
    document.querySelectorAll<HTMLElement>('a.twitter-timeline').forEach((elt) => {
      elt.style.display = 'block';
    });
  };

  window.setTimeout(show, 3000);
}