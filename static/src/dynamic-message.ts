import { API_KEY } from "./gapi";
import { DateTime } from "luxon";

export function fetchDynamicMessage() {
  const sheetKey = '16Y8NNYSn0yBWrtK3lStuFxJCxg7PThJpmBBxhUFsWvw';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetKey}/values/Message!A1%3AD1?key=${API_KEY}`;

  let handleCells = function (a1: any, b1: any, c1: any, d1: any) {
    if (a1 == 'off' || !b1) {
      return;
    }

    let expire = DateTime.fromFormat(`${c1} ${d1}`, "M/d/yyyy h:mm:ss a", { zone: 'America/New_York' });
    if (expire.diffNow().milliseconds < 0) {
      return;
    }
    let field = document.getElementById('dynamic-field');
    field.textContent = b1;
    field.classList.remove('d-none');
    field.classList.add(`alert-${a1}`);
  };

  if (window.location.href.endsWith("/covid-information/charts/")) {
    handleCells(
      "warning",
      "The NJ State system for reporting COVID cases is temporarily down and the Rutherford Health Department is unable to access cases for 12/21. Case numbers should be available tomorrow, 12/23.",
      "12/31/2021",
      "12:00:00 pm");
    return
  }

  let processResponse = function (response: any) {
    handleCells(
      response['values'][0][0],
      response['values'][0][1],
      response['values'][0][2],
      response['values'][0][3]);
  };

  let success = function (response: any) {
    processResponse(response);
  };

  window.fetch(url)
    .then(resp => resp.json())
    .then(json => success(json));
}
