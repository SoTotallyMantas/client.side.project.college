import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { getGameInfoQuery } from './modules/gameInfoDetails.js';
import { navbarMobile } from './modules/navbar.js';

window.navbarMobile = navbarMobile;
getGameInfoQuery();
fetchFeaturedCategories();
