export function applyTabHandlers() {
  let openTab = function (e: Event) {
    document.querySelectorAll<HTMLElement>('.homepage-tabs .tabcontent').forEach(elt => elt.style.display = 'none');

    let selectedTab = (<HTMLElement>e.currentTarget).innerText;
    document.querySelector<HTMLElement>(`.homepage-tabs .tab-${selectedTab}`).style.display = 'block';
  };

  document.querySelectorAll('.homepage-tabs .tablinks').forEach(elt => elt.addEventListener('click', openTab));
}
