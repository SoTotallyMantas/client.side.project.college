
export async function PopulateTopSellers(parsedData) {
    const topSellers = parsedData.top_sellers.items;
    const container = document.querySelector('.top-sellers');
    if (!container) return;

    topSellers.forEach(item => {
        if (item.name !== 'Steam Deck') {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'top-sellers-item';

            const link = document.createElement('a');
            link.href = `html/gameInfo.html?appid=${item.id}`;
            link.target = '_self';

            const img = document.createElement('img');
            img.className = 'topSellers-image';
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

export async function PopulateNewReleases(parsedData) {
    const currentPath = window.location.pathname.split('/').pop();
    const newReleases = parsedData.new_releases.items;
    const container = document.querySelector('.new-releases');
    if (!container) return;

    newReleases.forEach(item => {
        if (item.name !== 'Steam Deck' && container.childElementCount < 6) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'new-releases-item';

            const link = document.createElement('a');
            link.href = currentPath === '' || currentPath === 'index.html' 
                ? `html/gameInfo.html?appid=${item.id}`
                : `gameInfo.html?appid=${item.id}`;
            link.target = '_self';

            const img = document.createElement('img');
            img.className = 'newReleases-image';
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
