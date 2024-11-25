import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import {adjustSearchResults, populateSearchbar,filterSearchBarResults,populateTable,fetchAppList,filterAppList } from './modules/appList.js';
import { navbarMobile } from './modules/navbar.js';
import { hideResults } from './modules/utils.js';

window.navbarMobile = navbarMobile;
window.Filter = filterAppList;
const appList = await fetchAppList();
populateTable(appList);

fetchFeaturedCategories();
