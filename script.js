async function getSetings() {
    const response = await fetch('./settings.json');
    const data = await response.json();
    return data;
}

let browserId = 0;

async function setBrowserLogo() {
    const settings = await getSetings();
    for (let i = 0; i < settings.length; i++) {
        if (settings.key === "DefualtSeurchEngine") {
            browserId = i;
        }
    }
    const browser = document.getElementById('browser');
    const img = document.createElement('img');
    if (browserId === 0) {
        img.src = './assets/images/seurch/google.png';
    } else if (browserId === 1) {
        img.src = `./assets/images/seurch/ddg.png`;
    } else if (browserId === 2) {
        img.src = `./assets/images/seurch/yahoo.png`;
    } else if (browserId === 3) {
        img.src = `./assets/images/seurch/bing.png`;
    }
    browser.appendChild(img);

}

setBrowserLogo();

const search = document.getElementById('search');
search.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        window.location.href = `https://www.google.com/search?q=${search.value}`;
    }
});

const x = document.getElementById('x');
const popup = document.getElementById('popup');
const settings = document.getElementById('settings');
settings.addEventListener('click', function() {
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'block';
    }
});
x.addEventListener('click', function() {
    popup.style.display = 'none';
});