import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import {adjustSearchResults, populateSearchbar,filterSearchBarResults,populateTable,fetchAppList,filterAppList } from './modules/appList.js';
import { navbarMobile } from './modules/navbar.js';
import { hideResults } from './modules/utils.js';
window.addEventListener('click',hideResults);
adjustSearchResults();
window.addEventListener('resize',adjustSearchResults);
window.navbarMobile = navbarMobile;
window.Filter = filterAppList;
window.FilterSearch = filterSearchBarResults;
const appList = await fetchAppList();
populateSearchbar(appList);
populateTable(appList);

fetchFeaturedCategories();
