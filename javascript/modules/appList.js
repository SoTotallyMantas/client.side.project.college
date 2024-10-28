
export async function fetchAppList() {
    try {
        const response = await fetch('../tempAppList.json');
        const jsonData = await response.json();
        populateTable(jsonData);
    } catch (error) {
        console.error('Error fetching app list:', error);
    }
}

export async function populateTable(jsonData) {
    const apps = jsonData.response.apps;
    const tableBody = document.querySelector("#appsTable tbody");

    apps.forEach(app => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const link = document.createElement("a");

        const currentPath = window.location.pathname.split('/').pop();
        link.href = currentPath === 'index.html' ? `html/gameInfo.html?appid=${app.appid}` : `gameInfo.html?appid=${app.appid}`;
        link.textContent = app.name;

        nameCell.appendChild(link);
        row.appendChild(nameCell);
        tableBody.appendChild(row);
    });
}
