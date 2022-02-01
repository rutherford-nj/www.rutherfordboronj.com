export function fetchCovidCharts() {
  const tableID = 'rutherford-covid-data-table';
  let lastUpdated = document.getElementById('covid-charts-last-updated');
  let dataTable = document.getElementById(tableID);

  if (!lastUpdated || !dataTable) {
    return;
  }

  const baseURL = 'https://rutherford-nj.github.io/data-committee.covid-data/';
  const dtURL = `${baseURL}cases_Rutherford_14d_SMA_and_7d_SMA.html`;
  const updatedURL = `${baseURL}last_updated`;

  window.fetch(updatedURL)
    .then(resp => resp.text())
    .then(text => lastUpdated.textContent = `The charts were last updated on ${text.trim()}.`);

  window.fetch(dtURL)
    .then(resp => resp.text())
    .then(text => dataTable.innerHTML += text)
    .then(() => {
      document.getElementById(tableID).querySelectorAll('table').forEach(table => {
        table.classList.remove('dataframe');
        table.classList.add('table');
        table.classList.add('table-sm');

        table.querySelectorAll<HTMLElement>('thead tr').forEach(row => {
          row.style.textAlign = '';
        })
      })
    });
}
