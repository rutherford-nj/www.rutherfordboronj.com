export function fetchCovidCharts() {
  let lastUpdated = document.querySelector('#covid-charts-last-updated');
  let dataTable = document.querySelector('#rutherford-covid-data-table');

  if (!lastUpdated || !dataTable) {
    return;
  }

  const baseURL = 'https://rutherford-nj.github.io/data-committee.covid-data/';
  const dtURL = baseURL + 'cases_Rutherford_14d_SMA.html';
  const updatedURL = baseURL + 'last_updated';

  window.fetch(updatedURL)
    .then(resp => resp.text())
    .then(text => lastUpdated.textContent = `The charts were last updated on ${text.trim()}.`);

  window.fetch(dtURL)
    .then(resp => resp.text())
    .then(text => dataTable.innerHTML += text);
}
