import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { navbarMobile } from './modules/navbar.js';
import { adjustSearchResults,populateSearchbar,filterSearchBarResults,fetchAppList } from './modules/appList.js';
import { hideResults, NavbarDropdown } from './modules/utils.js';
import { ThemeSwitcher } from './modules/colorMode.js';
import { HeaderSizeController, HeaderColorController, ResetDefault } from './modules/headerOptions.js';

document.addEventListener("DOMContentLoaded", () => {
    NavbarDropdown(); 
  });
ResetDefault();
HeaderColorController();
HeaderSizeController();
ThemeSwitcher();
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
    fetchFeaturedCategories();


