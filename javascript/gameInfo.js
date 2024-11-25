import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { getGameInfoQuery } from './modules/gameInfoDetails.js';
import { navbarMobile } from './modules/navbar.js';
import { adjustSearchResults,populateSearchbar,filterSearchBarResults,fetchAppList } from './modules/appList.js';
import { hideResults } from './modules/utils.js';
window.navbarMobile = navbarMobile;
getGameInfoQuery();
fetchFeaturedCategories();
