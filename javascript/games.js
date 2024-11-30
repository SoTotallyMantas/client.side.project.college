import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import {adjustSearchResults, populateSearchbar,filterSearchBarResults,populateTable,fetchAppList,filterAppList } from './modules/appList.js';
import { navbarMobile } from './modules/navbar.js';
import { hideResults } from './modules/utils.js';
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

window.Filter = filterAppList;
const appList = await fetchAppList();
populateTable(appList);

fetchFeaturedCategories();
