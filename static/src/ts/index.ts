import { applySearchHandlers } from "./search-handlers";
import { buildCommunityOutreachTOC } from "./community-outreach";
import { findCloudStorageElements } from "./cloud-storage";
import { initHomepageCarousel } from "./homepage";
import { runSearch } from "./search";

applySearchHandlers();
buildCommunityOutreachTOC();
findCloudStorageElements();
initHomepageCarousel();
runSearch();
