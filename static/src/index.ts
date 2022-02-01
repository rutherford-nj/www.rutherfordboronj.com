import { applySearchHandlers } from "./search-handlers";
import { buildCommunityOutreachTOC } from "./community-outreach";
import { fetchCovidCharts } from "./covid-charts";
import { fetchDynamicMessage } from "./dynamic-message";
import { findCloudStorageElements } from "./cloud-storage";
import { runSearch } from "./search";

applySearchHandlers();
buildCommunityOutreachTOC();
fetchCovidCharts();
fetchDynamicMessage();
findCloudStorageElements();
runSearch();
