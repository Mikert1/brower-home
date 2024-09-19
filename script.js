async function getSetings() {
    const response = await fetch('settings.json');
    const data = await response.json();
    return data;
}

function changeBrowserLogo() {
    const browser = document.getElementById('browser');
    browser.innerHTML = '';
    const img = document.createElement('img');
    console.log(browserId);
    if (browserId === 1) {
        img.src = './assets/images/search/google.png';
    } else if (browserId === 2) {
        img.src = `./assets/images/search/ddg.png`;
    } else if (browserId === 3) {
        img.src = `./assets/images/search/yahoo.png`;
    } else if (browserId === 4) {
        img.src = `./assets/images/search/bing.png`;
    }
    browser.appendChild(img);
}

let browserId = 1;

async function setBrowserLogo() {
    const settings = await getSetings();
    for (let i = 0; i < settings.length; i++) {
        if (settings[i].key === "DefualtSearchEngine") {
            browserId = settings[i].value;
        }
    }
    changeBrowserLogo();
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
});21
x.addEventListener('click', function() {
    popup.style.display = 'none';
});

document.addEventListener('keydown', function(event) {
    const number = parseInt(event.key);
    if (number > 0 && number < 5) {
        console.log(number);
        browserId = number;
        changeBrowserLogo();
    }
});