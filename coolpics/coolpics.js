
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.nav-link');

menuButton.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.toggle('hide'));
});


function handleResize() {
    if (window.innerWidth > 1000) {
        navLinks.forEach(link => link.classList.remove('hide'));
    } else {
        navLinks.forEach(link => link.classList.add('hide'));
    }
}

window.addEventListener('resize', handleResize);
handleResize(); 
