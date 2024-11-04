
export async function parseLanguages(text) {
    const languages = text.replace(/<strong>\*<\/strong>/g, '*').split(',');
    return languages.map(language => {
        const cleanLanguage = language.split('<br>')[0].trim();
        const hasFullAudio = cleanLanguage.includes('*');
        return { name: cleanLanguage.replace('*', '').trim(), fullAudio: hasFullAudio };
    });
}

export async function parseCategoriesImageLinksToDictionary() {
    try {
        const response = await fetch('../categoriesImageLinks.json');
        const categoryData = await response.json();
        return categoryData.links.map(category => ({ category: category.category, imagelink: category.imagelink }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export function hideResults() {
    const searchResults = document.getElementById('search-results');
    const searchbar = document.getElementById('searchbar-nav');
    const searchbutton = document.getElementById('searchsubmit');
    
    if( !searchResults.matches(':hover') && !searchbar.matches(':hover') && !searchbutton.matches(':hover') && searchResults.style.display === 'block') {
        searchResults.style.display = 'none';
    }
    if(searchbar.matches(':focus') && searchResults.style.display === 'none') {
        searchResults.style.display = 'block';
    }

}




export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
