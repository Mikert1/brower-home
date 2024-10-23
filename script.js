let savedType;
let browserId = 1;
let editMode = false;
let settings

const extraTab = document.querySelector('.extraTab');
const popup = document.getElementById('popup');
const savedTypeSwitch = document.getElementById('savedTypeSwitch');
const edit = document.getElementById('edit');
const addSite = document.getElementById('addSite');
const background = document.getElementById('grayBackground');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete');

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
    return data;
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
                popup.style.display = 'block';
                background.style.display = 'block';
                popup.querySelector('input[name="name"]').value = site.name;
                popup.querySelector('input[name="URL"]').value = site.url;
                saveButton.addEventListener('click', function() {
                    site.name = popup.querySelector('input[name="name"]').value;
                    site.url = popup.querySelector('input[name="URL"]').value;
                    localStorage.setItem('settingsHomepage8', JSON.stringify(settings));
                    loadSavedSites();
                    popup.style.display = 'none';
                    background.style.display = 'none';
                    saveButton.removeEventListener('click', function() {});
                });
                deleteButton.addEventListener('click', function() {
                    delete settings.savedWebsites[savedType][i];
                    localStorage.setItem('settingsHomepage8', JSON.stringify(settings));
                    loadSavedSites();
                    popup.style.display = 'none';
                    background.style.display = 'none';
                    deleteButton.removeEventListener('click', function() {});
                });
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

const addButton = document.getElementById('addSite');
addButton.addEventListener('click', function() {
    popup.style.display = 'block';
    background.style.display = 'block';
    popup.querySelector('input[name="name"]').value = '';
    popup.querySelector('input[name="URL"]').value = '';
    saveButton.addEventListener('click', function() {
        const name = popup.querySelector('input[name="name"]').value;
        const url = popup.querySelector('input[name="URL"]').value;
        if (!settings.savedWebsites[savedType]) {
            settings.savedWebsites[savedType] = {};
        }
        const newIndex = Object.keys(settings.savedWebsites[savedType]).length + 1;
        settings.savedWebsites[savedType][newIndex] = { name, url };
        localStorage.setItem('settingsHomepage8', JSON.stringify(settings));
        loadSavedSites();
        popup.style.display = 'none';
        background.style.display = 'none';
        saveButton.removeEventListener('click', function() {});
    });
    deleteButton.addEventListener('click', function() {
        popup.style.display = 'none';
        background.style.display = 'none';
        deleteButton.removeEventListener('click', function() {});
    });
});

const customL = document.querySelector('.chatGPT');
customL.addEventListener('click', function() {
    window.location.href = 'https://chatgpt.com/';
});

const customR = document.getElementById('settings');
customR.addEventListener('click', function() {
    // custom button
});

const x = document.getElementById('x');
x.addEventListener('click', function() {
    popup.style.display = 'none';
    background.style.display = 'none';
});

const toggleSaved = document.getElementById('toggleSaved');
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
    addSite.style.display = editMode ? 'block' : 'none';
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