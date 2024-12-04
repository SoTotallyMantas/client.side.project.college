
export async function fetchAppList() {
    try {
        const response = await fetch('../tempAppList.json');
        const jsonData = await response.json();
       const sortedApp = SortAppList(jsonData);
       return sortedApp;
    } catch (error) {
        console.error('Error fetching app list:', error);
    }
    
}

export async function populateTable(jsonData) {
    const apps = jsonData
    const tableBody = document.querySelector("#appsTable tbody");

    apps.forEach(app => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.className = "bg-body-tertiary"
        const link = document.createElement("a");

        const currentPath = window.location.pathname.split('/').pop();
        link.href = currentPath === 'index.html' ? `html/gameInfo.html?appid=${app.appid}` : `gameInfo.html?appid=${app.appid}`;
        link.textContent = app.name;

        nameCell.appendChild(link);
        row.appendChild(nameCell);
        tableBody.appendChild(row);
    });
}
export function SortAppList(jsonData) {
    const apps = jsonData.response.apps;
    apps.sort((a, b) => a.name.localeCompare(b.name));
    return apps;
}

export function populateSearchbar(jsonData) {

    const apps = jsonData
    const appsList = document.querySelector("#search-results");

    appsList.innerHTML = '';

    apps.forEach(app => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        const currentPath = window.location.pathname.split('/').pop();
        link.href = currentPath === 'index.html' ? `html/gameInfo.html?appid=${app.appid}` : `gameInfo.html?appid=${app.appid}`;
        link.textContent = app.name;

        listItem.appendChild(link);
        appsList.appendChild(listItem);
    });   

}

export function filterSearchBarResults() {
    const input = document.getElementById("searchbar-nav");
    const filter = input.value.toUpperCase();
    const appsList = document.getElementById("search-results");
    
    const li = appsList.getElementsByTagName("li");

    let hasResults = false;
    let resultsCount = 0;

    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName("a")[0];
        const txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1 && resultsCount < 5) {
            li[i].style.display = "";  
            hasResults = true;  
            resultsCount++;      
        } else {
            li[i].style.display = "none";  
        }
    }

    if (hasResults && filter !== "") {
        appsList.style.display = "block";  
    } else {
        appsList.style.display = "none";   
    }
}
export function adjustSearchResults() {
    const searchBar = document.getElementById("searchbar-nav");
    const appsList = document.getElementById("search-results");

    appsList.style.width = `${searchBar.offsetWidth}px`;
}



export function filterAppList() {
    const input = document.getElementById("filterBar");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("appsTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}