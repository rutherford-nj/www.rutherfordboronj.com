export function buildCommunityOutreachTOC() {
  let toc = document.getElementById('community-outreach-toc');

  if (!toc) {
    return;
  }

  let tocHTML = '<ol>';

  document.getElementById('community-outreach-content').querySelectorAll('h2').forEach((elt) => {
    if (elt.id) {
      tocHTML += `<li><a href="#${elt.id}">${elt.textContent}</a></li>`;
    }
  })

  toc.innerHTML = `${tocHTML}</ol>`;
}
