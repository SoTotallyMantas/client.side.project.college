import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { navbarMobile } from './modules/navbar.js';
import { adjustSearchResults,populateSearchbar,filterSearchBarResults,fetchAppList } from './modules/appList.js';
import { hideResults } from './modules/utils.js';
window.addEventListener('click',hideResults);
adjustSearchResults();
window.addEventListener('resize',adjustSearchResults);
window.FilterSearch = filterSearchBarResults;
const appList = await fetchAppList();
populateSearchbar(appList);
window.navbarMobile = navbarMobile;

fetchFeaturedCategories();

