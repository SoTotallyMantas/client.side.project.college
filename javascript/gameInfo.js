import { fetchFeaturedCategories } from './modules/fetchCategories.js';
import { getGameInfoQuery } from './modules/gameInfoDetails.js';
import { HeaderColorController, HeaderSizeController } from './modules/headerOptions.js';
import { InitializeSettings,ReapplyHeaders} from './modules/SettingsInitializer.js';



window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
 getGameInfoQuery();
fetchFeaturedCategories();
InitializeSettings();

const observer = new MutationObserver(() => {
            ReapplyHeaders();
        });
observer.observe(document.body, { childList: true, subtree: true });