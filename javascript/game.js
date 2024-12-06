import { fetchFeaturedCategories } from "./modules/fetchCategories.js";
import { InitializeSettings } from './modules/SettingsInitializer.js';
import { numberGame } from "./modules/numberGame.js";



InitializeSettings();
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
fetchFeaturedCategories();
numberGame();