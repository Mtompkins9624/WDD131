// script.js
import { services } from './services.js';

class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = [];
    }

    validateField(field) {
        if (field.value.trim() === '') {
            field.classList.add('error');
            this.errors.push(`${field.id} is required`);
            return false;
        }
        
        if (field.type === 'email' && !this.isValidEmail(field.value)) {
            field.classList.add('error');
            this.errors.push('Invalid email format');
            return false;
        }

        field.classList.remove('error');
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    clearErrors() {
        this.errors = [];
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
}

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

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    toggleMobileMenu() {
        const isExpanded = this.navLinks.classList.contains('active');
        this.navLinks.classList.toggle('active');
        this.mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
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
        const serviceId = card.dataset.serviceId;
        
        if (serviceId && services[serviceId]) {
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
            this.validator = new FormValidator(this.form);
            this.setupForm();
        }
    }

    setupForm() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.validator.clearErrors();

        const formData = new FormData(this.form);
        const formFields = Object.fromEntries(formData.entries());

        if (this.validateForm(formFields)) {
            this.submitForm(formFields);
        }
    }

    validateForm(fields) {
        let isValid = true;
        Object.keys(fields).forEach(key => {
            const field = this.form.querySelector(`#${key}`);
            if (!this.validator.validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    }

    submitForm(data) {
        // Simulate form submission
        console.log('Submitting form:', data);
        this.form.reset();
        alert('Thank you for your message! We will get back to you soon.');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const nav = new NavigationHandler();
    const services = new ServiceCards();
    const contact = new ContactForm();
});