 // Navbar Responsivness
function navbarMobile() {
    console.log("navbarMobile");
    var x = document.getElementById("Mainnavbar");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
    
}

const apiSteamGetAppList = 'http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json';
const apiSteamCategories = 'https://store.steampowered.com/api/featuredcategories/';
const apiSteamGetAppDetails = 'https://store.steampowered.com/api/appdetails?appids=';
// Proxy used to interact with steam API
const corsProxyCategories = `https://api.allorigins.win/get?url=${encodeURIComponent(apiSteamCategories)}`;

    // Not Used
    async function fetchTopSellers() 
{
    try
    {
        const response = await fetch(corsProxyCategories);
        if(!response.ok)
        {
            throw new Error('HTTP error, status = ' + response.status);
        }

        const data = await response.json();
        const parsedData = JSON.parse(data.contents);

        const topSellers = parsedData.tabs.viewall.items;
        const idsArray = topSellers.map(item => item.id);
       
        ArrayParser(idsArray);
    }
    catch (error)
    {
        console.log(error);
    }

    }
    async function ArrayParser(idsArray)
{
    try
    {
        idsArray.forEach(async id => {
            
        const data = await fetchAppDetails(id);
        wait(5000);
        });

    }
    catch (error)
    {
        console.log(error);
    }
    }

    async function fetchFeaturedCategories()
{
    try
    {
        const response = await fetch(corsProxyCategories);
        if(!response.ok)
        {
            throw new Error('HTTP error, status = ' + response.status);
        }
        
        const data = await response.json();
       
        const parsedData = JSON.parse(data.contents);

        PopulateTopSellers(parsedData);
        PopulateNewReleases(parsedData);
        

      
        
     }
    catch (error)
    {
        console.log(error);
    }
    }
    async function PopulateTopSellers(parsedData) {


        const topSellers = parsedData.top_sellers.items;
        const container = document.getElementById('top-sellers');
        if(container == null)
        {
            return;
        }
        var SteamDeckBool = Boolean(false);
        topSellers.forEach(item => {
            
            if(SteamDeckBool == false || item.name != 'Steam Deck')
            {
               if(item.name == 'Steam Deck')
               {
                   SteamDeckBool = true;
               }
   
       const itemDiv = document.createElement('div');
       itemDiv.setAttribute('class', 'top-sellers-item');
      
       
       const link = document.createElement('a');
        link.href = `gameInfo.html?appid=${item.id}`;
        link.target = '_self';

       const img = document.createElement('img');
       img.setAttribute('class', 'topSellers-image');
       img.src = item.header_image;
       link.appendChild(img);

       const header = document.createElement('header');
       header.innerText = item.name;
       link.appendChild(header);

       const footer = document.createElement('footer');
       footer.innerText = (item.final_price / 100 + '€');
       link.appendChild(footer);

       itemDiv.appendChild(link);

       container.appendChild(itemDiv);
           }
 
       });
        
    }
    async function PopulateNewReleases(parsedData) {
        const newReleases = parsedData.new_releases.items;
        const container = document.getElementById('new-releases');
        var SteamDeckBool = Boolean(false);
        if(container == null)
        {
            return;
        }
        newReleases.forEach(item => {
            
            
            if(SteamDeckBool == false || item.name != 'Steam Deck')
            {
               if(item.name == 'Steam Deck')
               {
                   SteamDeckBool = true;
               }

               if(container.childElementCount < 6)
               {
                // Create a new div element
       const itemDiv = document.createElement('div');
       itemDiv.setAttribute('class', 'new-releases-item');
                // Create a new link element
       const link = document.createElement('a');
        link.href = `game.html?appid=${item.id}`;
        link.target = '_self';
                // Create a new image element
       const img = document.createElement('img');
       img.setAttribute('class', 'newReleases-image');
       img.src = item.header_image;
       link.appendChild(img);
                // Create a new header element
       const header = document.createElement('header');
       header.innerText = item.name;
       link.appendChild(header);
                // Create a new footer element  
       const footer = document.createElement('footer');
       footer.innerText = (item.final_price / 100 + '€');
       link.appendChild(footer);
                // Append the link to the div
       itemDiv.appendChild(link);
                // Append the div to the container
       container.appendChild(itemDiv);
               }
               else
               {
                 return;
               } 
            }
       });  
    }
    function getGameInfoQuery()
    {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const appid = urlParams.get('appid');
        fetchGameInfo(appid);
    }

    async function fetchGameInfo(appid)
    {
    try
    {
        const AppDetailsRequest = apiSteamGetAppDetails + appid;
        const corsProxyAppDetails = `https://api.allorigins.win/get?url=${encodeURIComponent(AppDetailsRequest)}`;
        
        const response = await fetch(corsProxyAppDetails);
        if(!response.ok)
        {
            throw new Error('HTTP error, status = ' + response.status);
        }

        const data = await response.json();
        console.log(data);
    }
    catch (error)
    {
        console.log(error);
    }
    }
    async function PopulateGameInfo(parsedData)
    {
        const container = document.getElementById('game-info');
        if(container == null)
        {
            return;
        }
        const gameInfo = parsedData[Object.keys(parsedData)[0]].data;
        console.log(gameInfo);
    }

  
   




