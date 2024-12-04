import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import {populateTable,fetchAppList,filterAppList } from './modules/appList.js';
import { InitializeSettings } from './modules/SettingsInitializer.js';


InitializeSettings();
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

window.Filter = filterAppList;
const appList = await fetchAppList();
populateTable(appList);

fetchFeaturedCategories();
