import { corsProxyCategories } from './apiConfig.js';
import { PopulateTopSellers, PopulateNewReleases } from './populateCategories.js';

export async function fetchFeaturedCategories() {
    try {
        const response = await fetch(corsProxyCategories);
        if (!response.ok) throw new Error('HTTP error, status = ' + response.status);

        const data = await response.json();
        const parsedData = JSON.parse(data.contents);

        PopulateTopSellers(parsedData);
        PopulateNewReleases(parsedData);
    } catch (error) {
        console.error(error);
    }
}
