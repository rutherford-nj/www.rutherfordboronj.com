(function () {
  const dtURL = 'https://rutherford-nj.github.io/data-committee.covid-data/cases_Rutherford_14d_SMA.html';
  const updatedURL = 'https://rutherford-nj.github.io/data-committee.covid-data/last_updated';

  window._getCORS(updatedURL, (resp) => {
    var text = resp.currentTarget.responseText.trim();
    document.querySelector('#covid-charts-last-updated').textContent = `The charts were last updated on ${text}.`
  });

  window._getCORS(dtURL, (resp) => {
    document.querySelector('#rutherford-covid-data-table').innerHTML += resp.currentTarget.response;
  })
})();
