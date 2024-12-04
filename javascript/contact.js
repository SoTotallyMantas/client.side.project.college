import { fetchFeaturedCategories } from "./modules/fetchCategories.js";
import { InitializeSettings } from './modules/SettingsInitializer.js';
import { ValidateForm } from "./modules/Validation.js";



InitializeSettings();
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
fetchFeaturedCategories();
ValidateForm();