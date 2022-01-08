import { API_KEY } from "./gapi";
import { DateTime } from "luxon";
import { cachedFetch } from "./cached-fetch";

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

  cachedFetch({ url, ttlInSeconds: 120 })
    .then(resp => resp && resp.json())
    .then(json => json && success(json));
}
