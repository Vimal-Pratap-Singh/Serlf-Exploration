// Smooth scrolling for navigation
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form handler with validation
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validation
        let valid = true;
        const name = form.elements['name'];
        const email = form.elements['email'];
        const message = form.elements['message'];
        [name, email, message].forEach(field => {
            field.style.borderColor = '#cde7d5';
        });
        if (!name.value.trim()) {
            name.style.borderColor = 'red';
            valid = false;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())) {
            email.style.borderColor = 'red';
            valid = false;
        }
        if (!message.value.trim()) {
            message.style.borderColor = 'red';
            valid = false;
        }
        if (!valid) {
            formMessage.textContent = 'कृपया सभी फ़ील्ड सही से भरें।';
            formMessage.style.color = 'red';
            return;
        }
        formMessage.textContent = 'संदेश भेजने के लिए धन्यवाद! हम जल्द ही संपर्क करेंगे।';
        formMessage.style.color = '#17643a';
        form.reset();
    });
}

// Animated Stats/Counter
function animateCounter(el, target) {
    let count = 0;
    const speed = Math.ceil(target / 40);
    const update = () => {
        count += speed;
        if (count >= target) {
            el.textContent = target;
        } else {
            el.textContent = count;
            requestAnimationFrame(update);
        }
    };
    update();
}
function revealCountersIfVisible() {
    const stats = document.querySelectorAll('.stat-num');
    let revealed = false;
    stats.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight && !stat.dataset.animated) {
            animateCounter(stat, parseInt(stat.dataset.target));
            stat.dataset.animated = 'true';
            revealed = true;
        }
    });
}
window.addEventListener('scroll', revealCountersIfVisible);
window.addEventListener('DOMContentLoaded', revealCountersIfVisible);

// Gallery/Slider
const galleryImages = document.querySelectorAll('.gallery-slider img');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
let galleryIndex = 0;
function showGalleryImage(idx) {
    galleryImages.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
    });
}
if (galleryImages.length) {
    showGalleryImage(galleryIndex);
    if (galleryPrev && galleryNext) {
        galleryPrev.onclick = () => {
            galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
            showGalleryImage(galleryIndex);
        };
        galleryNext.onclick = () => {
            galleryIndex = (galleryIndex + 1) % galleryImages.length;
            showGalleryImage(galleryIndex);
        };
    }
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
    btn.addEventListener('click', function() {
        const item = this.parentElement;
        item.classList.toggle('open');
        this.classList.toggle('active');
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
if (backToTop) {
    backToTop.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// Section Reveal Animation
function revealSections() {
    document.querySelectorAll('section, .stat, .testimonial, .faq-item').forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Dark Mode Toggle
const darkToggle = document.getElementById('darkModeToggle');
function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    darkToggle.textContent = on ? '☀️' : '🌙';
    localStorage.setItem('darkMode', on ? '1' : '0');
}
if (darkToggle) {
    const darkPref = localStorage.getItem('darkMode') === '1';
    setDarkMode(darkPref);
    darkToggle.onclick = () => {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    };
}
