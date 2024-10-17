let savedType;
let browserId = 1;
let editMode = false;
let settings
async function getSetings() {
    let data
    if (localStorage.getItem('settingsHomepage8')) {
        data = JSON.parse(localStorage.getItem('settingsHomepage8'));
    } else {
        const response = await fetch('settings.json');
        data = await response.json();
        localStorage.setItem('settingsHomepage8', JSON.stringify(data));
    }
    savedType = 'home';
    return data.settings;
}

function changeBrowserLogo() {
    const browser = document.getElementById('browser');
    browser.innerHTML = '';
    const img = document.createElement('img');
    img.src = `./assets/images/search/${browserId}.png`;
    browser.appendChild(img);
}

function loadSavedSites() {
    savedTypeSwitch.querySelector('img').src = `assets/images/tabs/${savedType}.svg`;
    
    const saved = document.getElementById('savedSites');
    const template = document.getElementById('savedSite');
    saved.innerHTML = '';
    const savedWebsites = settings.savedWebsites[savedType];
    for (let i = 1; i < 15; i++) {
        const site = savedWebsites[i];
        if (!site) {continue;}
        const clone = template.content.cloneNode(true);
        const base = clone.querySelector('.base');
        const img = clone.querySelector('img');
        const name = clone.querySelector('.name');
        
        base.addEventListener('click', function() {
            if (editMode) {
                const url = prompt('Enter url', site.url);
                if (url) {
                    site.url = url;
                    localStorage.setItem('settingsHomepage8', JSON.stringify({ settings }));
                    applySettings();
                }
            } else {
                window.location.href = site.url;
            }
        });
    
        if (site.extra && site.extra.image) {
            img.src = site.extra.image;
        } else {
            img.src = `${site.url}/favicon.ico`;
        }
    
        if (site.name) {
            name.textContent = site.name;
        } else {
            name.textContent = 'Unnamed';
        }
    
        saved.appendChild(clone);
    };
}

async function applySettings() {
    settings = await getSetings();
    changeBrowserLogo();

    // saved sites
    loadSavedSites();
}

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
const settingsButton = document.getElementById('settings');
const chatGPT = document.querySelector('.chatGPT');
const savedTypeSwitch = document.getElementById('savedTypeSwitch');
const edit = document.getElementById('edit');
settingsButton.addEventListener('click', function() {
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
                    if (editMode) {
                        const url = prompt('Enter url', local.value);
                        if (url) {
                            local.value = url;
                            localStorage.setItem('settingsHomepage8', JSON.stringify({ settings }));
                            applySettings();
                        }
                    }
                    window.location.href = local.value;
                });
                const img = document.createElement('img');
                img.src = local.extra.image;
                test.appendChild(img);
            }
        }
    });
}

applySettings()

savedTypeSwitch.addEventListener('click', function() {
    savedType = savedType === 'home' ? 'work' :
                savedType === 'work' ? 'school' :
                savedType === 'school' ? 'games' :
                savedType === 'games' ? 'local' :
                              'home';
    savedTypeSwitch.querySelector('img').src = `assets/images/tabs/${savedType}.svg`;
    loadSavedSites();
});

document.addEventListener('keypress', function(event) {
    if (event.key === 'c') {
        localStorage.clear();
    }
});