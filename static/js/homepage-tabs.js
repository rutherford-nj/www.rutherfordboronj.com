(function () {
  let openTab = function (e) {
    document.querySelectorAll('.homepage-tabs .tabcontent').forEach(elt => elt.style.display = 'none');

    let selectedTab = e.currentTarget.innerText;
    document.querySelector(`.homepage-tabs .tab-${selectedTab}`).style.display = 'block';
  };

  document.querySelectorAll('.homepage-tabs .tablinks').forEach(elt => elt.addEventListener('click', openTab));
})();
