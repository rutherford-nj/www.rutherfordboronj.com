import 'whatwg-fetch'
import { showTwitterFallback } from "./twitter";
import { applySearchHandlers } from "./search-handlers";
import { applyTabHandlers } from "./homepage-tabs";
import { buildCommunityOutreachTOC } from "./community-outreach";
import { fetchCovidCharts } from "./covid-charts";
import { fetchDynamicMessage } from "./dynamic-message";
import { findCloudStorageElements } from "./cloud-storage";
import { runSearch } from "./search";

showTwitterFallback();
applySearchHandlers();
applyTabHandlers();
buildCommunityOutreachTOC();
fetchCovidCharts();
fetchDynamicMessage();
findCloudStorageElements();
runSearch();
