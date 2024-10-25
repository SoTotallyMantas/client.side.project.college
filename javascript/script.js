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
        const container = document.getElementsByClassName('top-sellers')[0];
        if(container == null)
        {
            return;
        }
        
        topSellers.forEach(item => {
            
            if(item.name != 'Steam Deck')
            {
   
       const itemDiv = document.createElement('div');
       itemDiv.setAttribute('class', 'top-sellers-item');
      
       
       const link = document.createElement('a');
        link.href = `html/gameInfo.html?appid=${item.id}`;
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
        currentPath = window.location.pathname.split('/').pop();
        const newReleases = parsedData.new_releases.items;
        const container = document.getElementsByClassName('new-releases')[0];
        
        if (container == null) {
            return;
        }
       
        newReleases.forEach(item => {
               
                

            if (item.name != 'Steam Deck') {
                
                
                
                
                    if (container.childElementCount < 6) {
                        // Create a new div element
                        const itemDiv = document.createElement('div');
                        itemDiv.setAttribute('class', 'new-releases-item');
                        // Create a new link element
                        const link = document.createElement('a');
                        if (currentPath == 'index.html') {
                            link.href = `html/gameInfo.html?appid=${item.id}`;

                        }
                        else {
                            link.href = `gameInfo.html?appid=${item.id}`;
                        }

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
                    else {
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
        const parsedData = JSON.parse(data.contents);
        PopulateGameInfo(parsedData)
    }
    catch (error)
    {
        console.log(error);
    }
    }
    async function PopulateGameInfo(parsedData)
    {
        const container = document.getElementById('game-info');


            
                   
        if(parsedData == null)
        {
            return;
        }
        const appid = window.location.search.split('=').pop();

        
        const gameInfo = parsedData[appid].data;
        console.log(gameInfo);
        var IsWindows = Boolean(false);
        var IsMac = Boolean(false);
        var IsLinux = Boolean(false);
        // Hide the game info container if the game is for adults only
        if(gameInfo.ratings.dejus.rating == '18')
            {

            const containerMain = document.getElementsByClassName('MainColumn')[0];
            const ageRestriction = document.createElement('div');
            ageRestriction.setAttribute('id', 'age-restriction');
            ageRestriction.innerText = '18+ Restricted';

            ageRestriction.style.position = 'absolute';
            ageRestriction.style.top = '0';
            ageRestriction.style.left = '0';
            ageRestriction.style.width = '100%';
            ageRestriction.style.height = '100%';
            ageRestriction.style.backgroundColor = 'red';
            ageRestriction.style.color = 'white';
            ageRestriction.style.display = 'flex';
            ageRestriction.style.alignItems = 'center';
            ageRestriction.style.justifyContent = 'center';
            ageRestriction.style.fontSize = '2rem'; 

    // Ensure the parent is positioned relative to handle the overlay properly
    containerMain.style.position = 'relative';
                containerMain.appendChild(ageRestriction);
                return; 
            }
         

        const name = document.createElement('h1');
        name.innerText = gameInfo.name;
        container.appendChild(name);

        const img = document.createElement('img');
        img.src = gameInfo.header_image;
        img.setAttribute('id', 'game-image');
        container.appendChild(img);
        


         const detailed_description = document.createElement('p'); 
         detailed_description.setAttribute('id', 'detailed_description');
         detailed_description.innerHTML = gameInfo.detailed_description;

            container.appendChild(detailed_description);

        
       

        const requirementsPlatform = document.getElementById('requirements');
        const requirements_tabs = document.createElement('div');
        requirements_tabs.setAttribute('class', 'requirements_tabs');
        
            if(gameInfo.platforms.windows == true)
            {
                IsWindows = true;
                const platform = document.createElement('div');
                platform.setAttribute('class', 'platform_tab')
                platform.setAttribute('id', 'platform-windows');
                platform.innerText = 'Windows';
                requirements_tabs.appendChild(platform);
            }
            if(gameInfo.platforms.mac == true)
            {
                IsMac = true;
                const platform = document.createElement('div');
                platform.setAttribute('class', 'platform_tab')
                platform.setAttribute('id', 'platform-mac');
                platform.innerText = 'Mac';
                requirements_tabs.appendChild(platform);
            }
            if(gameInfo.platforms.linux == true)
            {
                IsLinux = true;
                const platform = document.createElement('div');
                platform.setAttribute('class', 'platform_tab')
                platform.setAttribute('id', 'platform-linux');
                platform.innerText = 'Linux';
                requirements_tabs.appendChild(platform);
            }
        requirementsPlatform.appendChild(requirements_tabs);
    
        const requirements_content = document.createElement('div');
        requirements_content.setAttribute('class', 'requirements_content');
        if(IsWindows == true)
        {
            const requirementsDiv = document.createElement('div');
            requirementsDiv.setAttribute('class', 'platform_requirements');
            requirementsDiv.setAttribute('id', 'requirements-windows');
            requirementsDiv.innerHTML =`
             <div id="minimum-requirements">${gameInfo.pc_requirements.minimum}</div>
             <div id="recommended-requirements">${gameInfo.pc_requirements.recommended}</div>
            `;
            requirements_content.appendChild(requirementsDiv);


        }
        if(IsMac == true)
        {
            const requirementsDiv = document.createElement('div');
            requirementsDiv.setAttribute('class', 'platform_requirements');
            requirementsDiv.setAttribute('id', 'requirements-mac');
            requirementsDiv.innerHTML =`
             <div id="minimum-requirements">${gameInfo.mac_requirements.minimum}</div>
             <div id="recommended-requirements">${gameInfo.mac_requirements.recommended}</div>
            `;
            requirements_content.appendChild(requirementsDiv);
        }
        if(IsLinux == true)
        {
            const requirementsDiv = document.createElement('div');
            requirementsDiv.setAttribute('class', 'platform_requirements');
            requirementsDiv.setAttribute('id', 'requirements-linux');
            requirementsDiv.innerHTML =`
             <div id="minimum-requirements">${gameInfo.linux_requirements.minimum}</div>
             <div id="recommended-requirements">${gameInfo.linux_requirements.recommended}</div>
            `;
            requirements_content.appendChild(requirementsDiv);
            
        }

        requirementsPlatform.appendChild(requirements_content);
        
        // add wrapper for supported languages, developers and publishers
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'game_info_wrapper');

        
        const languagetext =  await parseLanguages(gameInfo.supported_languages);
        console.log("test");
        // Create a table for supported languages
        const languageTable = document.createElement('table');
        languageTable.setAttribute('id', 'language_table');
        // Table Head
         const languageThead = document.createElement('thead');
         const languageHeaderRow = document.createElement('tr');
         
         const headers = ['Language','Interface','Full Audio', 'Subtitles'];
            // Create headers for the table 
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                languageHeaderRow.appendChild(th);
            });
            languageThead.appendChild(languageHeaderRow);
            languageTable.appendChild(languageThead);
            // Table Body
            const languageTbody = document.createElement('tbody');

            languagetext.forEach(language => {

                // Create a new row
                const row = document.createElement('tr');

                // Create a new cell
                const languageCell = document.createElement('td');
                languageCell.textContent = language.name;
                row.appendChild(languageCell);

                // Interface cell
                const InterfaceCell = document.createElement('td');
                InterfaceCell.textContent = '✔';
                row.appendChild(InterfaceCell);

                // Create Checkmark cell
                const fullAudioCell = document.createElement('td');
                fullAudioCell.textContent = language.fullAudio ? '✔' : ' ';
                row.appendChild(fullAudioCell);

                // Subtitles cell
                const subtitlesCell = document.createElement('td');
                subtitlesCell.textContent = '✔';
                row.appendChild(subtitlesCell);

                
                // Append the row to the table body
                languageTbody.appendChild(row);

            });
           
            languageTable.appendChild(languageTbody);

            wrapper.appendChild(languageTable);
            





        /* Old Supported Languages Before Table
        // add supported languages section
        const supported_languages = document.createElement('p');
        supported_languages.setAttribute('id', 'supported_languages');
        supported_languages.innerHTML = gameInfo.supported_languages;
        wrapper.appendChild(supported_languages);
        // add developers and publishers section
        */
        const devPubSection = document.createElement('div');
        devPubSection.setAttribute('id', 'dev-pub-section');
        // add label for developers
        const developerLabel = document.createElement('h2');
        developerLabel.innerText = 'Developers';
        devPubSection.appendChild(developerLabel);
        // add developers list
        const developerList = document.createElement('ul');
        developerList.setAttribute('id', 'developer-list');
        gameInfo.developers.forEach(item => {
            const developer = document.createElement('li');
            developer.setAttribute('id', 'developer');
            developer.innerText = item;
            developerList.appendChild(developer);
        });
        devPubSection.appendChild(developerList);


        // add label for publishers
        const publisherLabel = document.createElement('h2');
        publisherLabel.innerText = 'Publishers';
        devPubSection.appendChild(publisherLabel);
        // add publishers list
        const publisherList = document.createElement('ul');
        publisherList.setAttribute('id', 'publisher-list');
        gameInfo.publishers.forEach(item => {
            const publisher = document.createElement('li');
            publisher.setAttribute('id', 'publisher');
            publisher.innerText = item;
            publisherList.appendChild(publisher);
        });
        devPubSection.appendChild(publisherList);

         // add label for genres
         const genreLabel = document.createElement('h2');
         genreLabel.innerText = 'Genres';
         devPubSection.appendChild(genreLabel);  
 
         // add genres list
         const genreList = document.createElement('ul');
         genreList.setAttribute('id', 'genre-list');
         gameInfo.genres.forEach(item => {
             const genre = document.createElement('li');
             genre.setAttribute('id', 'genre');
             genre.innerText = item.description;
             genreList.appendChild(genre);
         });
         devPubSection.appendChild(genreList);
        wrapper.appendChild(devPubSection);
        
        
        // Create Categories and Genres section
        const catGenSection = document.createElement('div');
        catGenSection.setAttribute('id', 'cat-gen-section');

        // add label for categories
        const categoryLabel = document.createElement('h2');
        categoryLabel.innerText = 'Categories';
        catGenSection.appendChild(categoryLabel);

        const dictionary = await parseCategoriesImageLinksToDictionary();
        console.log(dictionary); // check if dictionary is populated
        // add categories list
        const categoryList = document.createElement('ul');
        categoryList.setAttribute('class', 'category-list');
        gameInfo.categories.forEach(item => {
            const category = document.createElement('li');
            category.setAttribute('class', 'category-item');
             const categoryIcon = document.createElement('img');
             try
             {
             categoryIcon.src = dictionary.find(x => x.category === item.description).imagelink;
             }
             catch (error)
             {
                 console.log(error);
             }            
             categoryIcon.alt = item.description;
             categoryIcon.setAttribute('class', 'category-icon');

             const CategoryText = document.createElement('span');
                CategoryText.innerText = item.description;

            category.appendChild(categoryIcon);
            category.appendChild(CategoryText);
            categoryList.appendChild(category);
        });
        catGenSection.appendChild(categoryList);

        wrapper.appendChild(catGenSection);
        container.appendChild(wrapper);
        document.querySelectorAll('.platform_tab').forEach(tab => {
            tab.addEventListener('click', function() {
              // Remove active class from all tabs and requirements
              document.querySelectorAll('.platform_tab').forEach(t => t.classList.remove('active'));
              document.querySelectorAll('.platform_requirements').forEach(req => req.classList.remove('active'));
          
              // Add active class to the clicked tab and corresponding requirements
              this.classList.add('active');
              const platformId = this.getAttribute('id').replace('platform-', 'requirements-');
              document.getElementById(platformId).classList.add('active');
            });
          });
          // Find the first available platform tab and click it
        const firstTab = document.querySelector('.platform_tab');
        if (firstTab) {
        firstTab.click();
        }       
          
    }

    
    async function fetchAppList()
    {
        
            fetch('../tempAppList.json')
            .then(response => response.json())

            .then(jsonData => {
                populateTable(jsonData);
            })

            .catch(error => console.error(error));
    }

    async function populateTable(jsonData) {
        
        const apps = jsonData.response.apps;
        const tableBody = document.querySelector("#appsTable tbody");
  
        apps.forEach(app => {

          const row = document.createElement("tr");
          const nameCell = document.createElement("td");
          const link = document.createElement("a");
            if(window.location.pathname.split('/').pop() == 'index.html')
            {
                link.href = `html/gameInfo.html?appid=${app.appid}`;
            }
            else
            {
                link.href = `gameInfo.html?appid=${app.appid}`;
            }
          
          link.textContent = app.name;

          nameCell.appendChild(link);
          row.appendChild(nameCell);
          
          tableBody.appendChild(row);
        });
      }

      async function parseLanguages(text) {
        
        const languages = text.replace(/<strong>\*<\/strong>/g, '*').split(',');
    
        
        return languages.map(language => {
            
            const cleanLanguage = language.split('<br>')[0].trim();
            
            
            const hasFullAudio = cleanLanguage.includes('*');
            const name = cleanLanguage.replace('*', '').trim();
            
            return {
                name: name,
                fullAudio: hasFullAudio
            };
        });
    }
     
    async function parseCategoriesImageLinksToDictionary()
    {
        
        try {
            const response = await fetch('../categoriesImageLinks.json');
            const categoryData = await response.json();
            const linksArray = categoryData.links;
    
            const dictionary = linksArray.map(category => ({
                category: category.category,
                imagelink: category.imagelink
            }));
    
            return dictionary; 
        } catch (error) {
            console.error('Error fetching data:', error);
            return null; 
        }
        
    }
    
      
      

  
   




