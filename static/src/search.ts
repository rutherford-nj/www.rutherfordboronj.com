import * as lunr from 'lunr';

export function runSearch() {
  let searchIndex: lunr.Index;
  let urlToTitle = <any>{};
  let searchResults = document.getElementById('search_results');
  if (!searchResults) {
    return;
  }

  let displaySearchResults = function (results: lunr.Index.Result[]) {
    searchResults.innerHTML = '<ul>';
    document.querySelectorAll('.loading').forEach(elt => elt.remove());

    if (results.length) {
      results.forEach(result=> {
        let url = result.ref;
        let title = urlToTitle[url];
        searchResults.innerHTML += `<li><a href="${url}">${title}</a></li>`;
      });
    } else {
      searchResults.innerHTML += '<li>No results found</li>';
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
    document.getElementById('search_query').textContent = query;
    displaySearchResults(results);
  };

  let searchQueryText = window.location.hash.substr(1);
  searchQueryText = window.decodeURI(searchQueryText);
  document.getElementById('search_query').textContent = searchQueryText;

  // Download the data from the JSON file we generated
  window.fetch('/search/data.json')
    .then(resp => resp.json())
    .then(json => {
      createIndex(<Object>json);
      runSearchFromHash();
    });

  window.addEventListener('hashchange', runSearchFromHash);
}