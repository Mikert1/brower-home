// const browser = globalThis.chrome ? 'chrome' :
//       (globalThis.netscape ? 'firefox' :
//         (globalThis.webkit ? 'safari' : 'unknown'));
//     console.log(
//         `Your browser is: ${browser}.`
//     );
const browserName = "google";

const browser = document.getElementById('browser');
const img = document.createElement('img');
img.src = `./images/seurch/${browserName}.png`;
browser.appendChild(img);

const search = document.getElementById('search');
search.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        window.location.href = `https://www.google.com/search?q=${search.value}`;
    }
});