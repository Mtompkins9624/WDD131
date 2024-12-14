// script.js
import { getServiceDetails } from './services.js';

class NavigationHandler {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-toggle');
        this.navLinks = document.querySelector('.navbar-links');
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    toggleMobileMenu() {
        const isExpanded = this.navLinks.classList.contains('active');
        this.navLinks.classList.toggle('active');
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        }
    }

    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

class ServiceCards {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.initializeCards();
    }

    initializeCards() {
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
            this.addHoverEffect(card);
        });
    }

    handleCardClick(e) {
        const card = e.currentTarget;
        const serviceId = card.getAttribute('data-service-id');
        if (serviceId) {
            window.location.href = `service-details.html?id=${serviceId}`;
        }
    }

    addHoverEffect(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.setupForm();
        }
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const formFields = Object.fromEntries(formData.entries());

        if (this.validateForm(formFields)) {
            this.submitForm(formFields);
        }
    }

    validateForm(fields) {
        let isValid = true;
        Object.keys(fields).forEach(key => {
            const value = fields[key].trim();
            const field = this.form.querySelector(`#${key}`);
            
            if (value === '') {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }

            if (key === 'email' && !this.isValidEmail(value)) {
                field.classList.add('error');
                isValid = false;
            }
        });
        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    submitForm(data) {
        console.log('Form submitted:', data);
        this.form.reset();
        alert('Thank you for your message! We will get back to you soon.');
    }
}

class ServiceDetailsHandler {
    constructor() {
        this.initializeServiceDetails();
    }

    initializeServiceDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceId = urlParams.get('id');
        
        if (serviceId) {
            const serviceInfo = getServiceDetails(serviceId);
            if (serviceInfo) {
                // Update page content
                document.title = `${serviceInfo.title} - Cyber Ops`;
                
                const titleElement = document.querySelector('.service-hero-text h1');
                const descriptionElement = document.querySelector('.service-hero-text p');
                
                if (titleElement) titleElement.textContent = serviceInfo.title;
                if (descriptionElement) descriptionElement.textContent = serviceInfo.description;
                
                // Update features if they exist
                if (serviceInfo.features) {
                    const featuresGrid = document.querySelector('.features-grid');
                    if (featuresGrid) {
                        featuresGrid.innerHTML = serviceInfo.features.map(feature => `
                            <div class="feature-card">
                                <h3>${feature}</h3>
                                <p>Detailed information about ${feature}</p>
                            </div>
                        `).join('');
                    }
                }
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationHandler();
    new ServiceCards();
    new ContactForm();
    new ServiceDetailsHandler();
});