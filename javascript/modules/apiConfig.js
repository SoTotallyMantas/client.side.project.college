
export const apiSteamGetAppList = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json';
export const apiSteamCategories = 'https://store.steampowered.com/api/featuredcategories/';
export const apiSteamGetAppDetails = 'https://store.steampowered.com/api/appdetails?appids=';
export const corsProxyCategories = `https://api.allorigins.win/get?url=${encodeURIComponent(apiSteamCategories)}`;
