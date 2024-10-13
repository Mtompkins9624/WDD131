// Menu toggle functionality
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.nav-link');

menuButton.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.toggle('hide'));
});

// Handle window resize
function handleResize() {
    if (window.innerWidth > 1000) {
        navLinks.forEach(link => link.classList.remove('hide'));
    } else {
        navLinks.forEach(link => link.classList.add('hide'));
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on page load

// Image viewer functionality
function viewerTemplate(imagePath, altText) {
    return `
    <div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${imagePath}" alt="${altText}">
    </div>
    `;
}

function viewHandler(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'IMG') {
        const imageSrc = clickedElement.src;
        const imageAlt = clickedElement.alt;
        const fullImageSrc = imageSrc.split('-')[0] + '-full.jpeg';
        
        document.body.insertAdjacentHTML('afterbegin', viewerTemplate(fullImageSrc, imageAlt));
        
        const closeButton = document.querySelector('.close-viewer');
        closeButton.addEventListener('click', closeViewer);
    }
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}

const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', viewHandler);