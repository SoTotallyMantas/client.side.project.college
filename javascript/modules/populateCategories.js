
export async function PopulateTopSellers(parsedData) {
    const topSellers = parsedData.top_sellers.items;
    const container = document.querySelector('#top-sellers');
    if (!container) return;

    topSellers.forEach(item => {
        if (item.name !== 'Steam Deck') {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'top-sellers-item p-2 col-12 col-md-6 col-lg-6 d-flex justify-content-center dynamic-element';

            const link = document.createElement('a');
            link.href = `html/gameInfo.html?appid=${item.id}`;
            link.target = '_self';

            const img = document.createElement('img');
            img.className = 'topSellers-image img-fluid rounded';
            img.src = item.header_image;
            link.appendChild(img);

            const header = document.createElement('header');
            header.innerText = item.name;
            header.className="";
            link.appendChild(header);

            const footer = document.createElement('footer');
            footer.innerText = (item.final_price / 100 + '€');
            footer.className="";
            link.appendChild(footer);
            
            itemDiv.appendChild(link);
            container.appendChild(itemDiv);
            setTimeout(() => {
                itemDiv.classList.add('visible');
            }, 10);
        }
    });
}

export async function PopulateNewReleases(parsedData) {
    const currentPath = window.location.pathname.split('/').pop();
    const newReleases = parsedData.new_releases.items;
    const container = document.querySelector('#new-releases');
    if (!container) return;

    newReleases.forEach(item => {
        if (item.name !== 'Steam Deck' && container.childElementCount < 6) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'new-releases-item p-2 col-12 col-md-6 col-lg-12 d-flex justify-content-center dynamic-element';

            const link = document.createElement('a');
            link.href = currentPath === '' || currentPath === 'index.html' 
                ? `html/gameInfo.html?appid=${item.id}`
                : `gameInfo.html?appid=${item.id}`;
            link.target = '_self';
              
            const img = document.createElement('img');
            img.className = 'newReleases-image img-fluid rounded';
            img.src = item.header_image;
            link.appendChild(img);

            const header = document.createElement('header');
            header.innerText = item.name;
            header.className="";
            link.appendChild(header);

            const footer = document.createElement('footer');
            footer.innerText = (item.final_price / 100 + '€');
            footer.className="";
            link.appendChild(footer);
            
            itemDiv.appendChild(link);
            container.appendChild(itemDiv);
            setTimeout(() => {
                itemDiv.classList.add('visible');
            }, 10);
        }
    });
}
