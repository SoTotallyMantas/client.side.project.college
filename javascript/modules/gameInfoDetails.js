import { apiSteamGetAppDetails } from './apiConfig.js';
import { parseLanguages, parseCategoriesImageLinksToDictionary, capitalize } from './utils.js';

export function getGameInfoQuery() {
    const appid = new URLSearchParams(window.location.search).get('appid');
    fetchGameInfo(appid);
}

async function fetchGameInfo(appid) {
    let response = await GetStaticData(appid);
    let Flag = false;
    try {
         //const apiRequestUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiSteamGetAppDetails + appid)}`;
         //const response = await fetch(apiRequestUrl);
         
         response = await fetch("https://localhost:8081/steamApi/GameDetails?appID="+appid);
         if(response.ok) {
             Flag = true;
         }
    
    } catch (error) {
        console.error('Error:', error);
    }
    finally {
        
        

           const data = await response.json();
           let gameInfo;
            if(Flag === true) 
            {
                gameInfo = data;
            }
            else
            {
                gameInfo =  data.find(obj => obj.hasOwnProperty(appid));
            }
           displayGameInfo(gameInfo[appid]?.data);
    }
}

async function GetStaticData() {
    const data = await fetch('../AppDetailsStatic.json');
    return data;
}

function displayGameInfo(gameInfo) {

    if(!gameInfo) {
        document.getElementById('game-info').innerHTML = 'Game not found';
        return;
    }

    const container = document.getElementById('game-info');
    handleAgeRestriction(gameInfo.ratings, container);
    addGameDetails(gameInfo, container);
    addRequirementsTabs(gameInfo, container);
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'game_info_wrapper');
    
    addLanguages(gameInfo, wrapper);

    addDeveloperPublisherInfo(gameInfo, wrapper);
    
    addCategoriesAndGenres(gameInfo, wrapper);

    
    container.appendChild(wrapper);



}


function handleAgeRestriction(ratings,container){

    if(ratings?.dejus?.rating === '18') {
        const ageRestriction = document.createElement('div');
        ageRestriction.id = 'age-restriction';
        ageRestriction.innerHTML = 'Age restriction: 18+';
        Object.assign(ageRestriction.style, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'red', color: 'white', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '2rem'
        });

        container.style.position = 'relative';
        container.appendChild(ageRestriction);

    }

}

function addGameDetails(gameInfo,container) {

    const name = document.createElement('h1');
    name.textContent = gameInfo.name;
    container.appendChild(name);

    const img = document.createElement('img');
    img.src = gameInfo.header_image;
    img.id = 'game-image';
    container.appendChild(img);

    const description = document.createElement('p');
    description.id = 'detailed_description';
    description.innerHTML = gameInfo.detailed_description;
    container.appendChild(description);
}

function addRequirementsTabs(gameInfo, container) {
    const requirementsPlatform = document.getElementById('requirements');
    const tabsContainer = createTabs(gameInfo.platforms);
    const requirementsContent = createRequirementsContent(gameInfo);

    requirementsPlatform.append(tabsContainer, requirementsContent);
    setupTabSwitching();
}

function createTabs(platforms) {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'requirements_tabs';

    for (const [platform, isAvailable] of Object.entries(platforms)) {
        if (isAvailable) {
            const tab = document.createElement('div');
            tab.className = 'platform_tab';
            tab.id = `platform-${platform}`;
            tab.textContent = capitalize(platform);
            tabsContainer.appendChild(tab);
        }
    }

    return tabsContainer;
}

function createRequirementsContent(gameInfo) {
    const contentContainer = document.createElement('div');
    contentContainer.className = 'requirements_content';

    ['windows', 'mac', 'linux'].forEach(platform => {
        if (gameInfo.platforms[platform]) {
            const requirementsDiv = document.createElement('div');
            requirementsDiv.className = 'platform_requirements';
            requirementsDiv.id = `requirements-${platform}`;
           
            const platformRequirement = platform === 'windows' ? 'pc' : platform;
            requirementsDiv.innerHTML = `
                <div id="minimum-requirements">${gameInfo[`${platformRequirement}_requirements`]?.minimum || 'N/A'}</div>
                <div id="recommended-requirements">${gameInfo[`${platformRequirement}_requirements`]?.recommended || 'N/A'}</div>
            `;
            
            contentContainer.appendChild(requirementsDiv);
        }
    });

    return contentContainer;
}

function setupTabSwitching() {
    document.querySelectorAll('.platform_tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.platform_tab, .platform_requirements').forEach(elem => elem.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.id.replace('platform-', 'requirements-')).classList.add('active');
        });
    });
    document.querySelector('.platform_tab')?.click();
}

async function addLanguages(gameInfo, container) {
    const languages = await parseLanguages(gameInfo.supported_languages);
    const table = document.createElement('table');
    table.id = 'language_table';

    const headers = ['Language', 'Interface', 'Full Audio', 'Subtitles'];
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headers.forEach(text => headerRow.insertCell().textContent = text);

    const tbody = table.createTBody();
    languages.forEach(({ name, fullAudio }) => {
        const row = tbody.insertRow();
        [name, '✔', fullAudio ? '✔' : '', '✔'].forEach(text => row.insertCell().textContent = text);
    });

    container.prepend(table);
}

function addDeveloperPublisherInfo(gameInfo, container) {
    const section = document.createElement('div');
    section.id = 'dev-pub-section';

    const addList = (title, items) => {
        const label = document.createElement('h2');
        label.textContent = title;
        section.appendChild(label);

        const list = document.createElement('ul');
        list.id = title.toLowerCase()+ '-list';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            list.appendChild(listItem);
        });
        section.appendChild(list);
    };

    addList('Developers', gameInfo.developers);
    addList('Publishers', gameInfo.publishers);
    addList('Genres', gameInfo.genres.map(genre => genre.description));

    container.appendChild(section);
}

async function addCategoriesAndGenres(gameInfo, container) {
    const section = document.createElement('div');
    section.id = 'cat-gen-section';

    const h2 = document.createElement('h2');
    h2.textContent = 'Categories';
    section.appendChild(h2);
    const categoryList = document.createElement('ul');
    categoryList.className = 'category-list';

    const icons = await parseCategoriesImageLinksToDictionary();
    gameInfo.categories.forEach(({ description }) => {
        const categoryItem = document.createElement('li');
        categoryItem.className = 'category-item';

        const img = document.createElement('img');
        img.src = icons.find(icon => icon.category === description)?.imagelink || '';
        img.alt = description;
        img.className = 'category-icon';

        categoryItem.append(img, document.createTextNode(description));
        categoryList.appendChild(categoryItem);
    });

    section.append(categoryList);
    container.appendChild(section);
}

