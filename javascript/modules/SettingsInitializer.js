import { NavbarDropdown } from './utils.js';
import { ThemeSwitcher } from './colorMode.js';
import { HeaderSizeController, HeaderColorController, ResetDefault } from './headerOptions.js';

export function InitializeSettings() {
    document.addEventListener("DOMContentLoaded", () => {
        NavbarDropdown(); 
      });
    ResetDefault();
     HeaderColorController();
     HeaderSizeController();
    ThemeSwitcher();
}
const applySavedSize = HeaderSizeController();
const applySavedColor = HeaderColorController();
export function ReapplyHeaders() {
   
    applySavedColor();
    applySavedSize();
}
