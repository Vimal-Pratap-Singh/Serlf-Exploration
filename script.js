document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMessage = document.getElementById('formMessage');
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill out all fields.';
        formMessage.style.color = 'red';
        return;
    }
    formMessage.textContent = 'Thank you for contacting us, ' + name + '! We will get back to you soon.';
    formMessage.style.color = 'green';
    document.getElementById('contactForm').reset();
});
