import { corsProxyCategories } from './apiConfig.js';
import { PopulateTopSellers, PopulateNewReleases } from './populateCategories.js';
import { showSpinner, hideSpinner } from './spinner.js';
export async function fetchFeaturedCategories() {
    showSpinner(spinner);
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
        hideSpinner(spinner);

    }
}

function GetStaticData() {
    // if 1270.0.1
    if(window.location.hostname === "127.0.0.1") {
        return fetch('../CategoriesStatic.json');
    }
    else {
        return fetch('CategoriesStatic.json');
    }
   
   

    
}