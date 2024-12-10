import { apiSteamGetAppDetails } from './apiConfig.js';
import { hideSpinner, showSpinner } from './spinner.js';
import { parseLanguages, parseCategoriesImageLinksToDictionary, capitalize } from './utils.js';

export function getGameInfoQuery() {
    const appid = new URLSearchParams(window.location.search).get('appid');
    
    fetchGameInfo(appid);
    
}

async function fetchGameInfo(appid) {
    showSpinner('spinnerGameInfo');
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
            hideSpinner('spinnerGameInfo');
    }
}

async function GetStaticData() {
    const data = await fetch('../AppDetailsStatic.json');
    return data;
}

async function displayGameInfo(gameInfo) {

    if(!gameInfo) {
        document.getElementById('game-info').innerHTML = 'Game not found';
        return;
    }

    const container = document.getElementById('game-info');
    container.classList.add('dynamic-element');
    handleAgeRestriction(gameInfo.ratings, container);
    
    addGameDetails(gameInfo, container);
    
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'game_info_wrapper');
    wrapper.className = 'row ';
    
    addLanguages(gameInfo, wrapper);

    addDeveloperPublisherInfo(gameInfo, wrapper);
    
   await addCategoriesAndGenres(gameInfo, wrapper);

    addRequirementsTabs(gameInfo, wrapper);

    
    container.appendChild(wrapper);
    setTimeout(() => {
        container.classList.add('visible');
    }, 10);

   

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
    addCarousel(gameInfo, container);
    const description = document.createElement('div');
    
    description.id = 'detailed_description';
    description.innerHTML = gameInfo.detailed_description;
    
    container.appendChild(description);
}

function addRequirementsTabs(gameInfo, container) {
    const requirementsPlatform = document.createElement('div');
    requirementsPlatform.id = 'requirements';
    requirementsPlatform.className = 'row dynamic-element';

    const Title = document.createElement('h1');
    Title.textContent = 'System Requirements';
    Title.className = 'text-center p-4';
    requirementsPlatform.appendChild(Title);
    

    

    const tabsContainer = createTabs(gameInfo.platforms);
    const requirementsContent = createRequirementsContent(gameInfo);

    requirementsPlatform.append(tabsContainer, requirementsContent);

    container.appendChild(requirementsPlatform);
    
    
    setTimeout(() => {
        requirementsPlatform.classList.add('visible');
    }, 10);
}

function createTabs(platforms) {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'requirements_tabs';

    for (const [platform, isAvailable] of Object.entries(platforms)) {
        if (isAvailable) {
            const tab = document.createElement('button');
            tab.className = 'platform_tab btn btn-primary';
            tab.id = `platform-${platform}`;
            tab.textContent = capitalize(platform);
            tabsContainer.appendChild(tab);
        }
    }

    return tabsContainer;
}

function createRequirementsContent(gameInfo) {
    const contentContainer = document.createElement('div');
    contentContainer.className = 'requirements_content border border-4 ';

    ['windows', 'mac', 'linux'].forEach(platform => {
        if (gameInfo.platforms[platform]) {
            const requirementsDiv = document.createElement('div');
            requirementsDiv.className = 'platform_requirements';
            requirementsDiv.id = `requirements-${platform}`;
           
            const platformRequirement = platform === 'windows' ? 'pc' : platform;
            requirementsDiv.innerHTML = `
                <div id="minimum-requirements">${gameInfo[`${platformRequirement}_requirements`]?.minimum || 'N/A'}</div>
                <div id="recommended-requirements" class="border-start border-4 ps-2">${gameInfo[`${platformRequirement}_requirements`]?.recommended || 'N/A'}</div>
            `;
            
            contentContainer.appendChild(requirementsDiv);
        }
    });

    return contentContainer;
}

export function setupTabSwitching() {
    document.querySelectorAll('.platform_tab').forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.platform_tab, .platform_requirements').forEach(elem => elem.classList.remove('active','requirements-animated','custom-button-click')	
        );
            this.classList.add('active','custom-button-click');
            document.getElementById(this.id.replace('platform-', 'requirements-')).classList.add('active', 'requirements-animated');
           
           
        });
        
    });
    document.querySelector('.platform_tab')?.click();
}

async function addLanguages(gameInfo, container) {
    const div = document.createElement('div');
    div.id = 'language_section';
    div.className = 'table-responsive border border-4 rounded flex-fill p-0 m-0  ';
    const languages = await parseLanguages(gameInfo.supported_languages);
    const table = document.createElement('table');
    table.id = 'language_table';
    table.className = 'table table-bordered table-hover m-0';

    const headers = ['Language', 'Interface', 'Full Audio', 'Subtitles'];
    const thead = table.createTHead();
    thead.className = '';
    const headerRow = thead.insertRow();
    headers.forEach(text => headerRow.insertCell().textContent = text);

    const tbody = table.createTBody();
    
    languages.forEach(({ name, fullAudio }) => {
        const row = tbody.insertRow();
        
        [name, '✔', fullAudio ? '✔' : '', '✔'].forEach(text => row.insertCell().textContent = text);
    });
    div.appendChild(table);

    container.prepend(div);
}
function addCarousel(gameInfo, container) {
    const carousel = document.createElement('div');
    carousel.id = 'carouselImages';
    carousel.className = 'carousel slide';
    
    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner ';
    carouselInner.id = 'carouselInnerImages';

    gameInfo.screenshots.forEach((screenshot, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''} ratio ratio-4x3 `;

        const img = document.createElement('img');
        img.src = screenshot.path_full;
        img.className = 'd-block  img-fluid';
        img.alt = 'screenshot';
        item.appendChild(img);

        carouselInner.appendChild(item);
    });

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev';
    prevButton.type = 'button';
    prevButton.setAttribute('data-bs-target', '#carouselImages');
    prevButton.setAttribute('data-bs-slide', 'prev');
    prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"> </span><span class="visually-hidden">Previous</span>';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next';
    nextButton.type = 'button';
    nextButton.setAttribute('data-bs-target', '#carouselImages');
    nextButton.setAttribute('data-bs-slide', 'next');
    nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"> </span><span class="visually-hidden">Next</span>';

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);
    carousel.appendChild(carouselInner);
    container.appendChild(carousel);

};
function addDeveloperPublisherInfo(gameInfo, container) {
    const section = document.createElement('div');
    section.id = 'dev-pub-section';
    section.className = 'flex-fill col-sm-3 border-start border-top border-bottom border-4 rounded-start-4 d-flex justify-content-center align-items-center';

    const addList = (title, items) => {
        const label = document.createElement('h2');
        label.textContent = title;
        label.className = 'border-bottom border-2';
        section.appendChild(label);

        const list = document.createElement('ul');
        list.id = title.toLowerCase()+ '-list';
        if(title === 'Genres') {
            list.className = 'd-flex flex-wrap justify-content-center';
        }
        else {
            list.className = 'justify-content-center';
        }
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
    section.className = 'flex-fill col-sm-3 border border-4 rounded-end-4';

    const h2 = document.createElement('h2');
    h2.textContent = 'Categories';
    h2.className = 'border-bottom border-2';
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

