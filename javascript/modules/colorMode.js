export function ThemeSwitcher() {
    var themeButtons = document.querySelectorAll('[data-bs-theme-value]');
    var themeIcon = document.getElementById('theme-icon');
    var prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function updateTheme(themeValue) {
        document.documentElement.setAttribute('data-bs-theme', themeValue);
        if (themeValue === 'auto') {
            var autoTheme = AutoTheme();
            updateTheme(autoTheme);
            themeIcon.className = "me-2 bi-display opacity-50";
        } else 

        document.documentElement.setAttribute('data-bs-theme', themeValue);
        if (themeValue === 'light') {
            themeIcon.className = "me-2 bi-sun opacity-50";
        } else if (themeValue === 'dark') {
            themeIcon.className = "me-2 bi-moon opacity-50";
        }
        localStorage.setItem('theme', themeValue);

    }

        themeButtons.forEach(button => {
            button.addEventListener('click', function () {
                var themeValue = button.getAttribute('data-bs-theme-value');
                updateTheme(themeValue);
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            var savedTheme = localStorage.getItem('theme') || 'auto';
            updateTheme(savedTheme);
        });
    
        
        
        function AutoTheme() {
            prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (prefersDarkScheme.matches) {
                return 'dark';
            } else {
                return 'light';
            }
        }
            
            prefersDarkScheme.addEventListener('change', () => {
                var currentTheme = localStorage.getItem('theme');
                if (currentTheme === 'auto') {
                    updateTheme(AutoTheme());
                }
            });
           
                
}
