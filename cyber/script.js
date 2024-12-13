(function() {
    'use strict';

    function initPerformanceOptimizations() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if ('loading' in HTMLImageElement.prototype) {
            lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js';
            script.onload = () => {
                new LazyLoad({
                    elements_selector: 'img[loading="lazy"]'
                });
            };
            document.body.appendChild(script);
        }
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navbarLinks = document.querySelector('.navbar-links');

        if (mobileMenuToggle && navbarLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                navbarLinks.classList.toggle('active');
                mobileMenuToggle.setAttribute('aria-expanded', 
                    navbarLinks.classList.contains('active'));
            });
        }
    }

    function initFormValidation() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');

                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
                
                // Reset previous error states
                [name, email, message].forEach(el => el.classList.remove('error'));
                
                let isValid = true;
                
                if (!name.value.trim()) {
                    name.classList.add('error');
                    isValid = false;
                }
                
                if (!isValidEmail) {
                    email.classList.add('error');
                    isValid = false;
                }
                
                if (!message.value.trim()) {
                    message.classList.add('error');
                    isValid = false;
                }

                if (isValid) {
                    console.log('Form submitted successfully', {
                        name: name.value,
                        email: email.value,
                        message: message.value
                    });
                    
                    // You would typically send form data to a server here
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                }
            });
        }
    }

    function initServiceCardInteraction() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.getAttribute('data-service-id');
                window.location.href = `service-details.html?id=${serviceId}`;
            });
        });
    }

    function init() {
        initPerformanceOptimizations();
        initMobileMenu();
        initFormValidation();
        initServiceCardInteraction();

        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();