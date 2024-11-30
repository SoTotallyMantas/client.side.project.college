import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { navbarMobile } from './modules/navbar.js';
import { adjustSearchResults,populateSearchbar,filterSearchBarResults,fetchAppList } from './modules/appList.js';
import { hideResults } from './modules/utils.js';

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
    fetchFeaturedCategories();


