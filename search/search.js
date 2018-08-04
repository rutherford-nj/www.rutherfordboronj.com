jQuery(function() {
  var displaySearchResults = function(results) {
    var search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
      if (results.length) {
        search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

          // Add it to the results
          search_results.append(appendString);
        });
      } else {
        search_results.html('<li>No results found</li>');
      }
    });
  }
  
  var createIndex = function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });
  };
  
  var runSearchFromHash = function() {
    var query = window.location.hash.substr(1);
    query = window.decodeURI(query);

    // Get lunr to perform a search
    var results = window.idx.search(query);
    // Put search query into the DOM.
    $('#search_query').text(query);
    // Hand the results off to be displayed
    displaySearchResults(results);
  };
  
  var searchQueryText = window.location.hash.substr(1);
  searchQueryText = window.decodeURI(searchQueryText);
  $('#search_query').text(searchQueryText);
  
  // Initalize lunr with the fields it will be searching on.
  window.idx = lunr(function () {
    this.field('id');
    this.field('content');
  });

  // Download the data from the JSON file we generated
  window.data = $.getJSON('/search/data.json');

  // Wait for the data to load and add it to lunr
  window.data.then(createIndex).then(runSearchFromHash);
  
  window.addEventListener('hashchange', runSearchFromHash);
});
