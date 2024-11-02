// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('creditCardForm');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    const cvcInput = document.getElementById('cvc');

    // Handle card flip on CVC focus
    cvcInput.addEventListener('focus', function() {
        cardFront.classList.add('flipped');
        cardBack.classList.add('flipped');
    });

    cvcInput.addEventListener('blur', function() {
        cardFront.classList.remove('flipped');
        cardBack.classList.remove('flipped');
    });

    // Format card number with spaces
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
    });
});