const themeSelector = document.getElementById('themeSelector');
const body = document.body;
const logoImage = document.getElementById('logoImage');

function changeTheme() {
    if (themeSelector.value === 'dark') {
        body.classList.add('dark');
        logoImage.src = 'byui-white.webp';
    } else {
        body.classList.remove('dark');
        logoImage.src = 'byui.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);