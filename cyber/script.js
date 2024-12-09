document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    if (mobileMenuToggle && navbarLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
        });
    }

    // Service Card Interaction
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle detailed view or navigate to service page
            const serviceId = card.getAttribute('data-service-id');
            window.location.href = `service-details.html?id=${serviceId}`;
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // If validation passes, you would typically send the form data
            console.log('Form submitted', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Dynamic Content Loading for Service Details
function loadServiceDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    const serviceDetails = {
        'network-security': {
            title: 'Network Security',
            description: 'Comprehensive protection for your digital infrastructure.',
            features: [
                'Firewall Configuration',
                'Intrusion Detection',
                '24/7 Monitoring'
            ]
        },
        'endpoint-protection': {
            title: 'Endpoint Protection',
            description: 'Secure every device in your network.',
            features: [
                'Antivirus Protection',
                'Device Management',
                'Threat Response'
            ]
        }
    };

    const service = serviceDetails[serviceId];
    
    if (service) {
        document.getElementById('service-title').textContent = service.title;
        document.getElementById('service-description').textContent = service.description;
        
        const featuresList = document.getElementById('service-features');
        featuresList.innerHTML = service.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
    }
}