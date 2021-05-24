import * as lunr from 'lunr';

export function runSearch() {
  let searchIndex: lunr.Index;
  let urlToTitle = <any>{};
  let searchResults = document.getElementById('search-results');
  if (!searchResults) {
    return;
  }

  let displaySearchResults = function (results: lunr.Index.Result[]) {
    let searchCard = document.getElementById('search-card');
    searchCard.classList.remove('d-none');
    searchResults.innerHTML = '<ul class="list-group">';

    if (results.length) {
      results.forEach(result => {
        let url = result.ref;
        let title = urlToTitle[url];
        searchResults.innerHTML += `<li class="list-group-item"><a href="${url}">${title}</a></li>`;
      });
    } else {
      searchResults.innerHTML = '<p class="fw-bold card-text">No results found</p>';
      return;
    }

    searchResults.innerHTML += '</ul>';
  }

  let createIndex = function (searchData: any) {
    // Initalize lunr with the fields it will be searching on.
    searchIndex = lunr(function () {
      this.field('title');
      this.field('content');
      this.field('url');
      this.ref('url');
      var that = this;

      Object.keys(searchData).forEach(key => {
        let doc = searchData[key];
        that.add(doc);
        urlToTitle[doc['url']] = doc['title'];
      });
    });
  };

  let runSearchFromHash = function () {
    var query = window.location.hash.substr(1);
    query = window.decodeURI(query);

    var results = searchIndex.search(query);
    document.getElementById('search-query').textContent = query;
    displaySearchResults(results);
  };

  let searchQueryText = window.location.hash.substr(1);
  searchQueryText = window.decodeURI(searchQueryText);
  document.getElementById('search-query').textContent = searchQueryText;

  // Download the data from the JSON file we generated
  window.fetch('/search/data.json')
    .then(resp => resp.json())
    .then(json => createIndex(<Object>json));

  window.addEventListener('hashchange', runSearchFromHash);
}