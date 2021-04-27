import 'whatwg-fetch'
import { showTwitterFallback } from "./twitter";
import { applySearchHandlers } from "./search-handlers";
import { applyTabHandlers } from "./homepage-tabs";
import { buildCommunityOutreachTOC } from "./community-outreach";
import { fetchCovidCharts } from "./covid-charts";

showTwitterFallback();
applySearchHandlers();
applyTabHandlers();
buildCommunityOutreachTOC();
fetchCovidCharts();
