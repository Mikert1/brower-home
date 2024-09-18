const browserName = "google";

const browser = document.getElementById('browser');
const img = document.createElement('img');
img.src = `./assets/images/seurch/${browserName}.png`;
browser.appendChild(img);

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