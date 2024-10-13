let savedType;
let editMode = false;
async function getSetings() {
    let data
    if (localStorage.getItem('settingsHomepage8')) {
        data = JSON.parse(localStorage.getItem('settingsHomepage8'));
    } else {
        const response = await fetch('settings.json');
        data = await response.json();
        localStorage.setItem('settingsHomepage8', JSON.stringify(data));
    }
    savedType = 'local';
    return data;
}

function changeBrowserLogo() {
    const browser = document.getElementById('browser');
    browser.innerHTML = '';
    const img = document.createElement('img');
    console.log(browserId);
    let url = './assets/images/search/';
    if (browserId === 1) {
        url += 'google.png';
    } else if (browserId === 2) {
        url += `ddg.png`;
    } else if (browserId === 3) {
        url += `yahoo.png`;
    } else if (browserId === 4) {
        url += `bing.png`;
    }
    img.src = `${url}`;
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
        if (browserId === 1) {
            window.location.href = `https://www.google.com/search?q=${search.value}`;
        } else if (browserId === 2) {
            window.location.href = `https://duckduckgo.com/?q=${search.value}`;
        } else if (browserId === 3) {
            window.location.href = `https://search.yahoo.com/search?p=${search.value}`;
        } else if (browserId === 4) {
            window.location.href = `https://www.bing.com/search?q=${search.value}`;
        }
    }
});

const x = document.getElementById('x');
const toggleSaved = document.getElementById('toggleSaved');
const extraTab = document.querySelector('.extraTab');
const popup = document.getElementById('popup');
const settings = document.getElementById('settings');
const chatGPT = document.querySelector('.chatGPT');
const savedTypeSwitch = document.getElementById('savedTypeSwitch');
const edit = document.getElementById('edit');
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
toggleSaved.addEventListener('click', function() {
    console.log('clicked');
    if (extraTab.style.display === 'flex') {
        extraTab.style.display = 'none';
    } else {
        extraTab.style.display = 'flex';
    }
});

edit.addEventListener('click', function() {
    editMode = !editMode;
});

document.addEventListener('keydown', function(event) {
    if (document.activeElement === search) {
        return;
    }
    const number = parseInt(event.key);
    if (number > 0 && number < 5) {
        console.log(number);
        browserId = number;
        changeBrowserLogo();
    }
});

chatGPT.addEventListener('click', function() {
    window.location.href = 'https://chatgpt.com/';
});

async function loadLocal() {
    const settings = await getSetings();
    const locals = settings.find(setting => setting.key === "locals").value;

    locals.forEach(local => {
        for (let i = 1; i < 5; i++) {
            if (local.key === `local${i}`) {
                const test = document.getElementById(`local${i}`)
                test.addEventListener('click', function() {
                    window.location.href = local.value;
                });
                const img = document.createElement('img');
                img.src = local.extra.image;
                test.appendChild(img);
            }
        }
    });
}

loadLocal()

savedTypeSwitch.addEventListener('click', function() {
    savedType = savedType === 'local' ? 'global' : 'local';
    savedTypeSwitch.querySelector('img').src = savedType === 'local' ? 'assets/images/local.svg' : 'assets/images/global.svg';
});

document.addEventListener('keypress', function(event) {
    if (event.key === 'c') {
        localStorage.clear();
    }
});