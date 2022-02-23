import { API_KEY } from "./gapi";

export function findCloudStorageElements() {
  let makeUrl = function (responseObject: any) {
    return `https://storage.googleapis.com/static.rutherford-nj.com/${responseObject['name']}`;
  };

  let itemsCompare = function (a: any, b: any) {
    if (a['updated'] < b['updated'])
      return -1;
    else if (a['updated'] > b['updated'])
      return 1;
    else
      return 0;
  }

  let itemsCompareAlpha = function (a: any, b: any) {
    if (a['name'] < b['name'])
      return -1;
    else if (a['name'] > b['name'])
      return 1;
    else
      return 0;
  }

  let success = function (response: any, elt: HTMLElement) {
    let urls = <string[]>[];
    let items = <Array<any>>response['items'];
    if (items.length === 1) {
      // Only the directory was returned, the directory is empty.
      elt.innerHTML += '<div>Content coming soon.</div>'
      return;
    }
    if (elt.getAttribute('data-sorttype') == 'alpha') {
      items.sort(itemsCompareAlpha);
    } else {
      items.sort(itemsCompare);
    }
    items.reverse();

    items.forEach(val => {
      if (val['size'] != '0') {
        urls.push(makeUrl(val));
      }
    })

    let listElt = document.createElement("ul");
    listElt.classList.add("list-group");
    urls.forEach(val => {
      var filename = val.split('/').pop();
      if (filename) {
        var newElt = document.createElement('li')
        newElt.classList.add("list-group-item");
        newElt.innerHTML = `<a href="${val}">${filename}</a>`;
        listElt.append(newElt);
      }
    });

    elt.append(listElt);
  }

  document.querySelectorAll<HTMLElement>('.gcs-file-list').forEach(elt => {
    let prefix = elt.getAttribute('data-prefix');

    if (prefix) {
      var contentUrl = `https://www.googleapis.com/storage/v1/b/static.rutherford-nj.com/o?prefix=${window.encodeURIComponent(prefix)}&key=${API_KEY}`;

      window.fetch(contentUrl)
        .then(resp => resp.json())
        .then(json => success(json, elt));
    };
  });
}