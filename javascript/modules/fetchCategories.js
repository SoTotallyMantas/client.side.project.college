import { corsProxyCategories } from './apiConfig.js';
import { PopulateTopSellers, PopulateNewReleases } from './populateCategories.js';

export async function fetchFeaturedCategories() {
    let response = await GetStaticData();
    try {
        // const response = await fetch(corsProxyCategories);
        
        
        response = await fetch("http://localhost:8080/steamApi/categories");
    
    } catch (error) {
        console.error(error);
    }
    finally {

        const data = await response.json();
        //const parsedData = JSON.parse(data.contents);
        const parsedData = data;
        PopulateTopSellers(parsedData);
        PopulateNewReleases(parsedData);
    }
}

function GetStaticData() {
    const data = fetch('../CategoriesStatic.json');
    return data;
}