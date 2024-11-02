
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('creditCardForm');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    const cvcInput = document.getElementById('cvc');

    cvcInput.addEventListener('focus', function() {
        cardFront.classList.add('flipped');
        cardBack.classList.add('flipped');
    });

    cvcInput.addEventListener('blur', function() {
        cardFront.classList.remove('flipped');
        cardBack.classList.remove('flipped');
    });

    
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });

    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
     
        console.log('Form submitted:', data);
    });
});