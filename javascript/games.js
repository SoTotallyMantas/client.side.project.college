import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { fetchAppList } from './modules/appList.js';
import { navbarMobile } from './modules/navbar.js';

window.navbarMobile = navbarMobile;

fetchAppList();
fetchFeaturedCategories();