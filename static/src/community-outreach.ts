export function buildCommunityOutreachTOC() {
  let toc = document.querySelector('#community-outreach-toc');

  if (!toc) {
    return;
  }

  let tocHTML = '<ol>';

  document.querySelectorAll('.interior-page-content > h2').forEach((elt) => {
    if (elt.id) {
      tocHTML += `<li><a href="#${elt.id}">${elt.textContent}</a></li>`;
    }
  })

  toc.innerHTML = `${tocHTML}</ol>`;
}
